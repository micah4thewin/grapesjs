import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import insertSymbolInstance from '../../../src/dynamic-builder/symbols/insertSymbolInstance';
import listSymbolInstances from '../../../src/dynamic-builder/symbols/listSymbolInstances';
import saveSymbolRecord from '../../../src/dynamic-builder/symbols/saveSymbolRecord';

describe('probe', () => {
  test('D fresh headless editor loads a symbol project', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    saveSymbolRecord(editor, { id: 'sym-nav', name: 'Navbar', components: [{ tagName: 'p', type: 'text', components: 'Nav text' }] });
    insertSymbolInstance(editor, 'sym-nav');
    const projectData = JSON.parse(JSON.stringify(editor.getProjectData()));
    editor.destroy();
    const reloaded = grapesjs.init({ headless: true, storageManager: false, plugins: [grapesjs.dynamicBuilder] });
    const events = [];
    reloaded.on('component:add', (c) => events.push('add:' + c.get('type')));
    reloaded.on('project:load', () => events.push('project:load'));
    reloaded.loadProjectData(projectData);
    const instance = listSymbolInstances(reloaded, 'sym-nav')[0];
    console.log(JSON.stringify({ events, inner: instance && instance.getInnerHTML(), types: instance && instance.components().map((c) => c.get('type')) }));
    expect(instance).toBeTruthy();
    reloaded.destroy();
  });
});
