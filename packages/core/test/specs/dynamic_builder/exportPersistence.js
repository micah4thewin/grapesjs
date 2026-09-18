import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildAssetFileRecords from '../../../src/dynamic-builder/exporter/buildAssetFileRecords';
import buildPageExportRecords from '../../../src/dynamic-builder/exporter/buildPageExportRecords';
import buildPublishSummaryMarkup from '../../../src/dynamic-builder/exporter/buildPublishSummaryMarkup';
import buildRevisionItemMarkup from '../../../src/dynamic-builder/persistence/buildRevisionItemMarkup';
import buildSiteArchiveFileName from '../../../src/dynamic-builder/exporter/buildSiteArchiveFileName';
import buildStorageUsageText from '../../../src/dynamic-builder/persistence/buildStorageUsageText';
import countStrippedSlotScripts from '../../../src/dynamic-builder/exporter/countStrippedSlotScripts';
import dehydratePayloadAssets from '../../../src/dynamic-builder/persistence/dehydratePayloadAssets';
import deleteRevisionRecord from '../../../src/dynamic-builder/persistence/deleteRevisionRecord';
import describeUndoGroup from '../../../src/dynamic-builder/persistence/describeUndoGroup';
import doesCssChunkMatchDocuments from '../../../src/dynamic-builder/exporter/doesCssChunkMatchDocuments';
import extractCssRuleSelectors from '../../../src/dynamic-builder/exporter/extractCssRuleSelectors';
import formatRelativeTimeText from '../../../src/dynamic-builder/persistence/formatRelativeTimeText';
import listPageExportEntries from '../../../src/dynamic-builder/exporter/listPageExportEntries';
import minifyScriptText from '../../../src/dynamic-builder/exporter/minifyScriptText';
import normalizePreflightResult from '../../../src/dynamic-builder/exporter/normalizePreflightResult';
import parseImportedRevisionPayload from '../../../src/dynamic-builder/persistence/parseImportedRevisionPayload';
import pruneAssetPool from '../../../src/dynamic-builder/persistence/pruneAssetPool';
import readLocalDraftRecord from '../../../src/dynamic-builder/persistence/readLocalDraftRecord';
import readRevisionList from '../../../src/dynamic-builder/persistence/readRevisionList';
import resolvePersistenceOptions from '../../../src/dynamic-builder/persistence/resolvePersistenceOptions';
import resolveStorageKey from '../../../src/dynamic-builder/persistence/resolveStorageKey';
import rehydratePayloadAssets from '../../../src/dynamic-builder/persistence/rehydratePayloadAssets';
import restorePayloadAssets from '../../../src/dynamic-builder/persistence/restorePayloadAssets';
import restoreRevisionRecord from '../../../src/dynamic-builder/persistence/restoreRevisionRecord';
import runExportPreflight from '../../../src/dynamic-builder/exporter/runExportPreflight';
import runRevisionRestoreFlow from '../../../src/dynamic-builder/persistence/runRevisionRestoreFlow';
import saveProjectSnapshot from '../../../src/dynamic-builder/persistence/saveProjectSnapshot';
import saveRevisionRecord from '../../../src/dynamic-builder/persistence/saveRevisionRecord';
import saveSafetyRevision from '../../../src/dynamic-builder/persistence/saveSafetyRevision';
import stripEditorOnlyAttributes from '../../../src/dynamic-builder/exporter/stripEditorOnlyAttributes';
import trimRevisionsToBudget from '../../../src/dynamic-builder/persistence/trimRevisionsToBudget';
import updateSiteMetaRecord from '../../../src/dynamic-builder/support/updateSiteMetaRecord';
import validateSiteSettingsValues from '../../../src/dynamic-builder/exporter/validateSiteSettingsValues';
import writeStoredJsonRecord from '../../../src/dynamic-builder/persistence/writeStoredJsonRecord';
import getRecordStorageArea, {
  flushRecordStorage,
  hydrateRecordStorage,
  isUsingLocalStorageOnly,
} from '../../../src/dynamic-builder/persistence/storage/getRecordStorageArea';
import buildPooledAssetToken from '../../../src/dynamic-builder/persistence/buildPooledAssetToken';
import preparePersistenceStorage from '../../../src/dynamic-builder/persistence/storage/preparePersistenceStorage';
import readAllRecordEntries from '../../../src/dynamic-builder/persistence/storage/readAllRecordEntries';
import resetPersistenceStorageForTests from '../../../src/dynamic-builder/persistence/storage/resetPersistenceStorageForTests';
import {
  flushAssetWrites,
  listKnownAssetTokens,
  readPooledAssets,
} from '../../../src/dynamic-builder/persistence/storage/getAssetPoolStore';

const storageKey = 'db-test-export';

const buildTestPhoto = (seedText) => 'data:image/jpeg;base64,' + seedText.repeat(600);

const clearTestStorage = () => {
  Object.keys(localStorage)
    .filter((keyName) => keyName.startsWith(storageKey))
    .forEach((keyName) => localStorage.removeItem(keyName));
};

// Records answer synchronously from the in-memory mirror; the bytes behind them
// live in IndexedDB, so a test that inspects them settles the writes first.
const readStoredText = (recordKey) => getRecordStorageArea().getItem(recordKey);

const readStoredRecord = (recordKey) => JSON.parse(readStoredText(recordKey));

const countPhotoCopies = (storedText) => (String(storedText || '').match(/data:image\/jpeg;base64,/g) || []).length;

// Drives the path a browser without usable IndexedDB takes, where records go
// back to localStorage and its quota decides what fits.
const useLocalStorageFallback = async () => {
  const realIndexedDb = window.indexedDB;
  await resetPersistenceStorageForTests();
  Object.defineProperty(window, 'indexedDB', { value: undefined, configurable: true });
  await hydrateRecordStorage();
  Object.defineProperty(window, 'indexedDB', { value: realIndexedDb, configurable: true });
  expect(isUsingLocalStorageOnly()).toBe(true);
};

const waitFor = (delayMs) => new Promise((resolveWait) => setTimeout(resolveWait, delayMs));

const waitForActiveStorageKey = async (editorInstance) => {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (editorInstance.getModel().get('dbStorageKey')) return true;
    await waitFor(10);
  }
  return false;
};

describe('Dynamic builder export and persistence helpers', () => {
  describe('extractCssRuleSelectors', () => {
    test('collects selectors inside media queries and skips keyframes', () => {
      const cssText =
        '.a{color:red}@media (max-width:600px){.b .c,.d:hover{color:blue}}@keyframes spin{from{opacity:0}to{opacity:1}}';
      expect(extractCssRuleSelectors(cssText)).toEqual(['.a', '.b .c', '.d:hover']);
    });

    test('ignores braces inside strings', () => {
      expect(extractCssRuleSelectors('.x::before{content:"{"}.y{color:red}')).toEqual(['.x::before', '.y']);
    });

    test('keeps quoted attribute values inside selectors', () => {
      expect(extractCssRuleSelectors('[data-db-aos-ready="true"] [data-db-aos]{opacity:1}')).toEqual([
        '[data-db-aos-ready="true"] [data-db-aos]',
      ]);
    });
  });

  describe('doesCssChunkMatchDocuments', () => {
    const parseDocument = (markup) => new DOMParser().parseFromString(markup, 'text/html');

    test('keeps a chunk when any selector matches even through pseudo classes', () => {
      const documents = [parseDocument('<div class="db-social-link">x</div>')];
      expect(doesCssChunkMatchDocuments('.db-nav{color:red}.db-social-link:hover{color:blue}', documents)).toBe(true);
    });

    test('drops a chunk whose selectors match nothing', () => {
      const documents = [parseDocument('<p class="db-text">x</p>')];
      expect(doesCssChunkMatchDocuments('.db-accordion{color:red}.db-tabs>.db-tab{color:blue}', documents)).toBe(false);
    });

    test('judges quoted attribute selectors by what the pages really contain', () => {
      const cssText = '[data-db-aos-ready="true"] [data-db-aos]{opacity:1}';
      expect(doesCssChunkMatchDocuments(cssText, [parseDocument('<p class="db-text">x</p>')])).toBe(false);
      const readyDocument = parseDocument('<div data-db-aos-ready="true"><p data-db-aos="fade">x</p></div>');
      expect(doesCssChunkMatchDocuments(cssText, [readyDocument])).toBe(true);
    });

    test('keeps chunks that only hold at-rules or root variables', () => {
      const documents = [parseDocument('<p>x</p>')];
      expect(doesCssChunkMatchDocuments(':root{--db-x:1}', documents)).toBe(true);
      expect(doesCssChunkMatchDocuments('@font-face{font-family:x}', documents)).toBe(true);
    });
  });

  describe('normalizePreflightResult', () => {
    test('accepts findings arrays and count records and rejects junk', () => {
      const fromFindings = normalizePreflightResult([{ severity: 'error' }, { severity: 'warning' }]);
      expect(fromFindings.errorCount).toBe(1);
      expect(fromFindings.warningCount).toBe(1);
      expect(fromFindings.summaries.length).toBe(1);
      const fromCounts = normalizePreflightResult({ errorCount: 2, warningCount: '3', notes: ['n'] });
      expect(fromCounts.errorCount).toBe(2);
      expect(fromCounts.warningCount).toBe(3);
      expect(fromCounts.notes).toEqual(['n']);
      expect(normalizePreflightResult('nope')).toBeNull();
      expect(normalizePreflightResult({ foo: 1 })).toBeNull();
    });
  });

  describe('validateSiteSettingsValues', () => {
    test('rejects a base without a scheme and a language that is not a code', () => {
      const result = validateSiteSettingsValues({ canonicalBase: 'acme', language: 'francais' });
      expect(result.isValid).toBe(false);
      expect(result.errors.canonicalBase).toContain('https://');
      expect(result.errors.language).toBeTruthy();
    });

    test('accepts empty and valid values', () => {
      expect(validateSiteSettingsValues({ canonicalBase: '', language: '' }).isValid).toBe(true);
      expect(validateSiteSettingsValues({ canonicalBase: 'https://www.example.com', language: 'en-US' }).isValid).toBe(
        true,
      );
    });
  });

  describe('formatRelativeTimeText', () => {
    test('describes recent times in plain words', () => {
      const now = new Date('2026-09-06T12:00:00Z');
      expect(formatRelativeTimeText(new Date('2026-09-06T11:59:50Z'), now)).toBe('just now');
      expect(formatRelativeTimeText(new Date('2026-09-06T11:58:00Z'), now)).toBe('2 minutes ago');
      expect(formatRelativeTimeText(new Date('2026-09-06T09:00:00Z'), now)).toBe('3 hours ago');
      expect(formatRelativeTimeText(new Date('2026-09-05T11:00:00Z'), now)).toBe('yesterday');
      expect(formatRelativeTimeText('not-a-date', now)).toBe('');
    });
  });

  describe('parseImportedRevisionPayload', () => {
    test('accepts revision records, project backups and raw project data', () => {
      const projectData = { pages: [{ name: 'Home' }] };
      expect(parseImportedRevisionPayload(JSON.stringify({ payload: { projectData } })).projectData).toEqual(
        projectData,
      );
      expect(parseImportedRevisionPayload(JSON.stringify({ projectData, siteMeta: { seo: {} } })).siteMeta).toEqual({
        seo: {},
      });
      expect(parseImportedRevisionPayload(JSON.stringify(projectData)).projectData).toEqual(projectData);
      expect(parseImportedRevisionPayload('{"nope":1}')).toBeNull();
      expect(parseImportedRevisionPayload('not json')).toBeNull();
    });
  });

  describe('describeUndoGroup', () => {
    const fakeComponent = { getName: () => 'Heading', get: () => 'db-heading' };
    const fakePage = { getMainComponent: () => ({}), getName: () => 'About' };

    test('names added blocks and pages in plain language', () => {
      expect(describeUndoGroup({ actions: [{ type: 'add', after: fakeComponent, object: {} }] })).toBe('Added Heading');
      expect(describeUndoGroup({ actions: [{ type: 'add', after: fakePage, object: {} }] })).toBe('Added page "About"');
      expect(describeUndoGroup({ actions: [{ type: 'remove', before: fakeComponent, object: {} }] })).toBe(
        'Removed Heading',
      );
    });

    test('describes style and settings changes', () => {
      const styleChange = {
        type: 'change',
        object: fakeComponent,
        before: { style: {} },
        after: { style: { color: 'red' } },
      };
      expect(describeUndoGroup({ actions: [styleChange] })).toBe('Changed style of Heading');
      const attributeChange = {
        type: 'change',
        object: fakeComponent,
        before: { attributes: { a: 1 } },
        after: { attributes: { a: 2 } },
      };
      expect(describeUndoGroup({ actions: [attributeChange] })).toBe('Changed settings of Heading');
      expect(describeUndoGroup({ actions: [] })).toBe('Changed the page');
    });
  });

  describe('buildRevisionItemMarkup', () => {
    test('disables restore for corrupt revisions and hides delete for the draft', () => {
      const brokenMarkup = buildRevisionItemMarkup({
        id: 'rev-b',
        label: 'Beta',
        savedAt: 'nope',
        isRestorable: false,
      });
      expect(brokenMarkup).toContain('Not restorable');
      expect(brokenMarkup).toMatch(/data-db-revision-action="restore"[^>]*disabled/);
      expect(brokenMarkup).toContain('Unknown time');
      const draftMarkup = buildRevisionItemMarkup({
        id: 'autosave-draft',
        label: 'Local autosave draft',
        kind: 'draft',
        savedAt: new Date().toISOString(),
        meta: { pageNames: ['Home', 'About', 'Team'], byteLength: 2048 },
      });
      expect(draftMarkup).not.toContain('data-db-revision-action="delete"');
      expect(draftMarkup).toContain('Home, About + 1 more');
      expect(draftMarkup).toContain('2 KB');
      expect(draftMarkup).toContain('safety copy of the current site will be kept');
    });
  });

  describe('buildPublishSummaryMarkup', () => {
    test('shows a success state and pluralises counts', () => {
      const cleanMarkup = buildPublishSummaryMarkup({
        errorCount: 0,
        warningCount: 0,
        summaries: [{ auditLabel: 'SEO', severityCounts: { error: 0, warning: 0, info: 1 } }],
        notes: [],
      });
      expect(cleanMarkup).toContain('All checks passed');
      expect(cleanMarkup).toContain('0 errors');
      expect(cleanMarkup).toContain('1 note<');
      expect(cleanMarkup).not.toContain('gjs-db-badge-error');
      const brokenMarkup = buildPublishSummaryMarkup({
        errorCount: 1,
        warningCount: 2,
        summaries: [{ auditLabel: 'SEO', severityCounts: { error: 1, warning: 2, info: 0 } }],
        notes: ['sitemap.xml is left out'],
      });
      expect(brokenMarkup).toContain('1 error<');
      expect(brokenMarkup).toContain('Download anyway');
      expect(brokenMarkup).toContain('sitemap.xml is left out');
    });
  });

  describe('writeStoredJsonRecord', () => {
    test('never surfaces the raw quota exception text', async () => {
      await useLocalStorageFallback();
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        const quotaError = new Error("Failed to execute 'setItem' on 'Storage': quota");
        quotaError.name = 'QuotaExceededError';
        throw quotaError;
      };
      let evictionCalls = 0;
      const evictOnce = () => {
        evictionCalls += 1;
        return evictionCalls < 2;
      };
      try {
        const messageText = writeStoredJsonRecord(storageKey + ':probe', { a: 1 }, evictOnce);
        expect(messageText).toContain('Browser storage is full');
        expect(messageText).not.toContain('setItem');
        expect(evictionCalls).toBe(2);
      } finally {
        localStorage.setItem = originalSetItem;
        await resetPersistenceStorageForTests();
      }
    });

    test('falls back to localStorage when the browser has no IndexedDB', async () => {
      await useLocalStorageFallback();
      try {
        expect(writeStoredJsonRecord(storageKey + ':fallback', { kept: true })).toBeNull();
        expect(JSON.parse(localStorage.getItem(storageKey + ':fallback')).kept).toBe(true);
      } finally {
        await resetPersistenceStorageForTests();
      }
    });
  });

  describe('moving existing work out of localStorage', () => {
    const legacyKey = 'db-legacy-spec';
    const legacyOptions = { storageKey: legacyKey };
    const stubEditor = { getModel: () => ({ get: () => '' }) };

    afterEach(async () => {
      localStorage.removeItem(legacyKey);
      localStorage.removeItem(legacyKey + ':asset-pool');
      await resetPersistenceStorageForTests();
    });

    test('adopts a project left in localStorage and frees the keys it held', async () => {
      await resetPersistenceStorageForTests();
      const photoUrl = buildTestPhoto('abcd');
      const assetToken = buildPooledAssetToken(photoUrl);
      localStorage.setItem(
        legacyKey,
        JSON.stringify({ projectData: { assets: [{ src: assetToken }] }, savedAt: 'then' }),
      );
      localStorage.setItem(legacyKey + ':asset-pool', JSON.stringify({ [assetToken]: photoUrl }));

      await preparePersistenceStorage(stubEditor, legacyOptions);

      expect(localStorage.getItem(legacyKey)).toBeFalsy();
      expect(localStorage.getItem(legacyKey + ':asset-pool')).toBeFalsy();
      const storedRecord = JSON.parse(getRecordStorageArea().getItem(legacyKey));
      expect(storedRecord.projectData.assets[0].src).toBe(assetToken);
      const restoredData = await restorePayloadAssets(storedRecord.projectData);
      expect(restoredData.assets[0].src).toBe(photoUrl);
    });

    test('keeps new records in IndexedDB instead of localStorage', async () => {
      await resetPersistenceStorageForTests();
      await hydrateRecordStorage();
      getRecordStorageArea().setItem(legacyKey, '{"kept":true}');
      await flushRecordStorage();
      expect(localStorage.getItem(legacyKey)).toBeFalsy();
      const storedEntries = await readAllRecordEntries();
      expect(JSON.parse(storedEntries[legacyKey]).kept).toBe(true);
    });
  });

  describe('asset pooling helpers', () => {
    test('swaps sizeable data URIs for tokens and puts them back unchanged', () => {
      const photoUrl = buildTestPhoto('abcd');
      const sourcePayload = {
        assets: [{ src: photoUrl }],
        styles: [{ style: { 'background-image': 'url(' + photoUrl + ')' } }],
        tinyIcon: 'data:image/png;base64,AAAA',
      };
      const { payload, poolAdditions } = dehydratePayloadAssets(sourcePayload);
      const pooledTokens = Object.keys(poolAdditions);
      expect(pooledTokens.length).toBe(1);
      expect(payload.assets[0].src).toBe(pooledTokens[0]);
      expect(payload.styles[0].style['background-image']).toBe('url(' + pooledTokens[0] + ')');
      expect(payload.tinyIcon).toBe(sourcePayload.tinyIcon);
      expect(rehydratePayloadAssets(payload, poolAdditions)).toEqual(sourcePayload);
    });

    test('falls back to a placeholder when the pool lost the picture', () => {
      const { payload } = dehydratePayloadAssets({ src: buildTestPhoto('abcd') });
      expect(rehydratePayloadAssets(payload, {}).src).toContain('data:image/svg+xml');
    });

    test('keeps the newest revision and drops older ones past the budget', () => {
      const revisionList = [1, 2, 3].map((recordIndex) => ({ id: 'rev-' + recordIndex, body: 'x'.repeat(400) }));
      const budgetResult = trimRevisionsToBudget(revisionList, 1800);
      expect(budgetResult.keptList.map((record) => record.id)).toEqual(['rev-1', 'rev-2']);
      expect(budgetResult.droppedList.map((record) => record.id)).toEqual(['rev-3']);
    });

    test('keeps every revision when no budget is set', () => {
      const revisionList = [{ id: 'rev-1' }, { id: 'rev-2' }];
      expect(trimRevisionsToBudget(revisionList, 0).keptList).toBe(revisionList);
    });
  });

  describe('minifyScriptText and stripEditorOnlyAttributes', () => {
    test('strips comments and indentation but leaves strings and regexes alone', () => {
      const compact = minifyScriptText(
        '(function () {\n  // note\n  var a = "x // y"; /* b */\n  var r = /\\/\\//g;\n  return a.replace(r, \'\');\n})();',
      );
      expect(compact).toBe('(function () {\nvar a = "x // y";\nvar r = /\\/\\//g;\nreturn a.replace(r, \'\');\n})();');
      expect(minifyScriptText('var c = 10 / 2 / 5;')).toBe('var c = 10 / 2 / 5;');
    });

    test('removes editor-only attributes and keeps site attributes', () => {
      const cleaned = stripEditorOnlyAttributes(
        '<div data-gjs-type="wrapper" class="a" draggable="true" contenteditable><p id="x" data-db-type="text" data-db-aos="fade">hi</p></div>',
      );
      expect(cleaned).toBe('<div class="a"><p id="x" data-db-type="text" data-db-aos="fade">hi</p></div>');
    });
  });
});

describe('Dynamic builder export and persistence with an editor', () => {
  let editor;
  let moduleOptions;
  let activeKey;
  const originalCreateObjectUrl = URL.createObjectURL;
  const originalRevokeObjectUrl = URL.revokeObjectURL;
  const originalAnchorClick = HTMLAnchorElement.prototype.click;

  beforeAll(() => {
    URL.createObjectURL = () => 'blob:mock';
    URL.revokeObjectURL = () => {};
    HTMLAnchorElement.prototype.click = () => {};
  });

  afterAll(() => {
    URL.createObjectURL = originalCreateObjectUrl;
    URL.revokeObjectURL = originalRevokeObjectUrl;
    HTMLAnchorElement.prototype.click = originalAnchorClick;
  });

  beforeEach(async () => {
    clearTestStorage();
    await resetPersistenceStorageForTests();
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, (editorInstance) => grapesjs.dynamicBuilder(editorInstance, { persistence: { storageKey } })],
    });
    fixJsDomIframe(editor.getModel().shallow);
    moduleOptions = resolvePersistenceOptions({ persistence: { storageKey } }, editor);
    await editor.getModel().get('dbStorageReady');
    await waitForActiveStorageKey(editor);
    activeKey = (suffixText = '') => resolveStorageKey(editor, moduleOptions) + suffixText;
  });

  afterEach(async () => {
    editor.destroy();
    clearTestStorage();
    await resetPersistenceStorageForTests();
  });

  describe('export records', () => {
    test('names the unnamed main page Home', () => {
      const [mainEntry] = listPageExportEntries(editor);
      expect(mainEntry.isMainPage).toBe(true);
      expect(mainEntry.fileName).toBe('index.html');
      expect(mainEntry.pageName).toBe('Home');
    });

    test('page downloads carry the shared files only when shared assets are on', () => {
      const sharedRecords = buildPageExportRecords(editor, { separateAssets: true });
      expect(sharedRecords.map((fileRecord) => fileRecord.fileName)).toContain('styles.css');
      expect(sharedRecords[0].content).toContain('href="styles.css"');
      const inlineRecords = buildPageExportRecords(editor, { separateAssets: false });
      expect(inlineRecords.map((fileRecord) => fileRecord.fileName)).toEqual(['index.html']);
      expect(inlineRecords[0].content).toContain('<style>');
    });

    test('design tokens export the full active token set', () => {
      const [tokensRecord] = buildAssetFileRecords(editor, {}, 'tokens');
      const parsedTokens = JSON.parse(tokensRecord.content);
      expect(parsedTokens.color && parsedTokens.color.brand).toBeTruthy();
    });

    test('the bundle omits the sitemap until a site address exists and respects inline pages', () => {
      const withoutAddress = buildAssetFileRecords(editor, { separateAssets: false }).map((r) => r.fileName);
      expect(withoutAddress).not.toContain('sitemap.xml');
      expect(withoutAddress).not.toContain('styles.css');
      updateSiteMetaRecord(editor, { seo: { canonicalBase: 'https://www.example.com', siteName: 'Acme Co' } });
      const withAddress = buildAssetFileRecords(editor, {}).map((r) => r.fileName);
      expect(withAddress).toContain('sitemap.xml');
      expect(withAddress).toContain('styles.css');
      expect(buildSiteArchiveFileName(editor)).toBe('acme-co-site.zip');
    });

    test('counts scripts that the custom code slots would strip', () => {
      expect(
        countStrippedSlotScripts({
          allowScripts: false,
          headHtml: '<meta name="p" content="1"><script>window.a=1</script>',
          bodyStartHtml: '',
          bodyEndHtml: '<script src="https://x.test/a.js"></script>',
          scriptOriginAllowlist: [],
        }),
      ).toBe(2);
      expect(countStrippedSlotScripts({ allowScripts: true, headHtml: '<script>1</script>' })).toBe(0);
    });
  });

  describe('preflight and download', () => {
    test('runs the audits when no preflight command exists', () => {
      editor.Commands.remove('db:run-preflight');
      const preflightRecord = runExportPreflight(editor);
      expect(preflightRecord.source).toBe('audits');
      expect(preflightRecord.summaries.length).toBe(3);
      expect(typeof preflightRecord.errorCount).toBe('number');
      expect(preflightRecord.notes.some((noteText) => noteText.includes('sitemap.xml'))).toBe(true);
    });

    test('uses a registered preflight command and gates the download on errors', async () => {
      editor.Commands.add('db:run-preflight', () => ({ errorCount: 1, warningCount: 0 }));
      const completions = [];
      editor.on('db:export:complete', (payload) => completions.push(payload));
      expect(editor.runCommand('db:download-site')).toBe(false);
      expect(completions.length).toBe(0);
      expect(editor.Modal.isOpen()).toBe(true);
      const modalContent = editor.Modal.getContentEl();
      expect(modalContent.textContent).toContain('Download anyway');
      modalContent.querySelector('[data-db-publish-continue]').click();
      await waitFor(20);
      expect(completions.length).toBe(1);
      expect(completions[0].archiveFileName).toBe('site.zip');
      expect(completions[0].message).toContain('saved to site.zip');
      expect(editor.Modal.isOpen()).toBe(false);
    });

    test('downloads straight away when the preflight is clean', () => {
      editor.Commands.add('db:run-preflight', () => ({ errorCount: 0, warningCount: 0 }));
      const completions = [];
      editor.on('db:export:complete', (payload) => completions.push(payload));
      expect(editor.runCommand('db:download-site')).toBe(true);
      expect(completions[0].kind).toBe('zip');
      expect(completions[0].fileNames).toContain('index.html');
    });

    test('the export modal leads with Check and download and tucks advanced files away', () => {
      editor.runCommand('db:open-export');
      const modalContent = editor.Modal.getContentEl();
      expect(modalContent.querySelector('[data-db-export-action="publish"]').textContent).toBe('Check and download');
      expect(modalContent.querySelector('details.gjs-db-export-details summary').textContent).toContain(
        'Advanced files',
      );
      expect(modalContent.querySelector('[data-db-export-option="separateAssets"]').checked).toBe(true);
      expect(modalContent.querySelector('[data-db-export-asset="siteScript"]')).toBeNull();
      expect(modalContent.textContent).toContain('No scripts on this site yet');
      expect(modalContent.textContent).toContain('Custom scripts: off');
      expect(modalContent.querySelector('input[disabled]')).toBeNull();
    });
  });

  describe('autosave', () => {
    test('writes an owner record and refuses to overwrite a newer save from another tab', () => {
      expect(saveProjectSnapshot(editor, moduleOptions)).toBe(true);
      const ownerRecord = readStoredRecord(activeKey(':owner'));
      expect(ownerRecord.tabId).toBe(editor.getModel().get('dbTabId'));
      const statuses = [];
      editor.on('db:save-status', (payload) => statuses.push(payload));
      getRecordStorageArea().setItem(
        activeKey(':owner'),
        JSON.stringify({ tabId: 'other-tab', savedAt: '2999-01-01T00:00:00.000Z' }),
      );
      expect(saveProjectSnapshot(editor, moduleOptions)).toBe(false);
      expect(statuses[0].state).toBe('error');
      expect(statuses[0].message).toContain('another tab');
    });

    test('flushes the pending save when the page is hidden', () => {
      saveProjectSnapshot(editor, moduleOptions);
      editor.getWrapper().append('<p>pending change</p>');
      expect(readStoredText(activeKey())).not.toContain('pending change');
      window.dispatchEvent(new Event('pagehide'));
      expect(readStoredText(activeKey())).toContain('pending change');
    });

    test('waits for inline text editing to end before it takes the snapshot', () => {
      jest.useFakeTimers();
      try {
        saveProjectSnapshot(editor, moduleOptions);
        const textComponent = editor.getWrapper().append({ type: 'text', content: 'Brand' })[0];
        editor.getModel().set('editing', { model: textComponent });
        editor.trigger('update');
        jest.advanceTimersByTime(moduleOptions.autosaveDelay + 50);
        expect(readStoredText(activeKey())).not.toContain('Brand');
        editor.getModel().set('editing', null);
        editor.trigger('rte:disable');
        jest.advanceTimersByTime(moduleOptions.autosaveDelay + 50);
        expect(readStoredText(activeKey())).toContain('Brand');
      } finally {
        jest.useRealTimers();
      }
    });

    test('offers the stored snapshot as a draft only when it is not auto-loaded', () => {
      saveProjectSnapshot(editor, moduleOptions);
      expect(readLocalDraftRecord(editor, moduleOptions)).toBeNull();
      const draftRecord = readLocalDraftRecord(editor, { ...moduleOptions, autoload: false });
      expect(draftRecord.kind).toBe('draft');
      expect(draftRecord.meta.pageCount).toBe(1);
    });

    test('follows the dbStorageKey override and persists on demand', () => {
      editor.getModel().set('dbStorageKey', storageKey + '-site-b');
      expect(editor.runCommand('db:persist-now')).toBe(true);
      expect(readStoredRecord(storageKey + '-site-b').projectData).toBeTruthy();
      expect(readStoredText(storageKey)).toBeNull();
      expect(saveRevisionRecord(editor, moduleOptions, 'Site B').label).toBe('Site B');
      expect(readStoredRecord(storageKey + '-site-b:revisions')[0].label).toBe('Site B');
      editor.getModel().set('dbStorageKey', '');
      expect(readRevisionList(editor, moduleOptions)).toEqual([]);
      expect(editor.runCommand('db:persist-now')).toBe(true);
      expect(readStoredRecord(activeKey()).projectData).toBeTruthy();
    });
  });

  describe('pooled snapshots', () => {
    test('reloads a pooled autosave snapshot with its pictures', async () => {
      const photoUrl = buildTestPhoto('abcd');
      editor.getWrapper().append('<img src="' + photoUrl + '"/>');
      expect(saveProjectSnapshot(editor, moduleOptions)).toBe(true);
      const storedSnapshot = readStoredRecord(activeKey());
      expect(JSON.stringify(storedSnapshot.projectData)).not.toContain('data:image/jpeg;base64,');
      await flushAssetWrites();
      const restoredSnapshot = await restorePayloadAssets(storedSnapshot.projectData);
      expect(JSON.stringify(restoredSnapshot)).toContain(photoUrl);
    });

    test('keeps the picture bytes out of the record and in the asset store', async () => {
      editor.Assets.add({ src: buildTestPhoto('abcd'), name: 'photo.jpg', type: 'image' });
      saveProjectSnapshot(editor, moduleOptions);
      await flushAssetWrites();
      expect(countPhotoCopies(readStoredText(activeKey()))).toBe(0);
      const pooledTokens = listKnownAssetTokens();
      expect(pooledTokens.length).toBe(1);
      const pooledAssets = await readPooledAssets(pooledTokens);
      expect(pooledAssets[pooledTokens[0]]).toBe(buildTestPhoto('abcd'));
    });

    test('reports usage against what the browser allows, not a fixed budget', async () => {
      editor.Assets.add({ src: buildTestPhoto('abcd'), name: 'photo.jpg', type: 'image' });
      saveProjectSnapshot(editor, moduleOptions);
      await flushAssetWrites();
      expect(await buildStorageUsageText()).toMatch(/Using .+ of (the .+ this browser allows|browser storage)/);
    });

    test('records the real project size so the draft card does not under-report', () => {
      editor.getWrapper().append('<img src="' + buildTestPhoto('abcd') + '"/>');
      saveProjectSnapshot(editor, moduleOptions);
      const draftRecord = readLocalDraftRecord(editor, { ...moduleOptions, autoload: false });
      expect(draftRecord.meta.byteLength).toBeGreaterThan(buildTestPhoto('abcd').length);
    });
  });

  describe('revisions', () => {
    test('saves revisions with plain labels and page metadata', () => {
      const revisionRecord = saveRevisionRecord(editor, moduleOptions, '');
      expect(revisionRecord.label).toBe('Manual save');
      expect(revisionRecord.meta.pageNames).toEqual(['Home']);
      expect(revisionRecord.meta.byteLength).toBeGreaterThan(0);
      expect(readRevisionList(editor, moduleOptions)[0].isRestorable).toBe(true);
    });

    test('keeps a safety copy before restoring and clears the undo history', async () => {
      const revisionRecord = saveRevisionRecord(editor, moduleOptions, 'Milestone');
      expect(saveSafetyRevision(editor, moduleOptions, revisionRecord).savedRecord).toBeNull();
      editor.getWrapper().append('<p>after revision</p>');
      const safetyResult = saveSafetyRevision(editor, moduleOptions, revisionRecord);
      expect(safetyResult.savedRecord.label).toBe('Before restoring "Milestone"');
      expect(safetyResult.savedRecord.kind).toBe('safety');
      expect(await restoreRevisionRecord(editor, revisionRecord)).toBe(true);
      expect(editor.UndoManager.hasUndo()).toBe(false);
      expect(editor.getHtml()).not.toContain('after revision');
      const newestRecord = readRevisionList(editor, moduleOptions).find(
        (storedRecord) => storedRecord.kind === 'safety',
      );
      expect(JSON.stringify(newestRecord.payload.projectData)).toContain('after revision');
    });

    test('stores one shared copy of a picture however many revisions hold it', async () => {
      editor.Assets.add({ src: buildTestPhoto('abcd'), name: 'photo.jpg', type: 'image' });
      saveProjectSnapshot(editor, moduleOptions);
      ['First', 'Second', 'Third'].forEach((labelText) => saveRevisionRecord(editor, moduleOptions, labelText));
      await flushAssetWrites();
      expect(countPhotoCopies(readStoredText(activeKey()))).toBe(0);
      expect(countPhotoCopies(readStoredText(activeKey(':revisions')))).toBe(0);
      expect(readStoredText(activeKey(':revisions'))).toContain('db-pooled-asset:');
      expect(listKnownAssetTokens().length).toBe(1);
    });

    test('restores a pooled revision with its pictures intact', async () => {
      const photoUrl = buildTestPhoto('abcd');
      editor.Assets.add({ src: photoUrl, name: 'photo.jpg', type: 'image' });
      editor.getWrapper().append('<img src="' + photoUrl + '"/>');
      const revisionRecord = saveRevisionRecord(editor, moduleOptions, 'With picture');
      editor.getWrapper().components('<p>replaced</p>');
      await flushAssetWrites();
      const storedRevision = readRevisionList(editor, moduleOptions)[0];
      expect(await runRevisionRestoreFlow(editor, moduleOptions, storedRevision)).toBe(true);
      expect(editor.getHtml()).toContain(photoUrl);
      expect(JSON.stringify(revisionRecord.payload)).toContain('db-pooled-asset:');
    });

    test('drops pooled pictures once no revision or snapshot points at them', async () => {
      editor.Assets.add({ src: buildTestPhoto('abcd'), name: 'photo.jpg', type: 'image' });
      const revisionRecord = saveRevisionRecord(editor, moduleOptions, 'Only holder');
      await flushAssetWrites();
      expect(listKnownAssetTokens().length).toBe(1);
      editor.Assets.remove(editor.Assets.getAll().at(0));
      deleteRevisionRecord(editor, moduleOptions, revisionRecord.id);
      // The stored snapshot still names the picture until it is written again,
      // and while it does the sweep is right to keep it.
      saveProjectSnapshot(editor, moduleOptions);
      await pruneAssetPool();
      expect(listKnownAssetTokens()).toEqual([]);
    });

    test('skips a safety copy when the project still matches the newest revision', () => {
      editor.Assets.add({ src: buildTestPhoto('abcd'), name: 'photo.jpg', type: 'image' });
      const revisionRecord = saveRevisionRecord(editor, moduleOptions, 'Milestone');
      expect(saveSafetyRevision(editor, moduleOptions, revisionRecord).savedRecord).toBeNull();
    });

    test('reports a revision failure on its own channel instead of the autosave strip', async () => {
      await useLocalStorageFallback();
      const statuses = [];
      const revisionErrors = [];
      editor.on('db:save-status', (payload) => statuses.push(payload));
      editor.on('db:revision:error', (payload) => revisionErrors.push(payload));
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        const quotaError = new Error('raw quota text');
        quotaError.name = 'QuotaExceededError';
        throw quotaError;
      };
      try {
        expect(saveRevisionRecord(editor, moduleOptions, 'Will fail')).toBeNull();
      } finally {
        localStorage.setItem = originalSetItem;
      }
      expect(statuses.length).toBe(0);
      expect(revisionErrors[0].message).toContain('Browser storage is full');
      expect(editor.getModel().get('dbLastRevisionErrorMessage')).toContain('Browser storage is full');
    });
  });
});
