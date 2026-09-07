import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('probe', () => {
  test('model statics', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, (e) => grapesjs.dynamicBuilder(e, { shell: { firstRunWizard: false } })],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const types = editor.DomComponents.getTypes();
    const noDefaults = types.filter((t) => typeof t.model.getDefaults !== 'function').map((t) => t.id);
    console.log('NO_GETDEFAULTS', JSON.stringify(noDefaults.slice(0, 10)), noDefaults.length);
    const linkType = editor.DomComponents.getType('link');
    console.log('LINK_VIEW_OWN', JSON.stringify(Object.keys(linkType.view)));
    console.log('LINK_PROTO_CHAIN', String(Object.getPrototypeOf(linkType.view) === Function.prototype));
    editor.destroy();
  });
});
