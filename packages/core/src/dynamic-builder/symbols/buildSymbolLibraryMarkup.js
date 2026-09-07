import buildSymbolCardMarkup from './buildSymbolCardMarkup.js';
import buildSymbolThumbnailMarkup from './buildSymbolThumbnailMarkup.js';
import describeSymbolUsage from './describeSymbolUsage.js';
import listSymbolRecords from './listSymbolRecords.js';

const buildSymbolLibraryMarkup = (editor) => {
  const symbolRecords = listSymbolRecords(editor);
  const cardsMarkup = symbolRecords
    .map((symbolRecord) =>
      buildSymbolCardMarkup(
        symbolRecord,
        describeSymbolUsage(editor, symbolRecord.id),
        buildSymbolThumbnailMarkup(editor, symbolRecord),
      ),
    )
    .join('');
  const emptyMarkup = [
    '<p class="gjs-db-symbol-empty">',
    'Nothing reusable yet. Select a navbar, footer or any section on the canvas, then choose ',
    '<strong>Make reusable</strong> from its toolbar.',
    '</p>',
  ].join('');
  return [
    '<div class="gjs-db-form gjs-db-symbol-library">',
    '<p class="gjs-db-symbol-intro">',
    'Build a header, nav or footer once. Every copy stays in step, on every page. ',
    'Text and images can still be changed on a single page.',
    '</p>',
    symbolRecords.length ? '<ul class="gjs-db-symbol-list">' + cardsMarkup + '</ul>' : emptyMarkup,
    '</div>',
  ].join('');
};

export default buildSymbolLibraryMarkup;
