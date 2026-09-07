import escapeHtmlText from '../support/escapeHtmlText.js';
import listTemplateCategoryOptions from './listTemplateCategoryOptions.js';

const buildSaveTemplateFormMarkup = (fieldIdPrefix, kindName, defaultName, sourceSummary) => {
  const optionsMarkup = listTemplateCategoryOptions(kindName)
    .map(
      (optionRecord) =>
        `<option value="${escapeHtmlText(optionRecord.categoryId)}">${escapeHtmlText(optionRecord.label)}</option>`,
    )
    .join('');
  return [
    '<div class="gjs-db-form gjs-db-template-save">',
    `<p class="gjs-db-muted">Saving ${escapeHtmlText(sourceSummary)}. It stays in this browser and shows up under My templates.</p>`,
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${fieldIdPrefix}-name">Template name</label>`,
    `<input id="${fieldIdPrefix}-name" class="gjs-db-field-input" type="text" maxlength="80" autocomplete="off"`,
    ` value="${escapeHtmlText(defaultName)}" data-db-template-name data-db-autofocus />`,
    '<p class="gjs-db-field-error-text" data-db-template-error role="alert"></p>',
    '</div>',
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${fieldIdPrefix}-description">Description</label>`,
    `<textarea id="${fieldIdPrefix}-description" class="gjs-db-field-input" rows="2" maxlength="240"`,
    ' data-db-template-description></textarea>',
    '<p class="gjs-db-field-help">One line to remind you what this is for.</p>',
    '</div>',
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${fieldIdPrefix}-category">Category</label>`,
    `<select id="${fieldIdPrefix}-category" class="gjs-db-field-input" data-db-template-category-field>`,
    optionsMarkup,
    '</select>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-template-cancel>Cancel</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-template-submit>Save template</button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildSaveTemplateFormMarkup;
