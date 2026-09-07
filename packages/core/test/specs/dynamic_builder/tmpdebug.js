import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('debug', () => {
  test('plugin shallow append', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const wrapper = editor.Components.getShallowWrapper();
    ['text', 'default', 'db-container'].forEach((t) => {
      let err = null;
      let info = null;
      try {
        const c = wrapper.append({ type: t }, { temporary: true })[0];
        info = c.get('type');
      } catch (e) {
        err = String(e && e.message);
      }
      console.error('TYPE', t, 'got', info, 'err', err);
    });
    editor.destroy();
  });
});
