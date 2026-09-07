import buildListRowMarkup from './buildListRowMarkup.js';
import buildPagePickerOptionsMarkup from './buildPagePickerOptionsMarkup.js';
import collectListItemRecords from '../support/collectListItemRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import readComponentTextContent from './readComponentTextContent.js';
import resolveEditorFromComponent from './resolveEditorFromComponent.js';

const buildPagePickerMarkup = (editor, currentHref) => {
  const optionsMarkup = buildPagePickerOptionsMarkup(editor, currentHref).replace(
    'value=""',
    `value="${escapeHtmlText(currentHref)}"`,
  );
  return `<select class="gjs-db-field-input" data-db-menu-field="href" data-db-menu-page-picker="true" aria-label="Link to page">${optionsMarkup}</select>`;
};

const buildNavbarMenuRowsMarkup = (rootComponent, listSelector, emptyMessage) => {
  const itemRecords = collectListItemRecords(rootComponent, listSelector);
  if (!itemRecords.length) return `<p class="gjs-db-muted">${escapeHtmlText(emptyMessage)}</p>`;
  const editor = resolveEditorFromComponent(rootComponent);
  return itemRecords
    .map((itemRecord, itemIndex) => {
      const labelText = readComponentTextContent(itemRecord.linkComponent);
      const isLinkRow = String(itemRecord.linkComponent.get('tagName') || '').toLowerCase() === 'a';
      const labelInput = `<input class="gjs-db-field-input" data-db-menu-field="label" value="${escapeHtmlText(labelText)}" placeholder="Label" aria-label="Label">`;
      const linkFields = isLinkRow
        ? buildPagePickerMarkup(editor, itemRecord.linkHref) +
          `<input class="gjs-db-field-input" data-db-menu-field="href" value="${escapeHtmlText(itemRecord.linkHref)}" placeholder="Or type a link, like #about" aria-label="Link">`
        : '';
      return buildListRowMarkup(itemIndex, labelInput + linkFields);
    })
    .join('');
};

export default buildNavbarMenuRowsMarkup;
