import buildTemplateTabsMarkup from './buildTemplateTabsMarkup.js';

const buildTemplateManagerMarkup = (fieldIdPrefix, activeTabId) =>
  [
    '<div class="gjs-db-form gjs-db-templates">',
    buildTemplateTabsMarkup(fieldIdPrefix, activeTabId),
    '<div class="gjs-db-template-toolbar">',
    '<div class="gjs-db-field gjs-db-template-search-field">',
    `<label class="gjs-db-field-label" for="${fieldIdPrefix}-search">Search</label>`,
    `<input id="${fieldIdPrefix}-search" class="gjs-db-field-input" type="search" autocomplete="off"`,
    ' placeholder="Search by name, for example pricing" data-db-template-search />',
    '</div>',
    '<div class="gjs-db-field gjs-db-template-category-field">',
    `<label class="gjs-db-field-label" for="${fieldIdPrefix}-category">Category</label>`,
    `<select id="${fieldIdPrefix}-category" class="gjs-db-field-input" data-db-template-category></select>`,
    '</div>',
    '</div>',
    `<div class="gjs-db-template-grid" role="tabpanel" id="${fieldIdPrefix}-grid"`,
    ` aria-labelledby="${fieldIdPrefix}-tab-${activeTabId}" data-db-template-grid></div>`,
    '<p class="gjs-db-muted" data-db-template-empty hidden></p>',
    '<div class="gjs-db-button-row gjs-db-template-footer">',
    '<button type="button" class="gjs-db-button" data-db-template-save="page">Save this page as a template</button>',
    '<button type="button" class="gjs-db-button" data-db-template-save="section">Save the selected section</button>',
    '</div>',
    '</div>',
  ].join('');

export default buildTemplateManagerMarkup;
