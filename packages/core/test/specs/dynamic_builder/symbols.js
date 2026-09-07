import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applySymbolToolbar from '../../../src/dynamic-builder/symbols/applySymbolToolbar';
import beginSymbolEditing from '../../../src/dynamic-builder/symbols/beginSymbolEditing';
import finishSymbolEditing from '../../../src/dynamic-builder/symbols/finishSymbolEditing';
import getSymbolOverrides from '../../../src/dynamic-builder/symbols/getSymbolOverrides';
import getSymbolRecord from '../../../src/dynamic-builder/symbols/getSymbolRecord';
import handleSymbolDeleteAction from '../../../src/dynamic-builder/symbols/handleSymbolDeleteAction';
import handleSymbolInsertAction from '../../../src/dynamic-builder/symbols/handleSymbolInsertAction';
import handleSymbolRenameAction from '../../../src/dynamic-builder/symbols/handleSymbolRenameAction';
import insertSymbolInstance from '../../../src/dynamic-builder/symbols/insertSymbolInstance';
import insertSymbolOnEveryPage from '../../../src/dynamic-builder/symbols/insertSymbolOnEveryPage';
import isEditorOnlyComponentUpdate from '../../../src/dynamic-builder/symbols/isEditorOnlyComponentUpdate';
import isSymbolInstanceEditing from '../../../src/dynamic-builder/symbols/isSymbolInstanceEditing';
import listSymbolInstances from '../../../src/dynamic-builder/symbols/listSymbolInstances';
import listSymbolRecords from '../../../src/dynamic-builder/symbols/listSymbolRecords';
import renameSymbolInstances from '../../../src/dynamic-builder/symbols/renameSymbolInstances';
import resolveSymbolInsertPlacement from '../../../src/dynamic-builder/symbols/resolveSymbolInsertPlacement';
import saveSymbolRecord from '../../../src/dynamic-builder/symbols/saveSymbolRecord';
import serializeComponentDefinition from '../../../src/dynamic-builder/symbols/serializeComponentDefinition';

const waitFor = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));

const textLeaf = (contentText) => ({ tagName: 'p', type: 'text', components: contentText });

const createCanvasEditor = () => {
  document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
  const editor = grapesjs.init({
    container: '#db-editor',
    storageManager: { autoload: false, autosave: false, type: '' },
    plugins: [fixJsDom, grapesjs.dynamicBuilder],
  });
  fixJsDomIframe(editor.getModel().shallow);
  return editor;
};

const createHeadlessEditor = () =>
  grapesjs.init({ headless: true, storageManager: false, plugins: [grapesjs.dynamicBuilder] });

describe('Dynamic builder reusable components', () => {
  let editor;

  beforeEach(() => {
    editor = createCanvasEditor();
  });

  afterEach(() => {
    editor.destroy();
  });

  describe('persistence', () => {
    test('instances survive a project round trip into a fresh editor', () => {
      saveSymbolRecord(editor, { id: 'sym-nav', name: 'Navbar', components: [textLeaf('Nav text')] });
      insertSymbolInstance(editor, 'sym-nav');
      const projectData = JSON.parse(JSON.stringify(editor.getProjectData()));
      const reloadedEditor = createHeadlessEditor();
      reloadedEditor.loadProjectData(projectData);
      const instanceComponent = listSymbolInstances(reloadedEditor, 'sym-nav')[0];
      expect(instanceComponent.getInnerHTML()).toContain('Nav text');
      expect(instanceComponent.getInnerHTML()).not.toContain('Pick a reusable component');
      expect(instanceComponent.components().at(0).get('selectable')).toBe(true);
      expect(instanceComponent.components().at(0).get('removable')).toBe(false);
      reloadedEditor.destroy();
    });

    test('the editing state never reaches project data or html', () => {
      saveSymbolRecord(editor, { id: 'sym-edit', name: 'Header', components: [textLeaf('hello')] });
      const instanceComponent = insertSymbolInstance(editor, 'sym-edit');
      beginSymbolEditing(editor, instanceComponent);
      expect(isSymbolInstanceEditing(instanceComponent)).toBe(true);
      expect(JSON.stringify(editor.getProjectData())).not.toContain('data-db-symbol-editing');
      expect(editor.getHtml()).not.toContain('data-db-symbol-editing');
    });

    test('repeater preview cards are not captured into the master', () => {
      const definition = serializeComponentDefinition({
        toJSON: () => ({
          type: 'db-repeater',
          components: [
            { attributes: { 'data-db-repeater-item': 'true' }, content: 'template' },
            { attributes: { 'data-db-repeater-preview': 'true' }, content: 'preview' },
          ],
        }),
      });
      expect(definition.components.length).toBe(1);
      expect(JSON.stringify(definition)).not.toContain('preview');
    });
  });

  describe('placement', () => {
    test('a footer joins every page at the bottom and a navbar at the top', () => {
      const wrapper = editor.getWrapper();
      wrapper.append({ type: 'db-section' });
      saveSymbolRecord(editor, { id: 'sym-footer', name: 'Footer', components: [{ type: 'db-footer' }] });
      saveSymbolRecord(editor, { id: 'sym-nav', name: 'Navbar', components: [{ type: 'db-navbar' }] });
      insertSymbolInstance(editor, 'sym-footer', null, { placement: 'bottom' });
      insertSymbolInstance(editor, 'sym-nav', null, { placement: 'top' });
      const secondPage = editor.Pages.add({ name: 'About' });
      secondPage.getMainComponent().append({ type: 'db-section' });
      expect(resolveSymbolInsertPlacement(editor, getSymbolRecord(editor, 'sym-footer'))).toBe('bottom');
      expect(resolveSymbolInsertPlacement(editor, getSymbolRecord(editor, 'sym-nav'))).toBe('top');
      insertSymbolOnEveryPage(editor, 'sym-footer');
      insertSymbolOnEveryPage(editor, 'sym-nav');
      const secondPageTypes = secondPage
        .getMainComponent()
        .components()
        .map((child) => child.getName());
      expect(secondPageTypes[0]).toBe('Reusable: Navbar');
      expect(secondPageTypes[secondPageTypes.length - 1]).toBe('Reusable: Footer');
    });

    test('placement falls back to the symbol name when no copy exists yet', () => {
      expect(resolveSymbolInsertPlacement(editor, { id: 'x', name: 'Site footer', components: [] })).toBe('bottom');
      expect(resolveSymbolInsertPlacement(editor, { id: 'y', name: 'Main menu', components: [] })).toBe('top');
    });

    test('adding here lands right below the selected block and selects the copy', () => {
      const wrapper = editor.getWrapper();
      const firstSection = wrapper.append({ type: 'db-section' })[0];
      wrapper.append({ type: 'db-section' });
      saveSymbolRecord(editor, { id: 'sym-cta', name: 'Call to action', components: [textLeaf('cta')] });
      editor.select(firstSection);
      handleSymbolInsertAction(editor, getSymbolRecord(editor, 'sym-cta'));
      expect(wrapper.components().at(1).get('type')).toBe('db-symbol');
      expect(editor.getSelected().get('type')).toBe('db-symbol');
    });
  });

  describe('library actions', () => {
    test('renaming updates every instance name', () => {
      saveSymbolRecord(editor, { id: 'sym-hero', name: 'Hero section', components: [textLeaf('hero')] });
      const instanceComponent = insertSymbolInstance(editor, 'sym-hero');
      renameSymbolInstances(
        editor,
        saveSymbolRecord(editor, { ...getSymbolRecord(editor, 'sym-hero'), name: 'Main hero' }),
      );
      expect(instanceComponent.getName()).toBe('Reusable: Main hero');
      expect(editor.BlockManager.get('db-symbol-block-sym-hero').get('label')).toBe('Main hero');
    });

    test('blocks are updated in place instead of being recreated', () => {
      saveSymbolRecord(editor, { id: 'sym-a', name: 'Alpha', components: [textLeaf('a')] });
      const blockBefore = editor.BlockManager.get('db-symbol-block-sym-a');
      saveSymbolRecord(editor, { ...getSymbolRecord(editor, 'sym-a'), name: 'Alpha two' });
      expect(editor.BlockManager.get('db-symbol-block-sym-a')).toBe(blockBefore);
      expect(blockBefore.get('label')).toBe('Alpha two');
    });

    test('delete asks for confirmation first, then removes every copy', () => {
      saveSymbolRecord(editor, { id: 'sym-del', name: 'Gone', components: [textLeaf('bye')] });
      insertSymbolInstance(editor, 'sym-del');
      const actionElement = document.createElement('button');
      document.body.appendChild(actionElement);
      const callbacks = { refresh: () => null, reopen: () => null };
      handleSymbolDeleteAction(editor, getSymbolRecord(editor, 'sym-del'), actionElement, callbacks);
      expect(actionElement.getAttribute('data-db-symbol-confirm')).toBe('true');
      expect(actionElement.textContent).toBe('Confirm delete');
      expect(listSymbolInstances(editor, 'sym-del').length).toBe(1);
      handleSymbolDeleteAction(editor, getSymbolRecord(editor, 'sym-del'), actionElement, callbacks);
      expect(listSymbolInstances(editor, 'sym-del').length).toBe(0);
      expect(getSymbolRecord(editor, 'sym-del')).toBeNull();
    });

    test('each symbol gets its own thumbnail', () => {
      saveSymbolRecord(editor, { id: 'sym-t1', name: 'Nav', components: [{ type: 'db-navbar' }] });
      saveSymbolRecord(editor, { id: 'sym-t2', name: 'Footer', components: [{ type: 'db-footer' }] });
      const firstMedia = editor.BlockManager.get('db-symbol-block-sym-t1').get('media');
      const secondMedia = editor.BlockManager.get('db-symbol-block-sym-t2').get('media');
      expect(firstMedia).toContain('gjs-db-block-preview');
      expect(firstMedia).not.toBe(secondMedia);
    });
  });

  describe('editing state', () => {
    test('toolbar and settings button follow the editing state without reselecting', () => {
      saveSymbolRecord(editor, { id: 'sym-tb', name: 'Bar', components: [textLeaf('bar')] });
      const instanceComponent = insertSymbolInstance(editor, 'sym-tb');
      editor.select(instanceComponent);
      const titleOf = () => instanceComponent.get('toolbar')[0].attributes.title;
      expect(titleOf()).toBe('Edit everywhere');
      beginSymbolEditing(editor, instanceComponent);
      expect(titleOf()).toBe('Done editing everywhere');
      expect(instanceComponent.getTrait('db-symbol-edit').get('text')).toBe('Done editing everywhere');
      finishSymbolEditing(editor, instanceComponent);
      expect(titleOf()).toBe('Edit everywhere');
      expect(instanceComponent.getTrait('db-symbol-edit').get('text')).toBe('Edit everywhere');
    });

    test('a section symbol keeps the add section below action', () => {
      saveSymbolRecord(editor, { id: 'sym-sec', name: 'Band', components: [{ type: 'db-section' }] });
      const instanceComponent = insertSymbolInstance(editor, 'sym-sec');
      applySymbolToolbar(editor, instanceComponent);
      const titles = instanceComponent.get('toolbar').map((entry) => entry.attributes && entry.attributes.title);
      expect(titles).toContain('Add section below');
    });

    test('hover and selection changes inside an editing copy do not rewrite the master', async () => {
      saveSymbolRecord(editor, { id: 'sym-hover', name: 'Hover', components: [textLeaf('calm')] });
      const instanceComponent = insertSymbolInstance(editor, 'sym-hover');
      beginSymbolEditing(editor, instanceComponent);
      let updateCount = 0;
      editor.on('db:symbols:update', () => (updateCount += 1));
      const childComponent = instanceComponent.components().at(0);
      childComponent.set('status', 'hovered');
      expect(isEditorOnlyComponentUpdate(childComponent)).toBe(true);
      childComponent.set('status', '');
      childComponent.set('status', 'selected');
      await waitFor(450);
      expect(updateCount).toBe(0);
      childComponent.components('busy');
      await waitFor(450);
      expect(updateCount).toBe(1);
    });
  });

  describe('history', () => {
    test('undo after done editing everywhere keeps every copy and the master in step', () => {
      saveSymbolRecord(editor, { id: 'sym-undo', name: 'Nav', components: [textLeaf('Nav text')] });
      const firstInstance = insertSymbolInstance(editor, 'sym-undo');
      const secondInstance = insertSymbolInstance(editor, 'sym-undo');
      beginSymbolEditing(editor, firstInstance);
      firstInstance.components().at(0).components('EDITED');
      finishSymbolEditing(editor, firstInstance);
      expect(secondInstance.getInnerHTML()).toContain('EDITED');
      editor.UndoManager.undo();
      const masterText = JSON.stringify(getSymbolRecord(editor, 'sym-undo').components);
      expect(masterText).toContain('Nav text');
      expect(firstInstance.getInnerHTML()).toContain('Nav text');
      expect(secondInstance.getInnerHTML()).toContain('Nav text');
      editor.UndoManager.redo();
      expect(JSON.stringify(getSymbolRecord(editor, 'sym-undo').components)).toContain('EDITED');
      expect(secondInstance.getInnerHTML()).toContain('EDITED');
    });

    test('undoing a library delete brings the copies back with real content', () => {
      saveSymbolRecord(editor, { id: 'sym-revive', name: 'Nav', components: [textLeaf('alive')] });
      insertSymbolInstance(editor, 'sym-revive');
      insertSymbolInstance(editor, 'sym-revive');
      const actionElement = document.createElement('button');
      actionElement.setAttribute('data-db-symbol-confirm', 'true');
      handleSymbolDeleteAction(editor, getSymbolRecord(editor, 'sym-revive'), actionElement, {
        refresh: () => null,
      });
      expect(listSymbolInstances(editor, 'sym-revive').length).toBe(0);
      editor.UndoManager.undo();
      expect(listSymbolRecords(editor).map((record) => record.id)).toContain('sym-revive');
      const revivedInstances = listSymbolInstances(editor, 'sym-revive');
      expect(revivedInstances.length).toBe(2);
      expect(revivedInstances[0].getInnerHTML()).toContain('alive');
      expect(revivedInstances[0].getInnerHTML()).not.toContain('Pick a reusable component');
    });
  });

  describe('per copy changes', () => {
    const seedLockedInstance = () => {
      saveSymbolRecord(editor, {
        id: 'sym-ovr',
        name: 'Hero',
        components: [
          { tagName: 'div', components: [{ type: 'db-heading', components: 'Shared title' }, textLeaf('body')] },
        ],
      });
      return insertSymbolInstance(editor, 'sym-ovr');
    };

    test('text and image leaves stay selectable while containers stay locked', () => {
      const instanceComponent = seedLockedInstance();
      const containerComponent = instanceComponent.components().at(0);
      const headingComponent = containerComponent.components().at(0);
      expect(containerComponent.get('selectable')).toBe(false);
      expect(headingComponent.get('selectable')).toBe(true);
      expect(headingComponent.get('editable')).toBe(true);
      expect(headingComponent.get('removable')).toBe(false);
      expect(headingComponent.get('draggable')).toBe(false);
    });

    test('editing a leaf records an override that survives a master re-render', () => {
      const instanceComponent = seedLockedInstance();
      const secondInstance = insertSymbolInstance(editor, 'sym-ovr');
      const headingComponent = instanceComponent.components().at(0).components().at(0);
      headingComponent.components('Only here');
      expect(Object.keys(getSymbolOverrides(instanceComponent))).toEqual(['0.0']);
      expect(Object.keys(getSymbolOverrides(secondInstance)).length).toBe(0);
      beginSymbolEditing(editor, secondInstance);
      secondInstance.components().at(0).components().at(1).components('shared body v2');
      finishSymbolEditing(editor, secondInstance);
      expect(instanceComponent.getInnerHTML()).toContain('Only here');
      expect(instanceComponent.getInnerHTML()).toContain('shared body v2');
      expect(secondInstance.getInnerHTML()).toContain('Shared title');
    });

    test('a leaf edited back to the master value drops its override', () => {
      const instanceComponent = seedLockedInstance();
      const headingComponent = instanceComponent.components().at(0).components().at(0);
      headingComponent.components('Changed');
      headingComponent.components('Shared title');
      expect(Object.keys(getSymbolOverrides(instanceComponent)).length).toBe(0);
    });

    test('reset to match other copies restores the master leaf', () => {
      const instanceComponent = seedLockedInstance();
      const headingComponent = instanceComponent.components().at(0).components().at(0);
      headingComponent.components('Only here');
      editor.select(headingComponent);
      const titles = headingComponent.get('toolbar').map((entry) => entry.attributes && entry.attributes.title);
      expect(titles).toContain('Reset to match other copies');
      editor.runCommand('db:reset-symbol-override');
      expect(Object.keys(getSymbolOverrides(instanceComponent)).length).toBe(0);
      expect(instanceComponent.getInnerHTML()).toContain('Shared title');
      expect(instanceComponent.getInnerHTML()).not.toContain('Only here');
    });

    test('overrides travel with project data', () => {
      const instanceComponent = seedLockedInstance();
      instanceComponent.components().at(0).components().at(0).components('Only here');
      const projectData = JSON.parse(JSON.stringify(editor.getProjectData()));
      const reloadedEditor = createHeadlessEditor();
      reloadedEditor.loadProjectData(projectData);
      const reloadedInstance = listSymbolInstances(reloadedEditor, 'sym-ovr')[0];
      expect(reloadedInstance.getInnerHTML()).toContain('Only here');
      reloadedEditor.destroy();
    });
  });
});
