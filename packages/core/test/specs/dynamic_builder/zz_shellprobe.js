import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import getToolsMenuCommandIds from '../../../src/dynamic-builder/shell/getToolsMenuCommandIds';

describe('probe', () => {
  test('commands', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, (e) => grapesjs.dynamicBuilder(e, { shell: { firstRunWizard: false } })],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const missing = getToolsMenuCommandIds().filter((id) => !editor.Commands.has(id));
    console.log('MISSING_TOOLS', JSON.stringify(missing));
    console.log('HAS_SITEMGR', editor.Commands.has('db:open-site-manager'), editor.Commands.has('db:open-template-manager'));
    editor.destroy();
  });
});
