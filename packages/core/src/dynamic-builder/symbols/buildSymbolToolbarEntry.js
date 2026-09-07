import getIconMarkup from '../support/getIconMarkup.js';

const buildSymbolToolbarEntry = (commandTarget, labelText, iconName) => ({
  attributes: { title: labelText, 'data-db-symbol-toolbar': 'true' },
  label: getIconMarkup(iconName, { size: 15, label: labelText }),
  command: commandTarget,
});

export default buildSymbolToolbarEntry;
