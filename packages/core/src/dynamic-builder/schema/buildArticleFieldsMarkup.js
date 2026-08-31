import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';

const buildArticleFieldsMarkup = (articleRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="Article" hidden>',
    buildSchemaTextFieldMarkup('article.headline', 'Headline', '', articleRecord.headline),
    buildSchemaTextareaFieldMarkup('article.description', 'Description', '', articleRecord.description),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('article.image', 'Image URL', '', articleRecord.image),
    buildSchemaTextFieldMarkup('article.authorName', 'Author name', '', articleRecord.authorName),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'article.datePublished',
      'Date published',
      'ISO format: 2026-01-31.',
      articleRecord.datePublished,
    ),
    buildSchemaTextFieldMarkup(
      'article.dateModified',
      'Date modified',
      'ISO format: 2026-01-31.',
      articleRecord.dateModified,
    ),
    '</div>',
    '</div>',
  ].join('');

export default buildArticleFieldsMarkup;
