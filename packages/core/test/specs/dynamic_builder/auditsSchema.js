import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyAuditFix from '../../../src/dynamic-builder/audits/applyAuditFix';
import buildAuditReportMarkup from '../../../src/dynamic-builder/audits/buildAuditReportMarkup';
import buildFindingItemMarkup from '../../../src/dynamic-builder/audits/buildFindingItemMarkup';
import buildFindingListMarkup from '../../../src/dynamic-builder/audits/buildFindingListMarkup';
import buildOrganizationRecord from '../../../src/dynamic-builder/schema/buildOrganizationRecord';
import buildSchemaRecordsFromValues from '../../../src/dynamic-builder/schema/buildSchemaRecordsFromValues';
import buildSeverityCountsMarkup from '../../../src/dynamic-builder/audits/buildSeverityCountsMarkup';
import buildValidationBadgeMarkup from '../../../src/dynamic-builder/schema/buildValidationBadgeMarkup';
import checkDocumentLanguage from '../../../src/dynamic-builder/audits/checkDocumentLanguage';
import checkInteractiveTargetSize from '../../../src/dynamic-builder/audits/checkInteractiveTargetSize';
import checkSchemaPageType from '../../../src/dynamic-builder/audits/checkSchemaPageType';
import checkSeoTitle from '../../../src/dynamic-builder/audits/checkSeoTitle';
import checkSingleH1Presence from '../../../src/dynamic-builder/audits/checkSingleH1Presence';
import checkTextContrast from '../../../src/dynamic-builder/audits/checkTextContrast';
import checkWordCount from '../../../src/dynamic-builder/audits/checkWordCount';
import evaluateSchemaValidation from '../../../src/dynamic-builder/schema/evaluateSchemaValidation';
import getAuditContext from '../../../src/dynamic-builder/audits/getAuditContext';
import getProductValidationRules from '../../../src/dynamic-builder/schema/getProductValidationRules';
import normalizeSchemaPriceValue from '../../../src/dynamic-builder/schema/normalizeSchemaPriceValue';
import normalizeSchemaUrlValue from '../../../src/dynamic-builder/schema/normalizeSchemaUrlValue';
import resolveEffectiveBackgroundColor from '../../../src/dynamic-builder/audits/resolveEffectiveBackgroundColor';
import runSeoAudit from '../../../src/dynamic-builder/audits/runSeoAudit';
import splitSameAsLines from '../../../src/dynamic-builder/schema/splitSameAsLines';
import updateSiteMetaRecord from '../../../src/dynamic-builder/support/updateSiteMetaRecord';

const buildFakeCanvasWindow = (styleOverrides = {}) => ({
  innerHeight: 800,
  scrollY: 0,
  getComputedStyle: (element) => ({
    display: element.dataset.display || 'block',
    visibility: 'visible',
    color: element.dataset.color || 'rgb(255, 255, 255)',
    fontSize: '16px',
    fontWeight: '400',
    backgroundImage: element.dataset.bg || 'none',
    backgroundColor: element.dataset.bgcolor || 'rgba(0, 0, 0, 0)',
    ...styleOverrides,
  }),
});

const stubElementRect = (element, width, height) => {
  element.getBoundingClientRect = () => ({ width, height, top: 10, left: 0, right: width, bottom: height });
};

const buildFakeDomContext = (markup) => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = markup;
  rootElement.querySelectorAll('*').forEach((element) => stubElementRect(element, 200, 20));
  return {
    editor: null,
    moduleOptions: {},
    canvasRoot: rootElement,
    canvasBody: rootElement,
    canvasWindow: buildFakeCanvasWindow(),
    wrapperComponent: null,
    siteMeta: {},
    pageMeta: {},
    pageName: 'Home',
    pageId: 'home',
  };
};

describe('Dynamic builder audits and schema', () => {
  let editor;

  beforeEach(() => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
  });

  afterEach(() => {
    editor.destroy();
  });

  describe('severity naming', () => {
    test('the finding badge and the counts use the same words', () => {
      expect(buildFindingItemMarkup({ severity: 'info', group: 'Content', message: 'x' })).toContain('>Note<');
      expect(buildSeverityCountsMarkup({ info: 2 })).toContain('2 notes');
      expect(buildSeverityCountsMarkup({ info: 1 })).toContain('1 note');
    });
  });

  describe('contrast over images', () => {
    test('resolveEffectiveBackgroundColor gives up when an ancestor has a background image', () => {
      const section = document.createElement('section');
      section.dataset.bg = 'url(hero.jpg)';
      const heading = document.createElement('h1');
      section.appendChild(heading);
      expect(resolveEffectiveBackgroundColor(heading, buildFakeCanvasWindow())).toBeNull();
    });

    test('text over an image produces one note instead of contrast errors', () => {
      const auditContext = buildFakeDomContext(
        '<section data-bg="linear-gradient(#111, #222)"><h1>White text on image</h1><p>Second text</p></section>',
      );
      const findings = checkTextContrast(auditContext);
      expect(findings.filter((finding) => finding.severity === 'error')).toEqual([]);
      expect(findings.length).toBe(1);
      expect(findings[0].message).toContain('could not be verified');
    });
  });

  describe('target size', () => {
    test('native checkboxes are skipped, tiny buttons warn, and 40px links only get a note', () => {
      const auditContext = buildFakeDomContext(
        '<label><input type="checkbox" id="agree"> Agree</label><button id="tiny">Go</button><a id="social" href="#">S</a>',
      );
      stubElementRect(auditContext.canvasRoot.querySelector('#agree'), 13, 13);
      stubElementRect(auditContext.canvasRoot.querySelector('#tiny'), 20, 20);
      stubElementRect(auditContext.canvasRoot.querySelector('#social'), 40, 40);
      const findings = checkInteractiveTargetSize(auditContext);
      const warnings = findings.filter((finding) => finding.severity === 'warning');
      expect(warnings.length).toBe(1);
      expect(warnings[0].message).toContain('20x20px');
      const notes = findings.filter((finding) => finding.severity === 'info');
      expect(notes.length).toBe(1);
      expect(notes[0].message).toContain('between 24 and 44px');
    });
  });

  describe('SEO checks', () => {
    test('word count ignores style text', () => {
      const auditContext = buildFakeDomContext('<style>.a { color: red; } .b { margin: 0; }</style><p>Short page.</p>');
      const findings = checkWordCount(auditContext);
      expect(findings[0].message).toContain('about 2 words');
    });

    test('the title check follows the exporter fallback chain', () => {
      const auditContext = {
        siteMeta: { seo: { siteName: 'Acme Studio' } },
        pageMeta: {},
        pageName: 'About Us',
      };
      const findings = checkSeoTitle(auditContext);
      expect(findings.some((finding) => finding.severity === 'error')).toBe(false);
      expect(findings[0].message).toContain('About Us | Acme Studio');
      expect(findings[0].fixId).toBe('seo-field:title');
    });

    test('the language check says English will be declared', () => {
      const findings = checkDocumentLanguage({ siteMeta: {}, pageMeta: {} });
      expect(findings[0].message).toContain('lang="en"');
      expect(checkDocumentLanguage({ siteMeta: { seo: { language: 'de' } }, pageMeta: {} })).toEqual([]);
    });

    test('pages without a slug get a note about derived addresses, not a sitemap warning', () => {
      editor.Pages.add({ name: 'About Us' });
      const findings = runSeoAudit(editor, {}, getAuditContext(editor, {}));
      const sitemapFindings = findings.filter((finding) => finding.group === 'Sitemap');
      expect(sitemapFindings.length).toBe(1);
      expect(sitemapFindings[0].severity).toBe('info');
      expect(sitemapFindings[0].message).toContain('about-us');
    });

    test('the structured data check stays quiet on plain pages and reports missing article fields', () => {
      const selectedPage = editor.Pages.getSelected();
      expect(checkSchemaPageType({ editor, page: selectedPage, siteMeta: {}, pageMeta: {} })).toEqual([]);
      const findings = checkSchemaPageType({
        editor,
        page: selectedPage,
        siteMeta: {},
        pageMeta: { schema: { pageType: 'Article', article: { authorName: 'Ada' } } },
      });
      expect(findings[0].message).toContain('Headline');
      expect(findings[0].message).toContain('Date published');
      expect(findings[0].fixId).toBe('open-schema-manager');
    });

    test('extra h1 headings each get a demote fix', () => {
      const auditContext = buildFakeDomContext('<h1>One</h1><h1>Two</h1><h1>Three</h1>');
      const findings = checkSingleH1Presence(auditContext);
      expect(findings.length).toBe(2);
      expect(findings.every((finding) => finding.fixId === 'demote-heading')).toBe(true);
    });
  });

  describe('report and fixes', () => {
    test('the report shows an empty state before any run and a timestamp after', () => {
      expect(buildAuditReportMarkup(editor)).toContain('Not run yet');
      expect(buildAuditReportMarkup(editor)).not.toContain('0 errors');
      editor.runCommand('db:run-seo-audit', { openReport: false });
      const reportMarkup = buildAuditReportMarkup(editor);
      expect(reportMarkup).toContain('Last run just now');
      expect(reportMarkup).toContain('data-db-audit-scope');
    });

    test('site scope tags findings with page names and groups them', () => {
      editor.Pages.add({ name: 'About Us' });
      const findings = editor.runCommand('db:run-seo-audit', { openReport: false, scope: 'site' });
      const pageNames = new Set(findings.map((finding) => finding.pageName));
      expect(pageNames.has('About Us')).toBe(true);
      expect(buildFindingListMarkup(findings)).toContain('gjs-db-audit-page-head');
    });

    test('fix actions demote a heading and enable lazy loading', () => {
      const wrapper = editor.getWrapper();
      const components = wrapper.append('<h1>One</h1><h1 data-db-level="1">Two</h1><img src="a.png" alt="">');
      const secondHeading = components[1];
      const image = components[2];
      expect(applyAuditFix(editor, 'demote-heading', secondHeading.getId()).label).toBe('Change to h2');
      expect(secondHeading.get('tagName')).toBe('h2');
      expect(secondHeading.getAttributes()['data-db-level']).toBe('2');
      expect(applyAuditFix(editor, 'lazy-loading', image.getId())).not.toBeNull();
      expect(image.getAttributes().loading).toBe('lazy');
      expect(applyAuditFix(editor, 'nope', image.getId())).toBeNull();
    });

    test('finding markup renders show and fix buttons with component ids', () => {
      const markup = buildFindingItemMarkup({
        severity: 'error',
        group: 'Images',
        message: 'Image has no alt text.',
        componentId: 'abc',
        fixId: 'alt-text',
      });
      expect(markup).toContain('data-db-audit-show');
      expect(markup).toContain('data-db-audit-fix="alt-text"');
      expect(markup).toContain('data-db-audit-component="abc"');
      expect(markup).toContain('Add alt text');
    });
  });

  describe('publish preflight', () => {
    test('the preflight lists unconnected forms, placeholder links, sample text and site settings', () => {
      const wrapper = editor.getWrapper();
      wrapper.append({ type: 'db-form' });
      wrapper.append('<a href="#">Read more</a><p data-db-placeholder="true">Sample copy</p>');
      const result = editor.runCommand('db:run-preflight', { openReport: false });
      expect(result.isReady).toBe(false);
      const fixIds = result.items.map((item) => item.fixId);
      expect(fixIds).toContain('form-action');
      expect(fixIds).toContain('link-href');
      expect(fixIds).toContain('edit-text');
      expect(fixIds).toContain('open-site-identity');
      expect(fixIds).toContain('seo-field:canonicalBase');
      expect(
        result.items.every(
          (item) => item.pageName || item.fixId.startsWith('seo') || item.fixId === 'open-site-identity',
        ),
      ).toBe(true);
    });

    test('a connected site with real content is ready', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Acme Studio', canonicalBase: 'https://www.acme.test' } });
      editor.getWrapper().append('<p>Real words here.</p>');
      const result = editor.runCommand('db:run-preflight', { openReport: false });
      expect(result.items).toEqual([]);
      expect(result.isReady).toBe(true);
    });

    test('opening the preflight renders a checklist modal with fix buttons', () => {
      editor.getWrapper().append({ type: 'db-form' });
      editor.runCommand('db:run-preflight');
      const rootElement = editor.getContainer().querySelector('[data-db-preflight-root]');
      expect(rootElement).not.toBeNull();
      expect(rootElement.querySelector('[data-db-audit-fix="form-action"]')).not.toBeNull();
      expect(rootElement.textContent).toContain('to check before you publish');
    });
  });

  describe('schema values', () => {
    test('prices and urls are normalised and invalid values rejected', () => {
      expect(normalizeSchemaPriceValue('$19.99')).toBe('19.99');
      expect(normalizeSchemaPriceValue('1,299.50')).toBe('1299.5');
      expect(normalizeSchemaPriceValue('free')).toBe('');
      expect(normalizeSchemaUrlValue('acme.test')).toBe('https://acme.test/');
      expect(normalizeSchemaUrlValue('not a url')).toBe('');
      expect(normalizeSchemaUrlValue('https://x.test/s?q={search_term_string}')).toBe(
        'https://x.test/s?q={search_term_string}',
      );
      expect(splitSameAsLines('https://x.com/acme\nnot a url')).toEqual(['https://x.com/acme']);
    });

    test('validation reports invalid formats with readable labels', () => {
      const validation = evaluateSchemaValidation({ name: 'Widget', price: '$19.99' }, getProductValidationRules());
      expect(validation.invalid).toEqual(['price']);
      expect(buildValidationBadgeMarkup(validation, 'product')).toContain('Check: Price');
      expect(buildValidationBadgeMarkup({ missingRequired: ['faqEntries'] }, 'FAQPage')).toContain('accordion');
      expect(buildValidationBadgeMarkup({ missingRequired: ['headline', 'datePublished'] }, 'Article')).toContain(
        'Missing: Headline, Date published',
      );
      expect(buildValidationBadgeMarkup({}, 'organization', { isUntouched: true })).toContain('Not published yet');
    });

    test('organization records respect the chosen type', () => {
      const plainRecord = buildOrganizationRecord({
        name: 'Acme',
        url: 'acme.test',
        openingHours: 'Mo-Fr 09:00-17:00',
      });
      expect(plainRecord.openingHours).toBeUndefined();
      expect(plainRecord.url).toBe('https://acme.test/');
      const shopRecord = buildOrganizationRecord({
        type: 'Restaurant',
        name: 'Bistro',
        openingHours: 'Mo-Fr 09:00-17:00',
      });
      expect(shopRecord.openingHours).toBe('Mo-Fr 09:00-17:00');
      const personRecord = buildOrganizationRecord({
        type: 'Person',
        name: 'Ada',
        jobTitle: 'Designer',
        logo: 'https://a.test/l.png',
      });
      expect(personRecord['@type']).toBe('Person');
      expect(personRecord.jobTitle).toBe('Designer');
      expect(personRecord.logo).toBeUndefined();
    });

    test('site records fall back to SEO settings and pages link to the site', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Acme Studio', canonicalBase: 'https://www.acme.test' } });
      const page = editor.Pages.getSelected();
      const records = buildSchemaRecordsFromValues(editor, page, {}, {});
      const websiteRecord = records.find((record) => record['@type'] === 'WebSite');
      expect(websiteRecord.name).toBe('Acme Studio');
      expect(websiteRecord.url).toBe('https://www.acme.test/');
      const pageRecord = records.find((record) => record['@type'] === 'WebPage');
      expect(pageRecord.isPartOf.url).toBe('https://www.acme.test/');
      const articleRecords = buildSchemaRecordsFromValues(
        editor,
        page,
        { organization: { logo: 'https://www.acme.test/logo.png' } },
        { pageType: 'Article', article: { headline: 'Hello', datePublished: '2026-01-31' } },
      );
      const articleRecord = articleRecords.find((record) => record['@type'] === 'Article');
      expect(articleRecord.publisher.name).toBe('Acme Studio');
      expect(articleRecord.publisher.logo.url).toBe('https://www.acme.test/logo.png');
      expect(articleRecord.dateModified).toBe('2026-01-31');
    });
  });

  describe('schema manager modal', () => {
    test('opens with tabs, help on every field, prefilled site values and an honest preview caption', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Acme Studio', canonicalBase: 'https://www.acme.test' } });
      editor.runCommand('db:open-schema-manager');
      const rootElement = editor.getContainer().querySelector('[data-db-schema-root]');
      expect(rootElement.querySelectorAll('[data-db-schema-tab]').length).toBe(3);
      const fieldsWithoutHelp = [...rootElement.querySelectorAll('[data-db-schema-field]')].filter(
        (fieldElement) => !fieldElement.parentElement.querySelector('.gjs-db-field-help'),
      );
      expect(fieldsWithoutHelp).toEqual([]);
      expect(rootElement.querySelector('[data-db-schema-field="website.name"]').value).toBe('Acme Studio');
      expect(rootElement.querySelector('[data-db-schema-field="organization.url"]').value).toBe(
        'https://www.acme.test',
      );
      expect(rootElement.querySelector('[data-db-schema-badge="organization"]').textContent).not.toContain('Missing');
      expect(
        rootElement.querySelector('[data-db-schema-field="organization.type"] option[value="Person"]'),
      ).not.toBeNull();
      expect(rootElement.querySelector('[data-db-schema-field="product.price"]').getAttribute('type')).toBe('number');
      expect(rootElement.querySelector('[data-db-schema-field="article.datePublished"]').getAttribute('type')).toBe(
        'date',
      );
      const noteElement = rootElement.querySelector('[data-db-schema-preview-note]');
      expect(noteElement.textContent).toContain('Save to publish');
      expect(noteElement.textContent).not.toContain('unsaved');
      const pageTypeSelect = rootElement.querySelector('[data-db-schema-field="pageType"]');
      pageTypeSelect.value = 'Product';
      pageTypeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      expect(noteElement.textContent).toContain('unsaved changes');
      expect(rootElement.querySelector('[data-db-schema-readiness]').textContent).toContain('Product rich result');
      expect(rootElement.querySelector('[data-db-schema-test-link]').getAttribute('href')).toContain(
        'search.google.com/test/rich-results',
      );
    });
  });
});
