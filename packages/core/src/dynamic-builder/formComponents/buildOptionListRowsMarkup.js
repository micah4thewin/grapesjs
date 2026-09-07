import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildOptionListRowsMarkup = (optionEntries, selectedValue, radioGroupName) =>
  optionEntries
    .map((optionEntry, optionIndex) => {
      const isSelected = optionEntry.optionValue === selectedValue;
      const valueText = optionEntry.optionValue === optionEntry.optionLabel ? '' : optionEntry.optionValue;
      return [
        `<div class="gjs-db-option-row" data-db-option-row="${optionIndex}">`,
        `<input type="radio" class="gjs-db-option-default" name="${escapeHtmlText(radioGroupName)}" data-db-option-default title="Preselect this option" aria-label="Preselect this option"${isSelected ? ' checked' : ''}>`,
        `<input class="gjs-db-field-input" data-db-option-field="optionLabel" value="${escapeHtmlText(optionEntry.optionLabel)}" placeholder="Label" aria-label="Option label">`,
        `<input class="gjs-db-field-input gjs-db-option-value" data-db-option-field="optionValue" value="${escapeHtmlText(valueText)}" placeholder="Sent as (optional)" aria-label="Value sent with the form">`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-option-move="-1" title="Move up">${getIconMarkup('arrowUp', { size: 14, label: 'Move up' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-option-move="1" title="Move down">${getIconMarkup('arrowDown', { size: 14, label: 'Move down' })}</button>`,
        `<button type="button" class="gjs-db-menu-icon-button" data-db-option-remove="true" title="Remove">${getIconMarkup('trash', { size: 14, label: 'Remove' })}</button>`,
        '</div>',
      ].join('');
    })
    .join('');

export default buildOptionListRowsMarkup;
