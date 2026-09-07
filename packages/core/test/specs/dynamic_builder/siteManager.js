import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applySiteManager from '../../../src/dynamic-builder/siteManager/applySiteManager';
import buildSiteCardMarkup from '../../../src/dynamic-builder/siteManager/buildSiteCardMarkup';
import buildSiteRecord from '../../../src/dynamic-builder/siteManager/buildSiteRecord';
import createLocalStorageSiteAdapter from '../../../src/dynamic-builder/siteManager/createLocalStorageSiteAdapter';
import describeSiteMetaText from '../../../src/dynamic-builder/siteManager/describeSiteMetaText';
import getSiteMetaRecord from '../../../src/dynamic-builder/support/getSiteMetaRecord';
import pickNewestSiteRecord from '../../../src/dynamic-builder/siteManager/pickNewestSiteRecord';
import resolveSiteManagerOptions from '../../../src/dynamic-builder/siteManager/resolveSiteManagerOptions';

const siteIndexKey = 'db-sites:index';
const siteUserKey = 'db-sites:user';

const clearSiteStorage = () =>
  Object.keys(localStorage)
    .filter((keyName) => keyName.startsWith('db-site') || keyName.startsWith('db-project'))
    .forEach((keyName) => localStorage.removeItem(keyName));

const readIndexSites = () => JSON.parse(localStorage.getItem(siteIndexKey) || '{"sites":[]}').sites;

const waitFor = (delayMs) => new Promise((resolveWait) => setTimeout(resolveWait, delayMs));

jest.setTimeout(30000);

describe('Dynamic builder site manager', () => {
  describe('site records', () => {
    test('builds a record with a slug, a storage key and timestamps', () => {
      const siteRecord = buildSiteRecord({ name: '  Bakery on Main  ', description: ' Menu and hours ' });
      expect(siteRecord.name).toBe('Bakery on Main');
      expect(siteRecord.slug).toBe('bakery-on-main');
      expect(siteRecord.description).toBe('Menu and hours');
      expect(siteRecord.storageKey).toBe('db-site:' + siteRecord.id);
      expect(siteRecord.pageCount).toBe(1);
      expect(siteRecord.createdAt).toBe(siteRecord.updatedAt);
      expect(new Date(siteRecord.createdAt).getTime()).toBeGreaterThan(0);
    });

    test('falls back to a readable name and keeps ids unique', () => {
      expect(buildSiteRecord({}).name).toBe('Untitled site');
      expect(buildSiteRecord({}).id).not.toBe(buildSiteRecord({}).id);
    });

    test('picks the newest record and describes a card summary', () => {
      const olderRecord = buildSiteRecord({ name: 'Older', updatedAt: '2024-01-01T00:00:00.000Z' });
      const newerRecord = buildSiteRecord({ name: 'Newer', updatedAt: '2025-01-01T00:00:00.000Z' });
      expect(pickNewestSiteRecord([olderRecord, newerRecord]).name).toBe('Newer');
      expect(pickNewestSiteRecord([])).toBeNull();
      const summaryText = describeSiteMetaText({ pageCount: 3, updatedAt: new Date().toISOString() }, new Date());
      expect(summaryText).toContain('3 pages');
      expect(summaryText).toContain('just now');
      expect(describeSiteMetaText({ pageCount: 1, updatedAt: '' }, new Date())).toBe('1 page');
    });

    test('escapes site names in the card markup', () => {
      const cardMarkup = buildSiteCardMarkup(
        buildSiteRecord({ id: 'site-x', name: '<img src=x onerror=alert(1)>' }),
        'site-x',
        new Date(),
      );
      expect(cardMarkup).not.toContain('<img');
      expect(cardMarkup).toContain('Open now');
      expect(cardMarkup).toContain('data-db-site-action="export"');
    });
  });

  describe('local storage adapter', () => {
    beforeEach(() => clearSiteStorage());
    afterEach(() => clearSiteStorage());

    test('round trips sites, project payloads and the owner record', async () => {
      const siteAdapter = createLocalStorageSiteAdapter();
      expect(await siteAdapter.listSites()).toEqual([]);
      const siteRecord = buildSiteRecord({ name: 'Round trip' });
      expect(await siteAdapter.writeSite(siteRecord, { projectData: { pages: [] }, savedAt: 'now' })).toBe(true);
      expect(readIndexSites().length).toBe(1);
      expect(localStorage.getItem(siteRecord.storageKey)).toContain('projectData');
      const storedEntry = await siteAdapter.readSite(siteRecord.id);
      expect(storedEntry.record.name).toBe('Round trip');
      expect(storedEntry.snapshot.savedAt).toBe('now');
      expect(await siteAdapter.readSite('missing-site')).toBeNull();
      await siteAdapter.writeSite({ ...siteRecord, name: 'Renamed' });
      const renamedList = await siteAdapter.listSites();
      expect(renamedList.length).toBe(1);
      expect(renamedList[0].name).toBe('Renamed');
      expect(await siteAdapter.readUser()).toBeNull();
      await siteAdapter.writeUser({ id: 'owner-1', name: 'Sam', email: 'sam@example.com', lastSiteId: siteRecord.id });
      expect((await siteAdapter.readUser()).lastSiteId).toBe(siteRecord.id);
      expect(localStorage.getItem(siteUserKey)).toContain('sam@example.com');
      await siteAdapter.deleteSite(siteRecord.id);
      expect(await siteAdapter.listSites()).toEqual([]);
      expect(localStorage.getItem(siteRecord.storageKey)).toBeFalsy();
    });

    test('ignores junk in the index and rejects records without an id', async () => {
      localStorage.setItem(siteIndexKey, '{"sites":"broken"}');
      const siteAdapter = createLocalStorageSiteAdapter();
      expect(await siteAdapter.listSites()).toEqual([]);
      expect(await siteAdapter.writeSite({ name: 'No id' })).toBe(false);
    });

    test('the resolved options keep a supplied adapter and owner', () => {
      const fakeAdapter = { listSites: () => Promise.resolve([]) };
      const managerOptions = resolveSiteManagerOptions({
        siteManager: { storageAdapter: fakeAdapter, user: { id: 'u1', name: 'Ada' }, openOnStart: false },
      });
      expect(managerOptions.storageAdapter).toBe(fakeAdapter);
      expect(managerOptions.user).toEqual({ id: 'u1', name: 'Ada', email: '' });
      expect(managerOptions.openOnStart).toBe(false);
      const defaultOptions = resolveSiteManagerOptions({});
      expect(typeof defaultOptions.storageAdapter.listSites).toBe('function');
      expect(defaultOptions.openOnStart).toBe(true);
      expect(defaultOptions.user.id).toBe('local-owner');
    });
  });

  describe('with an editor', () => {
    let editor;

    const initEditor = (siteManagerOptions) => {
      document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
      const pluginOptions = {
        persistence: { storageKey: 'db-project:site-manager-spec' },
        siteManager: { openOnStart: false, ...(siteManagerOptions || {}) },
      };
      editor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [
          fixJsDom,
          (editorInstance) => {
            grapesjs.dynamicBuilder(editorInstance, pluginOptions);
            applySiteManager(editorInstance, pluginOptions);
          },
        ],
      });
      fixJsDomIframe(editor.getModel().shallow);
      const readyPromise = new Promise((resolveReady) => editor.on('db:site:ready', resolveReady));
      return readyPromise;
    };

    const getStorageKey = () => editor.getModel().get('dbStorageKey');

    beforeEach(() => clearSiteStorage());

    afterEach(() => {
      editor && editor.destroy();
      editor = null;
      clearSiteStorage();
    });

    test('adopts the existing project as the first site instead of losing it', async () => {
      const readyPayload = await initEditor();
      expect(readyPayload.adopted).toBe(true);
      const siteRecords = readIndexSites();
      expect(siteRecords.length).toBe(1);
      expect(siteRecords[0].name).toBe('My first site');
      expect(getStorageKey()).toBe(siteRecords[0].storageKey);
      const storedSnapshot = JSON.parse(localStorage.getItem(siteRecords[0].storageKey));
      expect(storedSnapshot.projectData.pages.length).toBe(1);
      expect(JSON.parse(localStorage.getItem(siteUserKey)).lastSiteId).toBe(siteRecords[0].id);
    });

    test('names the first site after the site meta when one is set', async () => {
      localStorage.setItem(
        'db-project:site-manager-spec',
        JSON.stringify({ projectData: { pages: [{ name: 'Home' }] }, siteMeta: { seo: { siteName: 'Acme Co' } } }),
      );
      await initEditor();
      expect(readIndexSites()[0].name).toBe('Acme Co');
    });

    test('creating a site switches the storage key and seeds its own home page', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      editor.Pages.add({ name: 'About', component: '<div>about</div>' }, { select: false });
      const createdRecord = await editor.runCommand('db:create-site', {
        name: 'Second site',
        description: 'A shop',
      });
      expect(createdRecord.name).toBe('Second site');
      expect(createdRecord.slug).toBe('second-site');
      expect(getStorageKey()).toBe(createdRecord.storageKey);
      expect(getStorageKey()).not.toBe(firstRecord.storageKey);
      expect(editor.Pages.getAll().length).toBe(1);
      expect(getSiteMetaRecord(editor).seo.siteName).toBe('Second site');
      expect(readIndexSites().length).toBe(2);
      const firstSnapshot = JSON.parse(localStorage.getItem(firstRecord.storageKey));
      expect(firstSnapshot.projectData.pages.length).toBe(2);
      expect(readIndexSites().find((siteRecord) => siteRecord.id === firstRecord.id).pageCount).toBe(2);
      expect(await editor.runCommand('db:create-site', { name: '   ' })).toBeNull();
      expect(readIndexSites().length).toBe(2);
      editor.Pages.add({ name: 'Team', component: '<div>team</div>' }, { select: false });
      editor.runCommand('db:persist-now');
      const createdSnapshot = JSON.parse(localStorage.getItem(createdRecord.storageKey));
      expect(createdSnapshot.projectData.pages.map((pageRecord) => pageRecord.name)).toContain('Team');
    });

    test('switching sites restores each project from its own storage key', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      editor.Pages.add({ name: 'Contact', component: '<div>contact</div>' }, { select: false });
      const secondRecord = await editor.runCommand('db:create-site', { name: 'Second site' });
      editor.Pages.add({ name: 'Pricing', component: '<div>pricing</div>' }, { select: false });
      await editor.runCommand('db:switch-site', { siteId: firstRecord.id });
      expect(getStorageKey()).toBe(firstRecord.storageKey);
      expect(editor.Pages.getAll().map((pageModel) => pageModel.getName())).toEqual(['Home', 'Contact']);
      await editor.runCommand('db:switch-site', { siteId: secondRecord.id });
      expect(getStorageKey()).toBe(secondRecord.storageKey);
      expect(editor.Pages.getAll().map((pageModel) => pageModel.getName())).toEqual(['Home', 'Pricing']);
      expect(JSON.parse(localStorage.getItem(siteUserKey)).lastSiteId).toBe(secondRecord.id);
    });

    test('reopens the last edited site on the next session', async () => {
      await initEditor();
      const secondRecord = await editor.runCommand('db:create-site', { name: 'Second site' });
      editor.Pages.add({ name: 'Studio', component: '<div>studio</div>' }, { select: false });
      editor.runCommand('db:persist-now');
      editor.destroy();
      const readyPayload = await initEditor();
      expect(readyPayload.adopted).toBe(false);
      expect(getStorageKey()).toBe(secondRecord.storageKey);
      expect(editor.Pages.getAll().map((pageModel) => pageModel.getName())).toContain('Studio');
      expect(readIndexSites().length).toBe(2);
    });

    test('renaming updates the record and the site name used by exports', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      const renamedRecord = await editor.runCommand('db:rename-site', {
        siteId: firstRecord.id,
        name: 'Harbour Cafe',
        description: 'Coffee and cake',
      });
      expect(renamedRecord.name).toBe('Harbour Cafe');
      expect(renamedRecord.slug).toBe('harbour-cafe');
      expect(readIndexSites()[0].description).toBe('Coffee and cake');
      expect(getSiteMetaRecord(editor).seo.siteName).toBe('Harbour Cafe');
    });

    test('deleting another site removes its record and payload only', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      const secondRecord = await editor.runCommand('db:create-site', { name: 'Second site' });
      await editor.runCommand('db:delete-site', { siteId: firstRecord.id });
      expect(readIndexSites().map((siteRecord) => siteRecord.id)).toEqual([secondRecord.id]);
      expect(localStorage.getItem(firstRecord.storageKey)).toBeFalsy();
      expect(getStorageKey()).toBe(secondRecord.storageKey);
    });

    test('deleting the open site opens the remaining one', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      editor.Pages.add({ name: 'Menu', component: '<div>menu</div>' }, { select: false });
      editor.runCommand('db:persist-now');
      const secondRecord = await editor.runCommand('db:create-site', { name: 'Second site' });
      await editor.runCommand('db:delete-site', { siteId: secondRecord.id });
      expect(getStorageKey()).toBe(firstRecord.storageKey);
      expect(editor.Pages.getAll().map((pageModel) => pageModel.getName())).toEqual(['Home', 'Menu']);
      expect(readIndexSites().length).toBe(1);
    });

    test('deleting the only site leaves a fresh site to work in', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      await editor.runCommand('db:delete-site', { siteId: firstRecord.id });
      const remainingRecords = readIndexSites();
      expect(remainingRecords.length).toBe(1);
      expect(remainingRecords[0].id).not.toBe(firstRecord.id);
      expect(getStorageKey()).toBe(remainingRecords[0].storageKey);
    });

    test('the manager lists every site, marks the open one and creates from the form', async () => {
      await initEditor();
      await editor.runCommand('db:create-site', { name: 'Second site' });
      editor.runCommand('db:open-site-manager');
      await waitFor(5);
      const modalContent = editor.Modal.getContentEl();
      const cardElements = modalContent.querySelectorAll('[data-db-site-id]');
      expect(cardElements.length).toBe(2);
      expect(modalContent.querySelectorAll('.gjs-db-site-card-current').length).toBe(1);
      expect(modalContent.textContent).toContain('Second site');
      modalContent.querySelector('[data-db-site-new-form]').dispatchEvent(new Event('submit', { bubbles: true }));
      await waitFor(10);
      expect(modalContent.querySelector('[data-db-site-error]').textContent).toContain('name');
      expect(readIndexSites().length).toBe(2);
      modalContent.querySelector('[data-db-site-new-form] [name="siteName"]').value = 'Third site';
      modalContent.querySelector('[data-db-site-new-form]').dispatchEvent(new Event('submit', { bubbles: true }));
      await waitFor(20);
      expect(readIndexSites().length).toBe(3);
      expect(getSiteMetaRecord(editor).seo.siteName).toBe('Third site');
    });

    test('card actions rename, delete behind a confirmation and open another site', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      const secondRecord = await editor.runCommand('db:create-site', { name: 'Second site' });
      editor.runCommand('db:open-site-manager');
      await waitFor(5);
      const modalContent = editor.Modal.getContentEl();
      const firstCard = modalContent.querySelector('[data-db-site-id="' + firstRecord.id + '"]');
      firstCard.querySelector('[data-db-site-action="rename"]').click();
      expect(firstCard.querySelector('[data-db-site-row="rename"]').hidden).toBe(false);
      firstCard.querySelector('[data-db-site-rename-input]').value = 'Studio Lane';
      firstCard.querySelector('[data-db-site-action="confirm-rename"]').click();
      await waitFor(20);
      expect(readIndexSites().find((siteRecord) => siteRecord.id === firstRecord.id).name).toBe('Studio Lane');
      const secondCard = editor.Modal.getContentEl().querySelector('[data-db-site-id="' + secondRecord.id + '"]');
      secondCard.querySelector('[data-db-site-action="delete"]').click();
      expect(secondCard.querySelector('[data-db-site-row="delete"]').hidden).toBe(false);
      secondCard.querySelector('[data-db-site-action="confirm-delete"]').click();
      await waitFor(20);
      expect(readIndexSites().length).toBe(1);
      expect(getStorageKey()).toBe(firstRecord.storageKey);
    });

    test('duplicating a site copies its pages into a new record', async () => {
      await initEditor();
      const firstRecord = readIndexSites()[0];
      editor.Pages.add({ name: 'Gallery', component: '<div>gallery</div>' }, { select: false });
      editor.runCommand('db:open-site-manager');
      await waitFor(5);
      const modalContent = editor.Modal.getContentEl();
      modalContent
        .querySelector('[data-db-site-id="' + firstRecord.id + '"] [data-db-site-action="duplicate"]')
        .click();
      await waitFor(20);
      const copyRecord = readIndexSites().find((siteRecord) => siteRecord.id !== firstRecord.id);
      expect(copyRecord.name).toBe('My first site copy');
      const copiedSnapshot = JSON.parse(localStorage.getItem(copyRecord.storageKey));
      expect(copiedSnapshot.projectData.pages.map((pageRecord) => pageRecord.name)).toContain('Gallery');
      expect(getStorageKey()).toBe(firstRecord.storageKey);
    });

    test('opens the manager on start unless the host turns it off', async () => {
      await initEditor({ openOnStart: true });
      expect(editor.Modal.isOpen()).toBe(true);
      expect(editor.Modal.getContentEl().textContent).toContain('Start a new site');
    });

    test('a host adapter replaces local storage completely', async () => {
      const hostRecord = buildSiteRecord({ id: 'cloud-1', name: 'Cloud site' });
      const hostState = { sites: [hostRecord], snapshots: {}, user: { id: 'u1', lastSiteId: 'cloud-1' } };
      const hostAdapter = {
        listSites: () => Promise.resolve(hostState.sites),
        readSite: (siteId) =>
          Promise.resolve({
            record: hostState.sites.find((siteRecord) => siteRecord.id === siteId),
            snapshot: hostState.snapshots[siteId] || null,
          }),
        writeSite: (siteRecord, projectSnapshot) => {
          hostState.sites = hostState.sites
            .filter((storedRecord) => storedRecord.id !== siteRecord.id)
            .concat([siteRecord]);
          if (projectSnapshot) hostState.snapshots[siteRecord.id] = projectSnapshot;
          return Promise.resolve(true);
        },
        deleteSite: (siteId) => {
          hostState.sites = hostState.sites.filter((storedRecord) => storedRecord.id !== siteId);
          return Promise.resolve(true);
        },
        readUser: () => Promise.resolve(hostState.user),
        writeUser: (ownerRecord) => {
          hostState.user = ownerRecord;
          return Promise.resolve(true);
        },
      };
      await initEditor({ storageAdapter: hostAdapter, user: { id: 'u1', name: 'Ada', email: 'ada@example.com' } });
      expect(getStorageKey()).toBe(hostRecord.storageKey);
      expect(localStorage.getItem(siteIndexKey)).toBeFalsy();
      await editor.runCommand('db:create-site', { name: 'Cloud two' });
      expect(hostState.sites.length).toBe(2);
      expect(hostState.user).toEqual({
        id: 'u1',
        name: 'Ada',
        email: 'ada@example.com',
        lastSiteId: hostState.sites[1].id,
      });
    });
  });
});
