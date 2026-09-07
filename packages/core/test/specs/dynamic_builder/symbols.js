import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import insertSymbolInstance from '../../../src/dynamic-builder/symbols/insertSymbolInstance';
import listSymbolInstances from '../../../src/dynamic-builder/symbols/listSymbolInstances';
import saveSymbolRecord from '../../../src/dynamic-builder/symbols/saveSymbolRecord';

describe('Dynamic builder reusable components', () => {
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

  test('instances survive a project round trip through loadProjectData', () => {
    saveSymbolRecord(editor, {
      id: 'sym-nav',
      name: 'Navbar',
      components: [{ tagName: 'p', type: 'text', components: 'Nav text' }],
    });
    insertSymbolInstance(editor, 'sym-nav');
    const projectData = JSON.parse(JSON.stringify(editor.getProjectData()));
    editor.loadProjectData(projectData);
    const instance = listSymbolInstances(editor, 'sym-nav')[0];
    expect(instance.getInnerHTML()).toContain('Nav text');
    expect(instance.getInnerHTML()).not.toContain('Pick a reusable component');
  });
});
