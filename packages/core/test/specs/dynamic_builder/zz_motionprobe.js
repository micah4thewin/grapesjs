import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('probe', () => {
  test('probe', async () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const c = editor.getWrapper().append({ type: 'db-custom-script' })[0];
    await new Promise((r) => setTimeout(r, 400));
    console.log('AFTER WAIT VIEW?', !!c.view, !!c.getEl(), 'canvasdoc', !!(editor.Canvas.getDocument && editor.Canvas.getDocument()));
    console.log('FIND', c.find('.db-code-card-note').length);
    editor.destroy();
  });
});
