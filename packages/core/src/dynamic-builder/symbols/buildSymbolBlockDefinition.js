import buildSymbolThumbnailMarkup from './buildSymbolThumbnailMarkup.js';

const buildSymbolBlockDefinition = (editor, symbolRecord) => ({
  label: String(symbolRecord.name || 'Reusable component'),
  category: 'Reusable',
  media: buildSymbolThumbnailMarkup(editor, symbolRecord),
  select: true,
  attributes: { title: 'Reusable \u2014 edit once, updates everywhere' },
  content: { type: 'db-symbol', attributes: { 'data-db-type': 'symbol', 'data-db-symbol': symbolRecord.id } },
});

export default buildSymbolBlockDefinition;
