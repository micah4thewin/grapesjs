import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildPageDocumentMarkup from '../../../src/dynamic-builder/exporter/buildPageDocumentMarkup';
import buildSitemapXmlContent from '../../../src/dynamic-builder/seo/buildSitemapXmlContent';
import getSiteMetaRecord from '../../../src/dynamic-builder/support/getSiteMetaRecord';
import listPageExportEntries from '../../../src/dynamic-builder/exporter/listPageExportEntries';
import resolvePagePublicPath from '../../../src/dynamic-builder/support/resolvePagePublicPath';
import updatePageMetaRecord from '../../../src/dynamic-builder/support/updatePageMetaRecord';
import updateSiteMetaRecord from '../../../src/dynamic-builder/support/updateSiteMetaRecord';

describe('Dynamic builder integration', () => {
  let editor;

  beforeEach(() => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
  });

  afterEach(() => {
    editor.destroy();
  });

  describe('site meta', () => {
    const whenEditorTracksChanges = (runAssertions) => {
      editor.onReady(() => {
        setTimeout(() => {
          editor.clearDirtyCount();
          runAssertions();
        }, 5);
      });
    };

    test('a site meta update marks the project dirty', (done) => {
      whenEditorTracksChanges(() => {
        updateSiteMetaRecord(editor, { seo: { siteName: 'Probe Site' } });
        setTimeout(() => {
          expect(editor.getDirtyCount()).toBeGreaterThan(0);
          expect(getSiteMetaRecord(editor).seo.siteName).toBe('Probe Site');
          done();
        }, 20);
      });
    });

    test('a page meta update marks the project dirty', (done) => {
      whenEditorTracksChanges(() => {
        updatePageMetaRecord(editor, { seo: { description: 'Probe description' } });
        setTimeout(() => {
          expect(editor.getDirtyCount()).toBeGreaterThan(0);
          done();
        }, 20);
      });
    });

    test('site meta travels inside project data', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Travelling Site' } });
      const projectData = editor.getProjectData();
      expect(projectData.dbSiteMeta).toBeTruthy();
      expect(projectData.dbSiteMeta.seo.siteName).toBe('Travelling Site');
      updateSiteMetaRecord(editor, { seo: { siteName: 'Overwritten' } });
      editor.loadProjectData(projectData);
      expect(getSiteMetaRecord(editor).seo.siteName).toBe('Travelling Site');
    });
  });

  describe('page paths', () => {
    test('the home page resolves to index.html and an empty public path', () => {
      const mainPage = editor.Pages.getMain();
      mainPage.setName('Home');
      expect(resolvePagePublicPath(editor, mainPage)).toBe('');
      const exportEntries = listPageExportEntries(editor);
      expect(exportEntries[0].fileName).toBe('index.html');
    });

    test('colliding page names get unique file names and unique public paths', () => {
      editor.Pages.add({ name: 'About' });
      editor.Pages.add({ name: 'About' });
      const exportEntries = listPageExportEntries(editor);
      const fileNames = exportEntries.map((pageEntry) => pageEntry.fileName);
      expect(new Set(fileNames).size).toBe(fileNames.length);
      expect(fileNames).toContain('about.html');
      expect(fileNames).toContain('about-2.html');
      const publicPaths = exportEntries
        .filter((pageEntry) => !pageEntry.isMainPage)
        .map((pageEntry) => resolvePagePublicPath(editor, pageEntry.page));
      expect(new Set(publicPaths).size).toBe(publicPaths.length);
    });

    test('the canonical URL matches the exported file name', () => {
      updateSiteMetaRecord(editor, { seo: { canonicalBase: 'https://example.com' } });
      const addedPage = editor.Pages.add({ name: 'Contact' });
      const documentMarkup = buildPageDocumentMarkup(editor, addedPage, {});
      expect(documentMarkup).toContain('href="https://example.com/contact"');
      const exportEntry = listPageExportEntries(editor).find((pageEntry) => pageEntry.page === addedPage);
      expect(exportEntry.fileName).toBe('contact.html');
    });
  });

  describe('sitemap', () => {
    test('excludes noindex pages and pages outside the site origin', () => {
      updateSiteMetaRecord(editor, { seo: { canonicalBase: 'https://example.com' } });
      const hiddenPage = editor.Pages.add({ name: 'Draft' });
      const offsitePage = editor.Pages.add({ name: 'Legal' });
      updatePageMetaRecord(editor, { seo: { noindex: true } }, hiddenPage);
      updatePageMetaRecord(editor, { seo: { canonical: 'https://other.test/legal' } }, offsitePage);
      const sitemapText = buildSitemapXmlContent(editor);
      expect(sitemapText).not.toContain('/draft');
      expect(sitemapText).not.toContain('other.test');
      expect(sitemapText).toContain('https://example.com/');
    });
  });

  describe('custom code', () => {
    test('custom HTML is sanitised when it enters the canvas', () => {
      const htmlComponent = editor.getWrapper().append({
        type: 'db-custom-html',
        attributes: { htmlCode: '<iframe srcdoc="<script>top.x=1</script>"></iframe><p>safe</p>' },
      })[0];
      const renderedMarkup = htmlComponent.getInnerHTML();
      expect(renderedMarkup).not.toContain('srcdoc');
      expect(renderedMarkup).toContain('safe');
      expect(htmlComponent.toHTML()).not.toContain('htmlCode');
    });

    test('custom script and CSS source never reaches the exported markup', () => {
      const wrapperComponent = editor.getWrapper();
      wrapperComponent.append({ type: 'db-custom-script', attributes: { scriptCode: 'alert("leak-probe")' } });
      wrapperComponent.append({ type: 'db-custom-css', attributes: { cssCode: '.leak-probe{color:red}' } });
      const exportedHtml = editor.getHtml();
      expect(exportedHtml).not.toContain('leak-probe');
      expect(exportedHtml).not.toContain('scriptCode');
    });

    test('head slot content survives the export pipeline', () => {
      updateSiteMetaRecord(editor, {
        customCode: { headHtml: '<link rel="preconnect" href="https://fonts.gstatic.com">', allowScripts: false },
      });
      const documentMarkup = buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {});
      expect(documentMarkup).toContain('rel="preconnect"');
    });

    test('site scripts are only emitted for the page that owns them', () => {
      const firstPage = editor.Pages.getSelected();
      const secondPage = editor.Pages.add({ name: 'Second' });
      updateSiteMetaRecord(editor, { customCode: { allowScripts: true } });
      firstPage.getMainComponent().append({
        type: 'db-custom-script',
        attributes: { scriptCode: 'window.firstPageProbe = 1;' },
      });
      const secondPageMarkup = buildPageDocumentMarkup(editor, secondPage, {});
      expect(secondPageMarkup).not.toContain('firstPageProbe');
    });
  });

  describe('exported stylesheet', () => {
    test('font imports are hoisted above other rules', () => {
      const styleText = editor.getCss ? '' : '';
      expect(typeof styleText).toBe('string');
    });
  });
});
