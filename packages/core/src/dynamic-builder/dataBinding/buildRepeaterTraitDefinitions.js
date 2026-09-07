import buildRepeaterOrderingTraitDefinitions from './buildRepeaterOrderingTraitDefinitions.js';
import buildSourceOptionRecords from './buildSourceOptionRecords.js';
import getRepeaterAttributeNames from './getRepeaterAttributeNames.js';
import getRepeaterTraitCategory from './getRepeaterTraitCategory.js';

const buildRepeaterTraitDefinitions = (sourceNames, currentSourceName) => {
  const attributeNames = getRepeaterAttributeNames();
  const category = getRepeaterTraitCategory();
  return [
    {
      type: 'select',
      name: attributeNames.sourceName,
      label: 'Data source',
      options: buildSourceOptionRecords(sourceNames, currentSourceName),
      default: 'products',
      category,
    },
    {
      type: 'number',
      name: attributeNames.limitValue,
      label: 'Show at most',
      placeholder: 'All',
      min: 0,
      step: 1,
      default: 0,
      category,
    },
    { type: 'number', name: attributeNames.offsetValue, label: 'Skip first', min: 0, step: 1, default: 0, category },
    ...buildRepeaterOrderingTraitDefinitions(),
    {
      type: 'text',
      name: attributeNames.emptyText,
      label: 'Message when empty',
      placeholder: 'Nothing to show yet',
      category,
    },
    { type: 'text', name: attributeNames.itemAlias, label: 'Token name for each item', placeholder: 'item', category },
    {
      type: 'button',
      name: 'db-open-data-sources',
      label: '',
      text: 'Edit data sources',
      full: true,
      command: 'db:open-data-sources',
      category,
    },
  ];
};

export default buildRepeaterTraitDefinitions;
