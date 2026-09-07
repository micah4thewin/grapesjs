import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildListEditorMarkup = (editorSettings) => {
  const settings = editorSettings || {};
  const extraAttributes = settings.extraAttributes || {};
  return [
    `<div class="gjs-db-menu-items" data-db-list-editor ${extraAttributes.wrapper || ''}>`,
    '<div class="gjs-db-menu-heading">',
    `<span class="gjs-db-menu-heading-text">${escapeHtmlText(settings.headingText || 'Items')}</span>`,
    `<span class="gjs-db-badge" data-db-list-count>${Number(settings.itemCount) || 0}</span>`,
    '</div>',
    `<div data-db-list-rows ${extraAttributes.rows || ''}>${settings.rowsMarkup || ''}</div>`,
    `<button type="button" class="gjs-db-button gjs-db-menu-add" data-db-list-add ${extraAttributes.add || ''}>`,
    getIconMarkup('plus', { size: 14 }),
    `<span>${escapeHtmlText(settings.addLabel || 'Add item')}</span>`,
    '</button>',
    '</div>',
  ].join('');
};

export default buildListEditorMarkup;
