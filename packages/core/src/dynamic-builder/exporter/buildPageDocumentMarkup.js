import buildDocumentBodyMarkup from './buildDocumentBodyMarkup.js';
import buildDocumentHeadMarkup from './buildDocumentHeadMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getSiteSeoMetaRecord from './getSiteSeoMetaRecord.js';

const buildPageDocumentMarkup = (editor, page, buildOptions) => {
  const languageCode = String(getSiteSeoMetaRecord(editor).language || '').trim() || 'en';
  return [
    '<!doctype html>',
    '<html lang="' + escapeHtmlText(languageCode) + '">',
    '<head>',
    buildDocumentHeadMarkup(editor, page, buildOptions),
    '</head>',
    buildDocumentBodyMarkup(editor, page, buildOptions),
    '</html>',
    '',
  ].join('\n');
};

export default buildPageDocumentMarkup;
