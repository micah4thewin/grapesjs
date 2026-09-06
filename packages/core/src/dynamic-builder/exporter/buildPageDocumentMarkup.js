import buildDocumentBodyMarkup from './buildDocumentBodyMarkup.js';
import buildDocumentHeadMarkup from './buildDocumentHeadMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getSiteSeoMetaRecord from './getSiteSeoMetaRecord.js';

const buildPageDocumentMarkup = (editor, page, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const languageCode = String(getSiteSeoMetaRecord(editor).language || '').trim() || 'en';
  const pageKey = String(optionsRecord.pageFileName || '').replace(/\.html$/i, '');
  const pageAttribute = pageKey ? ' data-db-page="' + escapeHtmlText(pageKey) + '"' : '';
  return [
    '<!doctype html>',
    '<html lang="' + escapeHtmlText(languageCode) + '"' + pageAttribute + '>',
    '<head>',
    buildDocumentHeadMarkup(editor, page, optionsRecord),
    '</head>',
    buildDocumentBodyMarkup(editor, page, optionsRecord),
    '</html>',
    '',
  ].join('\n');
};

export default buildPageDocumentMarkup;
