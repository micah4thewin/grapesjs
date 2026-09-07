import buildSymbolCardActionMarkup from './buildSymbolCardActionMarkup.js';

const buildSymbolCardActionsMarkup = (symbolRecord) =>
  [
    buildSymbolCardActionMarkup(symbolRecord, 'insert', 'Add here', { iconName: 'plus' }),
    buildSymbolCardActionMarkup(symbolRecord, 'insert-all', 'Add to every page', { iconName: 'copy', primary: true }),
    buildSymbolCardActionMarkup(symbolRecord, 'rename', 'Rename', { iconName: 'edit', iconOnly: true }),
    buildSymbolCardActionMarkup(symbolRecord, 'delete', 'Delete', { iconName: 'trash', iconOnly: true }),
  ].join('');

export default buildSymbolCardActionsMarkup;
