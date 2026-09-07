import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyTemplateManager from '../../../src/dynamic-builder/templateManager/applyTemplateManager';
import applyTemplateToCurrentPage from '../../../src/dynamic-builder/templateManager/applyTemplateToCurrentPage';
import buildUserTemplateRecord from '../../../src/dynamic-builder/templateManager/buildUserTemplateRecord';
import createLocalTemplateStore from '../../../src/dynamic-builder/templateManager/createLocalTemplateStore';
import filterTemplateRecords from '../../../src/dynamic-builder/templateManager/filterTemplateRecords';
import getBuiltInPageTemplates from '../../../src/dynamic-builder/templateManager/getBuiltInPageTemplates';
import getBuiltInSectionTemplates from '../../../src/dynamic-builder/templateManager/getBuiltInSectionTemplates';
import getTemplateCategoryRecords from '../../../src/dynamic-builder/templateManager/getTemplateCategoryRecords';
import getUserTemplateStorageKey from '../../../src/dynamic-builder/templateManager/getUserTemplateStorageKey';
import insertSectionTemplate from '../../../src/dynamic-builder/templateManager/insertSectionTemplate';
import normalizeUserTemplateRecord from '../../../src/dynamic-builder/templateManager/normalizeUserTemplateRecord';
import openTemplateManagerModal from '../../../src/dynamic-builder/templateManager/openTemplateManagerModal';
import resolveTemplateStore from '../../../src/dynamic-builder/templateManager/resolveTemplateStore';
import saveComponentsAsTemplate from '../../../src/dynamic-builder/templateManager/saveComponentsAsTemplate';
import serializeTemplateContent from '../../../src/dynamic-builder/templateManager/serializeTemplateContent';

const countMatches = (haystack, needle) => haystack.split(needle).length - 1;

const flattenTemplateRecords = (contentRecords) =>
  (Array.isArray(contentRecords) ? contentRecords : [contentRecords]).reduce(
    (allRecords, contentRecord) =>
      contentRecord && typeof contentRecord === 'object'
        ? [...allRecords, contentRecord, ...flattenTemplateRecords(contentRecord.components || [])]
        : allRecords,
    [],
  );

describe('Dynamic builder template manager', () => {
  let editor;

  beforeEach(() => {
    window.localStorage.removeItem(getUserTemplateStorageKey());
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    applyTemplateManager(editor, {});
  });

  afterEach(() => {
    editor.destroy();
    window.localStorage.removeItem(getUserTemplateStorageKey());
  });

  const renderTemplateHtml = (templateRecord) => {
    editor.getWrapper().components(JSON.parse(JSON.stringify(templateRecord.content)));
    return editor.getWrapper().toHTML();
  };

  describe('built-in template records', () => {
    test('ships enough polished page and section templates', () => {
      expect(getBuiltInPageTemplates().length).toBeGreaterThanOrEqual(8);
      expect(getBuiltInSectionTemplates().length).toBeGreaterThanOrEqual(6);
    });

    test('every record is well formed and uses a known category', () => {
      const categoryRecords = getTemplateCategoryRecords();
      [...getBuiltInPageTemplates(), ...getBuiltInSectionTemplates()].forEach((templateRecord) => {
        expect(typeof templateRecord.templateId).toBe('string');
        expect(templateRecord.name.length).toBeGreaterThan(2);
        expect(templateRecord.description.length).toBeGreaterThan(10);
        expect(templateRecord.source).toBe('builtIn');
        expect(['page', 'section']).toContain(templateRecord.kind);
        expect(Array.isArray(templateRecord.content)).toBe(true);
        expect(templateRecord.content.length).toBeGreaterThan(0);
        expect(categoryRecords[templateRecord.categoryId]).toBeTruthy();
      });
    });

    test('template ids are unique across pages and sections', () => {
      const templateIds = [...getBuiltInPageTemplates(), ...getBuiltInSectionTemplates()].map(
        (templateRecord) => templateRecord.templateId,
      );
      expect(new Set(templateIds).size).toBe(templateIds.length);
    });

    test('text leaves carry the placeholder marker so owners know what to rewrite', () => {
      getBuiltInPageTemplates().forEach((templateRecord) => {
        const textLeaves = flattenTemplateRecords(templateRecord.content).filter(
          (contentRecord) =>
            ['db-text', 'db-heading'].indexOf(String(contentRecord.type || '')) >= 0 &&
            typeof contentRecord.components === 'string',
        );
        const unmarkedLeaves = textLeaves.filter(
          (contentRecord) => !contentRecord.attributes || contentRecord.attributes['data-db-placeholder'] !== 'true',
        );
        expect(unmarkedLeaves).toEqual([]);
      });
    });

    test('no template hard-codes a colour instead of using a design token', () => {
      const templateJson = JSON.stringify([...getBuiltInPageTemplates(), ...getBuiltInSectionTemplates()]);
      expect(templateJson).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(templateJson).not.toMatch(/rgba?\(/);
      expect(templateJson).not.toContain('"style"');
    });
  });

  describe('rendered page templates', () => {
    test('every page template renders exactly one H1', () => {
      const offenders = getBuiltInPageTemplates()
        .map((templateRecord) => ({
          name: templateRecord.name,
          headingCount: countMatches(renderTemplateHtml(templateRecord), '<h1'),
        }))
        .filter((countRecord) => countRecord.headingCount !== 1);
      expect(offenders).toEqual([]);
    });

    test('page templates open with a navigation bar pointing at pages or anchors', () => {
      getBuiltInPageTemplates()
        .filter((templateRecord) => templateRecord.content[0].type === 'db-navbar')
        .forEach((templateRecord) => {
          const templateDocument = new DOMParser().parseFromString(renderTemplateHtml(templateRecord), 'text/html');
          const linkHrefs = [...templateDocument.querySelectorAll('.db-navbar-link, .db-navbar-cta')].map(
            (linkElement) => linkElement.getAttribute('href'),
          );
          expect(linkHrefs.length).toBeGreaterThan(0);
          linkHrefs.forEach((linkHref) => expect(linkHref).toMatch(/^(#|[a-z0-9-]+\.html)/));
        });
    });

    test('template buttons use the shared button class', () => {
      const templateHtml = renderTemplateHtml(
        getBuiltInPageTemplates().find((templateRecord) => templateRecord.templateId === 'db-page-agency'),
      );
      expect(templateHtml).toContain('class="db-button"');
      expect(templateHtml).toContain('href="#contact"');
    });
  });

  describe('applying templates', () => {
    test('using a page template on an empty page replaces the content', () => {
      const templateRecord = getBuiltInPageTemplates().find(
        (candidateRecord) => candidateRecord.templateId === 'db-page-restaurant',
      );
      applyTemplateToCurrentPage(editor, templateRecord);
      const rootComponents = editor.getWrapper().components();
      expect(rootComponents.length).toBe(templateRecord.content.length);
      expect(rootComponents.at(0).get('type')).toBe('db-navbar');
      expect(countMatches(editor.getWrapper().toHTML(), '<h1')).toBe(1);
    });

    test('a second page template asks before replacing what is already there', () => {
      const pageTemplates = getBuiltInPageTemplates();
      applyTemplateToCurrentPage(editor, pageTemplates[0]);
      const beforeCount = editor.getWrapper().components().length;
      applyTemplateToCurrentPage(editor, pageTemplates[1]);
      expect(editor.getWrapper().components().length).toBe(beforeCount);
      expect(editor.Modal.isOpen()).toBe(true);
    });

    test('section templates insert at the end and after the selection', () => {
      const sectionRecord = getBuiltInSectionTemplates().find(
        (candidateRecord) => candidateRecord.templateId === 'db-section-faq',
      );
      applyTemplateToCurrentPage(
        editor,
        getBuiltInPageTemplates().find((candidateRecord) => candidateRecord.templateId === 'db-page-agency'),
      );
      const startCount = editor.getWrapper().components().length;
      insertSectionTemplate(editor, sectionRecord, 'end');
      expect(editor.getWrapper().components().length).toBe(startCount + 1);
      expect(editor.getWrapper().components().at(startCount).get('type')).toBe('db-section');
      editor.select(editor.getWrapper().components().at(0));
      insertSectionTemplate(editor, sectionRecord, 'after');
      expect(editor.getWrapper().components().at(1).get('type')).toBe('db-section');
    });
  });

  describe('user templates', () => {
    test('the local store writes, lists and deletes through a promise API', async () => {
      const templateStore = createLocalTemplateStore();
      expect(await templateStore.listTemplates()).toEqual([]);
      const templateRecord = buildUserTemplateRecord(
        { nameText: 'My hero', descriptionText: 'The one we always use', categoryId: 'hero' },
        'section',
        [{ type: 'db-section', components: [] }],
      );
      const savedRecord = await templateStore.writeTemplate(templateRecord);
      expect(savedRecord.templateId).toBe(templateRecord.templateId);
      const storedRecords = await templateStore.listTemplates();
      expect(storedRecords.length).toBe(1);
      expect(storedRecords[0].name).toBe('My hero');
      expect(storedRecords[0].source).toBe('user');
      await templateStore.deleteTemplate(templateRecord.templateId);
      expect(await templateStore.listTemplates()).toEqual([]);
    });

    test('records without a name or content are rejected', async () => {
      expect(normalizeUserTemplateRecord({ name: '', content: [{}] })).toBeNull();
      expect(normalizeUserTemplateRecord({ templateId: 'a', name: 'Nice', content: [] })).toBeNull();
      await expect(createLocalTemplateStore().writeTemplate({ name: '' })).rejects.toThrow();
    });

    test('a host can swap in its own cloud adapter', () => {
      const cloudStore = { listTemplates: () => null, writeTemplate: () => null, deleteTemplate: () => null };
      expect(resolveTemplateStore({ store: cloudStore })).toBe(cloudStore);
      expect(resolveTemplateStore({})).not.toBe(cloudStore);
    });

    test('saving the selected section stores a reusable template', async () => {
      applyTemplateToCurrentPage(
        editor,
        getBuiltInPageTemplates().find((candidateRecord) => candidateRecord.templateId === 'db-page-agency'),
      );
      const sectionComponent = editor
        .getWrapper()
        .components()
        .filter((component) => component.get('type') === 'db-section')[0];
      const contentRecords = serializeTemplateContent([sectionComponent]);
      expect(contentRecords.length).toBe(1);
      expect(contentRecords[0].attributes.id).toBeUndefined();
      const formElement = document.createElement('div');
      formElement.innerHTML =
        '<input data-db-template-name value="Services band" /><textarea data-db-template-description>Reuse me</textarea>' +
        '<select data-db-template-category-field><option value="features" selected>Features</option></select>';
      await saveComponentsAsTemplate(editor, {}, formElement, 'section', [sectionComponent]);
      const storedRecords = await createLocalTemplateStore().listTemplates();
      expect(storedRecords.length).toBe(1);
      expect(storedRecords[0].name).toBe('Services band');
      expect(storedRecords[0].kind).toBe('section');
      expect(storedRecords[0].content.length).toBe(1);
    });

    test('a saved template can be inserted again after a reload of the store', async () => {
      const templateStore = createLocalTemplateStore();
      await templateStore.writeTemplate(
        buildUserTemplateRecord({ nameText: 'Saved band', descriptionText: '', categoryId: 'features' }, 'section', [
          { type: 'db-section', components: [{ type: 'db-container', components: [] }] },
        ]),
      );
      const reloadedRecords = await createLocalTemplateStore().listTemplates();
      insertSectionTemplate(editor, reloadedRecords[0], 'end');
      expect(editor.getWrapper().components().length).toBe(1);
      expect(editor.getWrapper().components().at(0).get('type')).toBe('db-section');
    });
  });

  describe('the manager modal', () => {
    test('registers the documented command ids', () => {
      [
        'db:open-template-manager',
        'db:save-page-as-template',
        'db:save-selection-as-template',
        'db:delete-template',
      ].forEach((commandId) => expect(editor.Commands.has(commandId)).toBe(true));
    });

    test('opens with page cards, tabs and a working search', () => {
      const managerElement = openTemplateManagerModal(editor, {});
      expect(managerElement).toBeTruthy();
      expect(managerElement.querySelectorAll('[data-db-template-tab]').length).toBe(3);
      const pageCardCount = managerElement.querySelectorAll('[data-db-template-card]').length;
      expect(pageCardCount).toBe(getBuiltInPageTemplates().length);
      const searchElement = managerElement.querySelector('[data-db-template-search]');
      searchElement.value = 'restaurant';
      searchElement.dispatchEvent(new Event('input'));
      expect(managerElement.querySelectorAll('[data-db-template-card]').length).toBe(1);
      searchElement.value = '';
      searchElement.dispatchEvent(new Event('input'));
      managerElement.querySelector('[data-db-template-tab="sections"]').dispatchEvent(new Event('click'));
      expect(managerElement.querySelectorAll('[data-db-template-card]').length).toBe(
        getBuiltInSectionTemplates().length,
      );
    });

    test('page cards offer both page actions and section cards offer both insert actions', () => {
      const managerElement = openTemplateManagerModal(editor, {});
      const pageActions = [...managerElement.querySelectorAll('[data-db-template-action]')].map((actionButton) =>
        actionButton.getAttribute('data-db-template-action'),
      );
      expect(pageActions).toContain('use-page');
      expect(pageActions).toContain('add-page');
      managerElement.querySelector('[data-db-template-tab="sections"]').dispatchEvent(new Event('click'));
      const sectionActions = [...managerElement.querySelectorAll('[data-db-template-action]')].map((actionButton) =>
        actionButton.getAttribute('data-db-template-action'),
      );
      expect(sectionActions).toContain('insert-after');
      expect(sectionActions).toContain('insert-end');
    });

    test('filters by category as well as by words', () => {
      const heroRecords = filterTemplateRecords(getBuiltInSectionTemplates(), '', 'hero');
      expect(heroRecords.length).toBeGreaterThanOrEqual(3);
      heroRecords.forEach((templateRecord) => expect(templateRecord.categoryId).toBe('hero'));
      expect(filterTemplateRecords(getBuiltInPageTemplates(), 'pricing plans', 'all').length).toBe(1);
    });
  });
});
