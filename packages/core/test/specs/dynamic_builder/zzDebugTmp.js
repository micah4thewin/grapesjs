import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('dbg', () => {
  test('dump', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div><div id="plain"></div></div>';
    const plain = grapesjs.init({
      container: '#plain',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom],
    });
    const plainComps = plain.getWrapper().append('<p data-db-placeholder="true">Sample copy</p><div data-db-placeholder="true">Sample</div>');
    console.log('PLAIN', JSON.stringify(plainComps.map((c) => [c.get('type'), c.getAttributes()])));
    plain.destroy();
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const comps = editor.getWrapper().append('<p data-db-placeholder="true">Sample copy</p><div data-db-placeholder="true">Sample</div><h2 data-db-placeholder="true">Heading here</h2>');
    console.log('DB', JSON.stringify(comps.map((c) => [c.get('type'), c.getAttributes()])));
    editor.destroy();
  });
});
