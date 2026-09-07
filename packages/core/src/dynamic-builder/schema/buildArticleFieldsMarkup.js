import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';

const buildArticleFieldsMarkup = (articleRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="Article" hidden>',
    buildSchemaTextFieldMarkup(
      'article.headline',
      'Headline',
      'The article title, ideally under 110 characters.',
      articleRecord.headline,
    ),
    buildSchemaTextareaFieldMarkup(
      'article.description',
      'Summary',
      'One or two sentences that sum up the article.',
      articleRecord.description,
    ),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'article.image',
      'Image',
      'Full address of a large image, at least 1200px wide.',
      articleRecord.image,
      { type: 'url', placeholder: 'https://www.example.com/article.jpg' },
    ),
    buildSchemaTextFieldMarkup('article.authorName', 'Author name', 'Who wrote it.', articleRecord.authorName),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'article.datePublished',
      'Date published',
      'When the article first went live.',
      articleRecord.datePublished,
      { type: 'date' },
    ),
    buildSchemaTextFieldMarkup(
      'article.dateModified',
      'Date updated',
      'Optional. Falls back to the published date.',
      articleRecord.dateModified,
      { type: 'date' },
    ),
    '</div>',
    '</div>',
  ].join('');

export default buildArticleFieldsMarkup;
