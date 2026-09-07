import buildLinkPageOptionsMarkup from './buildLinkPageOptionsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import readLinkRecord from './readLinkRecord.js';

const buildListRowLinkFieldMarkup = (editor, linkComponent, itemText) => {
  const linkRecord = readLinkRecord(editor, linkComponent);
  const isPageLink = linkRecord.kind === 'page';
  const leadingOptions = [{ value: '', label: 'Web address or #anchor' }];
  const pageOptions = buildLinkPageOptionsMarkup(
    editor,
    isPageLink ? linkRecord.pageId : '',
    isPageLink ? linkRecord.anchorId : '',
    leadingOptions,
  );
  const hrefValue = linkRecord.href === '#' ? '' : linkRecord.href;
  return [
    `<select class="gjs-db-field-input" data-db-menu-field="pageLink" aria-label="${escapeHtmlText(`${itemText} link target`)}">`,
    pageOptions,
    '</select>',
    `<input class="gjs-db-field-input" data-db-menu-field="href" value="${escapeHtmlText(hrefValue)}"`,
    ` placeholder="https://example.com or #section" aria-label="${escapeHtmlText(`${itemText} web address`)}"`,
    `${isPageLink ? ' hidden' : ''}>`,
  ].join('');
};

export default buildListRowLinkFieldMarkup;
