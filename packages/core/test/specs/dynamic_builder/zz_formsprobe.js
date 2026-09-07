import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

const mk = () => {
  document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
  const editor = grapesjs.init({
    container: '#db-editor',
    storageManager: { autoload: false, autosave: false, type: '' },
    plugins: [fixJsDom, grapesjs.dynamicBuilder],
  });
  fixJsDomIframe(editor.getModel().shallow);
  return editor;
};

describe('probe', () => {
  test('empty wrapper', async () => {
    const editor = mk();
    await new Promise((r) => setTimeout(r, 200));
    console.error('empty ok', editor.getWrapper().view ? editor.getWrapper().view.el.innerHTML.length : 'noview');
    editor.destroy();
  });
  test('plain div', async () => {
    const editor = mk();
    const cmp = editor.getWrapper().append('<div class="foo"><input name="a"></div>')[0];
    await new Promise((r) => setTimeout(r, 200));
    console.error('plain find', cmp.find('input').length);
    editor.destroy();
  });
});
