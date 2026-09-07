import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTemplateChooserMarkup = (templateLabel, hintText, partNames, pageHasContent) => {
  const safeLabel = escapeHtmlText(templateLabel);
  const appendButtonMarkup = pageHasContent
    ? '<button type="button" class="gjs-db-button" data-db-template-action="append">Add below current content</button>'
    : '';
  const replaceNoteMarkup = pageHasContent
    ? '<p class="gjs-db-field-help">Replacing removes everything on this page. Undo with Ctrl+Z if you change your mind.</p>'
    : '';
  return [
    '<div class="gjs-db-form gjs-db-template-chooser">',
    '<div class="gjs-db-template-preview-frame" data-db-template-preview-frame>',
    '<div class="gjs-db-template-preview-stage" data-db-template-preview-stage>',
    `<iframe class="gjs-db-template-preview" data-db-template-preview title="Preview of the ${safeLabel}" sandbox=""></iframe>`,
    '</div></div>',
    `<p class="gjs-db-muted">${escapeHtmlText(hintText)}</p>`,
    `<p class="gjs-db-field-help">Includes: ${escapeHtmlText(partNames.join(', '))}.</p>`,
    '<div class="gjs-db-button-row">',
    `<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-template-action="replace" data-db-autofocus>${pageHasContent ? 'Replace this page' : 'Use on this page'}</button>`,
    '<button type="button" class="gjs-db-button" data-db-template-action="new-page">Add as a new page</button>',
    appendButtonMarkup,
    '</div>',
    replaceNoteMarkup,
    '</div>',
  ].join('');
};

export default buildTemplateChooserMarkup;
