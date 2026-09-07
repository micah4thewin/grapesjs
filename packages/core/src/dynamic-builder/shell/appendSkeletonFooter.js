import buildPageLinkRecords from './buildPageLinkRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import listComponentsMatching from './listComponentsMatching.js';
import setTextLeafContent from './setTextLeafContent.js';

const appendSkeletonFooter = (editor, homePage, siteName) => {
  const rootComponent = homePage.getMainComponent();
  if (!editor.DomComponents.getType('db-footer')) return null;
  const footerComponent = rootComponent.append({ type: 'db-footer' })[0];
  if (!footerComponent) return null;
  const linkRecords = buildPageLinkRecords(editor);
  const logoComponent = listComponentsMatching(footerComponent, { className: 'db-footer-logo' })[0];
  logoComponent && setTextLeafContent(logoComponent, siteName);
  const copyrightComponent = listComponentsMatching(footerComponent, { className: 'db-footer-copyright' })[0];
  copyrightComponent &&
    setTextLeafContent(copyrightComponent, `\u00a9 ${new Date().getFullYear()} ${siteName}. All rights reserved.`);
  const navComponents = listComponentsMatching(footerComponent, { className: 'db-footer-nav' });
  navComponents.slice(1).forEach((extraNav) => extraNav.remove());
  const pagesNav = navComponents[0];
  if (!pagesNav) return footerComponent;
  const headingComponent = listComponentsMatching(pagesNav, { className: 'db-footer-heading' })[0];
  headingComponent && setTextLeafContent(headingComponent, 'Pages');
  pagesNav.addAttributes({ 'aria-label': 'Pages' });
  const listComponent = listComponentsMatching(pagesNav, { className: 'db-footer-list' })[0];
  if (!listComponent) return footerComponent;
  listComponent.components().reset();
  linkRecords.forEach((linkRecord) => {
    listComponent.append(
      `<li><a class="db-footer-link" href="${escapeHtmlText(linkRecord.hrefValue)}">${escapeHtmlText(linkRecord.labelText)}</a></li>`,
    );
  });
  return footerComponent;
};

export default appendSkeletonFooter;
