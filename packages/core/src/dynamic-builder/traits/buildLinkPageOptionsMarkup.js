import collectPageAnchorRecords from './collectPageAnchorRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import listSitePageRecords from './listSitePageRecords.js';

const buildOption = (optionValue, optionLabel, isSelected) =>
  `<option value="${escapeHtmlText(optionValue)}"${isSelected ? ' selected' : ''}>${escapeHtmlText(optionLabel)}</option>`;

const buildLinkPageOptionsMarkup = (editor, selectedPageId, selectedAnchorId, leadingOptions = []) => {
  const selectedKey = selectedPageId ? `${selectedPageId}${selectedAnchorId ? `#${selectedAnchorId}` : ''}` : '';
  const optionParts = leadingOptions.map((leadingOption) =>
    buildOption(leadingOption.value, leadingOption.label, leadingOption.value === selectedKey),
  );
  listSitePageRecords(editor).forEach((pageRecord) => {
    optionParts.push(buildOption(pageRecord.pageId, pageRecord.label, pageRecord.pageId === selectedKey));
    collectPageAnchorRecords(pageRecord.page).forEach((anchorRecord) => {
      const optionValue = `${pageRecord.pageId}#${anchorRecord.anchorId}`;
      optionParts.push(
        buildOption(optionValue, `${pageRecord.label} \u203a ${anchorRecord.label}`, optionValue === selectedKey),
      );
    });
  });
  return optionParts.join('');
};

export default buildLinkPageOptionsMarkup;
