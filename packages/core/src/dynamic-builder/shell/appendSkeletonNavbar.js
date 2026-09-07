import buildPageLinkRecords from './buildPageLinkRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import listComponentsMatching from './listComponentsMatching.js';
import setTextLeafContent from './setTextLeafContent.js';

const appendSkeletonNavbar = (editor, homePage, siteName) => {
  const rootComponent = homePage.getMainComponent();
  if (!editor.DomComponents.getType('db-navbar')) return null;
  const navbarComponent = rootComponent.append({ type: 'db-navbar' }, { at: 0 })[0];
  if (!navbarComponent) return null;
  const linkRecords = buildPageLinkRecords(editor);
  const brandComponent = listComponentsMatching(navbarComponent, { className: 'db-navbar-brand' })[0];
  if (brandComponent) {
    setTextLeafContent(brandComponent, siteName);
    brandComponent.addAttributes({ href: 'index.html' });
  }
  const menuComponent = listComponentsMatching(navbarComponent, { attributeName: 'data-db-navbar-menu' })[0];
  if (menuComponent) {
    menuComponent.components().reset();
    linkRecords.forEach((linkRecord) => {
      menuComponent.append(
        `<li class="db-navbar-item" data-db-navbar-item="true"><a class="db-navbar-link" href="${escapeHtmlText(linkRecord.hrefValue)}">${escapeHtmlText(linkRecord.labelText)}</a></li>`,
      );
    });
  }
  const contactRecord = linkRecords.find((linkRecord) => /contact/i.test(linkRecord.labelText));
  const ctaComponent = listComponentsMatching(navbarComponent, { attributeName: 'data-db-navbar-cta' })[0];
  if (ctaComponent && contactRecord) ctaComponent.addAttributes({ href: contactRecord.hrefValue });
  else navbarComponent.addAttributes({ 'data-db-cta': 'false' });
  return navbarComponent;
};

export default appendSkeletonNavbar;
