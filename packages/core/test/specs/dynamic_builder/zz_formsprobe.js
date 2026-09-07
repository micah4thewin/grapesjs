import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('probe', () => {
  test('custom type render', async () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, (ed) => {
        ed.Components.addType('my-thing', { model: { defaults: { tagName: 'div', attributes: { 'data-x': '1' } } } });
      }],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const cmp = editor.getWrapper().append({ type: 'my-thing' })[0];
    await new Promise((r) => setTimeout(r, 200));
    console.error('custom find', editor.getWrapper().view.el.innerHTML.length);
    editor.destroy();
  });
});
