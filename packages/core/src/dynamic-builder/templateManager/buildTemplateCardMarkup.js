import buildTemplateCardActionsMarkup from './buildTemplateCardActionsMarkup.js';
import describeTemplateContents from './describeTemplateContents.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getTemplateCategoryRecords from './getTemplateCategoryRecords.js';

const buildTemplateCardMarkup = (templateRecord) => {
  const safeName = escapeHtmlText(templateRecord.name);
  const categoryLabel = getTemplateCategoryRecords()[templateRecord.categoryId] || templateRecord.categoryId;
  const partsText = describeTemplateContents(templateRecord);
  return [
    `<article class="gjs-db-template-card" data-db-template-card="${escapeHtmlText(templateRecord.templateId)}">`,
    '<div class="gjs-db-template-preview-frame" data-db-template-preview-frame>',
    '<div class="gjs-db-template-preview-stage" data-db-template-preview-stage>',
    `<iframe class="gjs-db-template-preview" data-db-template-preview sandbox="" title="Preview of ${safeName}"></iframe>`,
    '</div></div>',
    '<div class="gjs-db-template-card-body">',
    `<h3 class="gjs-db-template-card-title">${safeName}`,
    `<span class="gjs-db-badge">${escapeHtmlText(categoryLabel)}</span></h3>`,
    `<p class="gjs-db-muted">${escapeHtmlText(templateRecord.description || '')}</p>`,
    partsText ? `<p class="gjs-db-field-help">Includes: ${escapeHtmlText(partsText)}.</p>` : '',
    buildTemplateCardActionsMarkup(templateRecord),
    '</div>',
    '</article>',
  ].join('');
};

export default buildTemplateCardMarkup;
