import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('probe', () => {
  test('plain editor renders', async () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const cmp = editor.getWrapper().append('<div class="foo"><input name="a"></div>')[0];
    await new Promise((r) => setTimeout(r, 200));
    console.error('plain find', cmp.find('input').length, editor.getWrapper().view.el.innerHTML.length);
    editor.destroy();
  });
});
