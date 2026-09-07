import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

const makeEditor = () => {
  document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
  const editor = grapesjs.init({
    container: '#db-editor',
    storageManager: { autoload: false, autosave: false, type: '' },
    plugins: [fixJsDom, grapesjs.dynamicBuilder],
  });
  fixJsDomIframe(editor.getModel().shallow);
  return editor;
};

describe('debug', () => {
  test('a: db-container first', () => {
    const editor = makeEditor();
    const wrapper = editor.Components.getShallowWrapper();
    let err = null;
    try {
      wrapper.append({ type: 'db-container' }, { temporary: true });
    } catch (e) {
      err = String(e && e.message);
    }
    console.error('A err', err);
    editor.destroy();
  });
  test('b: after appending a section to page', () => {
    const editor = makeEditor();
    editor.getWrapper().append({ type: 'db-section' });
    const wrapper = editor.Components.getShallowWrapper();
    let err = null;
    try {
      wrapper.append({ type: 'db-container' }, { temporary: true });
    } catch (e) {
      err = String(e && e.message);
    }
    console.error('B err', err);
    editor.destroy();
  });
});
