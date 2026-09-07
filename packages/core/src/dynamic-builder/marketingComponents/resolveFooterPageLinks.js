import escapeHtmlText from '../support/escapeHtmlText.js';
import resolvePageFileName from '../support/resolvePageFileName.js';
import buildFooterLinkRecord from './buildFooterLinkRecord.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';

const resolveFooterPageLinks = (editor, footerComponent) => {
  const pageList = editor && editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  if (pageList.length < 2) return;
  const navComponent = findDescendantByAttribute(footerComponent, 'data-db-footer-nav');
  const listComponent = navComponent && findDescendantByAttribute(navComponent, 'data-db-footer-list');
  const headingComponent = navComponent && findDescendantByAttribute(navComponent, 'data-db-footer-heading');
  if (!listComponent) return;
  const linkRecords = pageList.slice(0, 8).map((sitePage) => ({
    text: String(sitePage.getName ? sitePage.getName() : '').trim() || 'Home',
    href: resolvePageFileName(editor, sitePage) + '.html',
  }));
  listComponent.components(linkRecords.map((linkRecord) => buildFooterLinkRecord(linkRecord.text, linkRecord.href)));
  if (headingComponent) headingComponent.components(escapeHtmlText('Pages'));
  if (navComponent) navComponent.addAttributes({ 'aria-label': 'Pages' });
};

export default resolveFooterPageLinks;
