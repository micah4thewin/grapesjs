import escapeHtmlText from '../support/escapeHtmlText.js';
import listPageExportEntries from './listPageExportEntries.js';

const buildExportPagesSectionMarkup = (editor) => {
  const pageRows = listPageExportEntries(editor).map((pageEntry) =>
    [
      '<div class="gjs-db-list-item gjs-db-export-row">',
      '<span class="gjs-db-export-name">',
      '<span>' + escapeHtmlText(pageEntry.pageName) + '</span>',
      '<span class="gjs-db-muted">' + escapeHtmlText(pageEntry.fileName) + '</span>',
      '</span>',
      '<button type="button" class="gjs-db-button" data-db-export-action="page" data-db-export-page="' +
        escapeHtmlText(pageEntry.pageId) +
        '">Download html</button>',
      '</div>',
    ].join(''),
  );
  return [
    '<section class="gjs-db-export-section">',
    '<div class="gjs-db-section-title">Pages</div>',
    '<div class="gjs-db-list">' + pageRows.join('') + '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-export-action="all-pages">Download all</button>',
    '</div>',
    '</section>',
  ].join('');
};

export default buildExportPagesSectionMarkup;
