import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import beginSymbolEditing from '../../../src/dynamic-builder/symbols/beginSymbolEditing';
import buildCodeFieldMarkup from '../../../src/dynamic-builder/codeEditor/buildCodeFieldMarkup';
import buildElementFromMarkup from '../../../src/dynamic-builder/support/buildElementFromMarkup';
import buildPageDocumentMarkup from '../../../src/dynamic-builder/exporter/buildPageDocumentMarkup';
import createSymbolFromComponent from '../../../src/dynamic-builder/symbols/createSymbolFromComponent';
import finishSymbolEditing from '../../../src/dynamic-builder/symbols/finishSymbolEditing';
import insertSymbolInstance from '../../../src/dynamic-builder/symbols/insertSymbolInstance';
import insertSymbolOnEveryPage from '../../../src/dynamic-builder/symbols/insertSymbolOnEveryPage';
import listSymbolInstances from '../../../src/dynamic-builder/symbols/listSymbolInstances';
import listSymbolRecords from '../../../src/dynamic-builder/symbols/listSymbolRecords';
import renderAllSymbolInstances from '../../../src/dynamic-builder/symbols/renderAllSymbolInstances';
import mountCodeField from '../../../src/dynamic-builder/codeEditor/mountCodeField';
import readComponentFlows from '../../../src/dynamic-builder/interactions/readComponentFlows';
import resolveBlockPreviewMarkup from '../../../src/dynamic-builder/blockPreviews/resolveBlockPreviewMarkup';
import saveSymbolRecord from '../../../src/dynamic-builder/symbols/saveSymbolRecord';
import updateSiteMetaRecord from '../../../src/dynamic-builder/support/updateSiteMetaRecord';
import writeComponentFlows from '../../../src/dynamic-builder/interactions/writeComponentFlows';

describe('Dynamic builder interactivity', () => {
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

  describe('reusable components', () => {
    test('a navbar becomes a symbol that renders on another page', () => {
      const navComponent = editor.getWrapper().append({ type: 'db-navbar' })[0];
      const symbolRecord = createSymbolFromComponent(editor, navComponent, 'Main navigation');
      expect(symbolRecord.name).toBe('Main navigation');
      expect(listSymbolRecords(editor).length).toBe(1);
      const secondPage = editor.Pages.add({ name: 'Second' });
      const instanceComponent = insertSymbolInstance(editor, symbolRecord.id, secondPage);
      expect(instanceComponent.get('type')).toBe('db-symbol');
      expect(instanceComponent.components().length).toBeGreaterThan(0);
      expect(listSymbolInstances(editor, symbolRecord.id).length).toBe(1);
    });

    test('editing one instance pushes the change to every other instance', () => {
      const symbolRecord = saveSymbolRecord(editor, {
        id: 'sym-footer',
        name: 'Footer',
        components: [{ tagName: 'p', type: 'text', components: 'original text' }],
      });
      const firstInstance = insertSymbolInstance(editor, symbolRecord.id);
      const secondInstance = insertSymbolInstance(editor, symbolRecord.id);
      beginSymbolEditing(editor, firstInstance);
      firstInstance.components().at(0).components('changed text');
      finishSymbolEditing(editor, firstInstance);
      expect(JSON.stringify(secondInstance.toJSON())).toContain('changed text');
    });

    test('instance children are locked until the symbol is opened for editing', () => {
      const symbolRecord = saveSymbolRecord(editor, {
        id: 'sym-locked',
        name: 'Header',
        components: [{ tagName: 'p', type: 'text', components: 'hello' }],
      });
      const instanceComponent = insertSymbolInstance(editor, symbolRecord.id);
      const childComponent = instanceComponent.components().at(0);
      expect(childComponent.get('selectable')).toBe(false);
      expect(childComponent.get('removable')).toBe(false);
      beginSymbolEditing(editor, instanceComponent);
      expect(instanceComponent.components().at(0).get('selectable')).toBe(true);
    });

    test('id-scoped styles are promoted to a class so they travel with the symbol', () => {
      const navComponent = editor.getWrapper().append({ type: 'db-navbar' })[0];
      navComponent.addStyle({ color: 'rgb(1, 2, 3)' });
      const symbolRecord = createSymbolFromComponent(editor, navComponent, 'Styled nav');
      navComponent.remove();
      const instanceComponent = insertSymbolInstance(editor, symbolRecord.id);
      const classNames = instanceComponent.components().at(0).getClasses();
      expect(classNames.some((className) => String(className).indexOf('db-sym-') === 0)).toBe(true);
      const promotedRule = editor.Css.getRules().find(
        (styleRule) => String(styleRule.selectorsToString()).indexOf('.db-sym-') === 0,
      );
      expect(promotedRule.getStyle().color).toBe('rgb(1, 2, 3)');
    });

    test('adding to every page skips pages that already have the symbol', () => {
      const symbolRecord = saveSymbolRecord(editor, { id: 'sym-nav', name: 'Nav', components: [] });
      editor.Pages.add({ name: 'Second' });
      editor.Pages.add({ name: 'Third' });
      expect(insertSymbolOnEveryPage(editor, symbolRecord.id)).toBe(3);
      expect(insertSymbolOnEveryPage(editor, symbolRecord.id)).toBe(0);
    });

    test('a symbol placed inside itself renders a notice instead of recursing', () => {
      const symbolRecord = saveSymbolRecord(editor, {
        id: 'sym-self',
        name: 'Self',
        components: [
          { tagName: 'div', type: 'db-symbol', attributes: { 'data-db-type': 'symbol', 'data-db-symbol': 'sym-self' } },
        ],
      });
      const instanceComponent = insertSymbolInstance(editor, symbolRecord.id);
      const nestedInstance = instanceComponent.components().at(0);
      expect(nestedInstance.get('type')).toBe('db-symbol');
      expect(nestedInstance.getInnerHTML()).toContain('cannot contain itself');
    });

    test('a nested symbol is stored as a reference, not a frozen copy', () => {
      const navRecord = saveSymbolRecord(editor, {
        id: 'sym-inner-nav',
        name: 'Inner nav',
        components: [{ tagName: 'p', type: 'text', components: 'nav v1' }],
      });
      const sectionComponent = editor.getWrapper().append({ type: 'db-section' })[0];
      const containerComponent = sectionComponent.components().at(0);
      const navInstance = insertSymbolInstance(editor, navRecord.id);
      containerComponent.append(navInstance.toJSON());
      navInstance.remove();
      const outerRecord = createSymbolFromComponent(editor, sectionComponent, 'Outer');
      const storedText = JSON.stringify(outerRecord.components);
      expect(storedText).toContain('sym-inner-nav');
      expect(storedText).not.toContain('nav v1');
    });

    test('selecting another page leaves an instance that is being edited alone', () => {
      const symbolRecord = saveSymbolRecord(editor, {
        id: 'sym-editing',
        name: 'Editing',
        components: [{ tagName: 'p', type: 'text', components: 'stored copy' }],
      });
      const instanceComponent = insertSymbolInstance(editor, symbolRecord.id);
      beginSymbolEditing(editor, instanceComponent);
      instanceComponent.components().at(0).components('unsaved edit');
      renderAllSymbolInstances(editor, symbolRecord.id);
      expect(instanceComponent.getInnerHTML()).toContain('unsaved edit');
    });

    test('symbols travel inside project data', () => {
      saveSymbolRecord(editor, { id: 'sym-travel', name: 'Header', components: [] });
      const projectData = editor.getProjectData();
      expect(projectData.dbSiteMeta.symbols['sym-travel'].name).toBe('Header');
      editor.loadProjectData(projectData);
      expect(listSymbolRecords(editor).length).toBe(1);
    });
  });

  describe('block previews', () => {
    test('every block carries an illustration and keeps its hint in the tooltip', () => {
      const allBlocks = editor.BlockManager.getAll();
      const withoutPreview = allBlocks.filter(
        (blockModel) => String(blockModel.get('media') || '').indexOf('gjs-db-block-preview') < 0,
      );
      expect(withoutPreview.map((blockModel) => blockModel.get('id') || blockModel.id)).toEqual([]);
      const labelsWithMarkup = allBlocks.filter(
        (blockModel) => String(blockModel.get('label') || '').indexOf('<') >= 0,
      );
      expect(labelsWithMarkup.map((blockModel) => blockModel.get('id') || blockModel.id)).toEqual([]);
      const hintedBlocks = allBlocks.filter((blockModel) => (blockModel.get('attributes') || {}).title);
      expect(hintedBlocks.length).toBeGreaterThan(20);
    });

    test('previews fall back by category and stay valid svg', () => {
      expect(resolveBlockPreviewMarkup('db-hero-centered', 'Marketing')).toContain('viewBox="0 0 96 60"');
      expect(resolveBlockPreviewMarkup('not-a-block', 'layout')).toContain('<svg');
      expect(resolveBlockPreviewMarkup('not-a-block', 'Not a category')).toBe('');
    });
  });

  describe('animate on scroll', () => {
    test('the runtime only ships once something animates', () => {
      const selectedPage = editor.Pages.getSelected();
      expect(buildPageDocumentMarkup(editor, selectedPage, {})).not.toContain('IntersectionObserver');
      const textComponent = editor.getWrapper().append({ type: 'db-text' })[0];
      textComponent.addAttributes({ 'data-db-aos': 'fade-up' });
      const animatedMarkup = buildPageDocumentMarkup(editor, selectedPage, {});
      expect(animatedMarkup).toContain('IntersectionObserver');
      expect(animatedMarkup).toContain('data-db-aos-in');
      expect(animatedMarkup).toContain('prefers-reduced-motion');
    });

    test('motion and interaction traits reach any selected component', () => {
      const textComponent = editor.getWrapper().append({ type: 'db-text' })[0];
      editor.select(textComponent);
      const traitNames = textComponent.get('traits').map((traitModel) => traitModel.get('name'));
      expect(traitNames).toContain('data-db-aos');
      expect(traitNames).toContain('data-db-aos-duration');
      expect(traitNames).toContain('data-db-flows');
    });
  });

  describe('interaction flows', () => {
    test('turning SweetAlert2 off still ships the built-in dialog', () => {
      editor.destroy();
      document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
      editor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [
          fixJsDom,
          (pluginEditor) => grapesjs.dynamicBuilder(pluginEditor, { interactions: { sweetAlert: { enabled: false } } }),
        ],
      });
      fixJsDomIframe(editor.getModel().shallow);
      editor.getWrapper().append({ type: 'db-alert-button' });
      const documentMarkup = buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {});
      expect(documentMarkup).toContain('dbShowDialog');
      expect(documentMarkup).toContain('buildFallbackDialog');
      expect(documentMarkup).toContain('"enabled":false');
    });

    test('the dialog button ships a click flow and the dialog runtime', () => {
      const buttonComponent = editor.getWrapper().append({ type: 'db-alert-button' })[0];
      const flowRecords = readComponentFlows(buttonComponent);
      expect(flowRecords.length).toBe(1);
      expect(flowRecords[0].trigger).toBe('click');
      expect(flowRecords[0].actions[0].type).toBe('alert');
      const documentMarkup = buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {});
      expect(documentMarkup).toContain('dbShowDialog');
      expect(documentMarkup).toContain('data-db-flows');
    });

    test('changing the dialog traits rewrites the flow', () => {
      const buttonComponent = editor.getWrapper().append({ type: 'db-alert-button' })[0];
      buttonComponent.addAttributes({
        'data-db-alert-title': 'All set',
        'data-db-alert-then': 'open-url',
        'data-db-alert-url': '/thank-you',
      });
      const flowRecords = readComponentFlows(buttonComponent);
      expect(flowRecords[0].actions[0].options.title).toBe('All set');
      expect(flowRecords[0].actions[1]).toEqual({
        type: 'open-url',
        options: { url: '/thank-you', newTab: 'false' },
      });
    });

    test('custom JavaScript steps stay inert until scripts are allowed', () => {
      const buttonComponent = editor.getWrapper().append({ type: 'db-button' })[0];
      writeComponentFlows(buttonComponent, [
        {
          id: 'flow-probe',
          trigger: 'click',
          triggerOptions: {},
          actions: [{ type: 'custom-js', options: { code: 'window.probe = 1' } }],
        },
      ]);
      const selectedPage = editor.Pages.getSelected();
      expect(buildPageDocumentMarkup(editor, selectedPage, {})).toContain('var allowCustomJs = false');
      updateSiteMetaRecord(editor, { customCode: { allowScripts: true } });
      expect(buildPageDocumentMarkup(editor, selectedPage, {})).toContain('var allowCustomJs = true');
    });

    test('flows round-trip through the component attribute', () => {
      const buttonComponent = editor.getWrapper().append({ type: 'db-button' })[0];
      writeComponentFlows(buttonComponent, [
        {
          id: 'flow-round',
          trigger: 'hover',
          triggerOptions: {},
          actions: [{ type: 'toggle-class', options: { target: '#panel', className: 'is-open' } }],
        },
      ]);
      const flowRecords = readComponentFlows(buttonComponent);
      expect(flowRecords[0].trigger).toBe('hover');
      expect(flowRecords[0].actions[0].options.className).toBe('is-open');
      writeComponentFlows(buttonComponent, []);
      expect(buttonComponent.getAttributes()['data-db-flows']).toBeUndefined();
    });
  });

  describe('code editing', () => {
    test('a code field mounts, validates and offers snippets', () => {
      const fieldElement = buildElementFromMarkup(
        document,
        buildCodeFieldMarkup({ name: 'probe', label: 'CSS', language: 'css' }),
      );
      document.body.appendChild(fieldElement);
      const codeSurface = mountCodeField(editor, fieldElement, { language: 'css', value: '.a { color: red; }' });
      expect(codeSurface.getValue()).toContain('color: red');
      expect(fieldElement.getAttribute('data-db-code-valid')).toBe('true');
      codeSurface.setValue('.a { color: red;');
      codeSurface.insertAtCursor('\n');
      expect(fieldElement.getAttribute('data-db-code-valid')).toBe('false');
      expect(fieldElement.querySelector('[data-db-code-status]').textContent).toContain('never closed');
      expect(fieldElement.querySelectorAll('[data-db-code-snippets] option').length).toBeGreaterThan(1);
    });

    test('the custom code components use the full code editor trait', () => {
      ['db-custom-html', 'db-custom-css', 'db-custom-script'].forEach((typeName) => {
        const component = editor.getWrapper().append({ type: typeName })[0];
        const codeTraits = component.get('traits').filter((traitModel) => traitModel.get('type') === 'db-code');
        expect(codeTraits.length).toBe(1);
      });
    });
  });
});
