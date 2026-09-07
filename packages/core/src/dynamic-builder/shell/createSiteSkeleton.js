import appendSkeletonFooter from './appendSkeletonFooter.js';
import appendSkeletonHero from './appendSkeletonHero.js';
import appendSkeletonNavbar from './appendSkeletonNavbar.js';
import applySkeletonDesignKit from './applySkeletonDesignKit.js';
import createSkeletonPages from './createSkeletonPages.js';
import ensureMainPageName from './ensureMainPageName.js';
import makeComponentReusableEverywhere from './makeComponentReusableEverywhere.js';
import registerSymbolBlocks from '../symbols/registerSymbolBlocks.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const createSiteSkeleton = (editor, pluginOptions, wizardValues) => {
  const siteName = wizardValues.siteName || 'My site';
  ensureMainPageName(editor);
  const homePage = editor.Pages.getMain();
  if (!homePage) return null;
  updateSiteMetaRecord(editor, { identity: { siteName }, seo: { siteName } });
  applySkeletonDesignKit(editor, pluginOptions, wizardValues.kitId);
  const createdPages = createSkeletonPages(editor, wizardValues.pagePresets || []);
  appendSkeletonHero(editor, homePage, siteName);
  const navbarComponent = appendSkeletonNavbar(editor, homePage, siteName);
  const footerComponent = appendSkeletonFooter(editor, homePage, siteName);
  const navbarRecord = makeComponentReusableEverywhere(editor, navbarComponent, 'Site navigation', { atTop: true });
  const footerRecord = makeComponentReusableEverywhere(editor, footerComponent, 'Site footer', {});
  registerSymbolBlocks(editor);
  editor.Pages.select(homePage);
  editor.trigger('db:site-skeleton:created', { pages: createdPages, navbarRecord, footerRecord });
  return { pageCount: createdPages.length + 1, navbarRecord, footerRecord };
};

export default createSiteSkeleton;
