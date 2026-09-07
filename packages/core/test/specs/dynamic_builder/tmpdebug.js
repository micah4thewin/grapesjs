import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('debug', () => {
  test('types missing getEvents', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const bad = editor.Components.getTypes()
      .filter((t) => !t.view || typeof t.view.getEvents !== 'function')
      .map((t) => t.id);
    console.error('MAIN BAD', JSON.stringify(bad));
    const shallowTypes = editor.getModel().shallow.Components.getTypes();
    const badShallow = shallowTypes.filter((t) => !t.view || typeof t.view.getEvents !== 'function').map((t) => t.id);
    console.error('SHALLOW BAD', JSON.stringify(badShallow));
    console.error('SHALLOW HAS DBC', shallowTypes.some((t) => t.id === 'db-container'));
    editor.destroy();
  });
});
