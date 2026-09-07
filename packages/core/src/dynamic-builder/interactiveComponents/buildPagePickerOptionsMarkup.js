import escapeHtmlText from '../support/escapeHtmlText.js';
import listPagePathEntries from '../support/listPagePathEntries.js';
import resolvePageEntryName from './resolvePageEntryName.js';
import resolvePageLinkHref from './resolvePageLinkHref.js';

const buildPagePickerOptionsMarkup = (editor, currentHref) => {
  const pathEntries = editor && editor.Pages ? listPagePathEntries(editor) : [];
  const optionRecords = pathEntries.map((pathEntry) => ({
    hrefValue: resolvePageLinkHref(pathEntry),
    labelText: resolvePageEntryName(pathEntry),
  }));
  const hasMatchingPage = optionRecords.some((optionRecord) => optionRecord.hrefValue === currentHref);
  return [
    `<option value=""${hasMatchingPage ? '' : ' selected'} disabled hidden>Pick a page</option>`,
    ...optionRecords.map(
      (optionRecord) =>
        `<option value="${escapeHtmlText(optionRecord.hrefValue)}"${optionRecord.hrefValue === currentHref ? ' selected' : ''}>${escapeHtmlText(optionRecord.labelText)}</option>`,
    ),
  ].join('');
};

export default buildPagePickerOptionsMarkup;
