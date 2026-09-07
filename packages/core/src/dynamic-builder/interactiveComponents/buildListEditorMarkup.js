import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildListEditorMarkup = (listSpec, rowsMarkup) => {
  const extraActionsMarkup = (listSpec.extraActions || [])
    .map(
      (actionRecord) =>
        `<button type="button" class="gjs-db-button" data-db-list-action="${escapeHtmlText(actionRecord.action)}">` +
        getIconMarkup(actionRecord.iconName || 'refresh', { size: 14 }) +
        `<span>${escapeHtmlText(actionRecord.label)}</span></button>`,
    )
    .join('');
  return [
    '<div class="gjs-db-menu-items gjs-db-list-editor" data-db-list-editor="true">',
    `<div class="gjs-db-section-title">${escapeHtmlText(listSpec.title)}</div>`,
    listSpec.helpText ? `<p class="gjs-db-field-help">${escapeHtmlText(listSpec.helpText)}</p>` : '',
    `<div data-db-list-rows="true">${rowsMarkup}</div>`,
    '<div class="gjs-db-list-editor-actions">',
    '<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-list-add="true">',
    getIconMarkup('plus', { size: 14 }),
    `<span>${escapeHtmlText(listSpec.addLabel)}</span>`,
    '</button>',
    extraActionsMarkup,
    '</div>',
    '</div>',
  ].join('');
};

export default buildListEditorMarkup;
