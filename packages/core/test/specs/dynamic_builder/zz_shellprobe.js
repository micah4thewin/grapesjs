import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import duplicateSitePage from '../../../src/dynamic-builder/shell/duplicateSitePage';

describe('probe', () => {
  test('duplicate section page', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, (e) => grapesjs.dynamicBuilder(e, { shell: { firstRunWizard: false } })],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const about = editor.Pages.add({
      name: 'About',
      component: '<section class="s1"><a class="home-link" href="index.html">Home</a></section>',
    });
    console.log('SRC', about.getMainComponent().toHTML());
    const emptyPage = editor.Pages.add({ name: 'Empty' }, { select: false });
    console.log('EMPTY', emptyPage.getMainComponent().toHTML(), emptyPage.getMainComponent().components().length);
    const clones = about.getMainComponent().components().map((c) => c.clone());
    console.log('CLONE', clones.length, clones[0] && clones[0].toHTML());
    emptyPage.getMainComponent().append(clones);
    console.log('AFTER', emptyPage.getMainComponent().toHTML());
    const copy = duplicateSitePage(editor, about.getId());
    console.log('COPY', copy && copy.getMainComponent().toHTML());
    editor.destroy();
  });
});
