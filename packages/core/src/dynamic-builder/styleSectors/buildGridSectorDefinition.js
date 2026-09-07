import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import buildNumberPropertyRecord from './buildNumberPropertyRecord.js';
import getGridPresetRecords from './getGridPresetRecords.js';

const buildGridSectorDefinition = () => {
  const gridDisplayRequirement = { display: ['grid', 'inline-grid'] };
  const placementOptions = ['start', 'center', 'end', 'stretch'];
  const distributionOptions = placementOptions.concat(['space-between', 'space-around', 'space-evenly']);
  const selfPlacementOptions = ['auto'].concat(placementOptions);
  const presetRecords = getGridPresetRecords();
  const forGrid = (extraRecord) => ({ requires: gridDisplayRequirement, ...(extraRecord || {}) });
  const forGridChild = (extraRecord) => ({ requiresParent: gridDisplayRequirement, ...(extraRecord || {}) });
  return {
    id: 'grid',
    name: 'Grid',
    open: false,
    properties: [
      buildChoicePropertyRecord('db-preset', 'grid-template-columns', 'Columns', 'none', presetRecords.columns, forGrid()),
      buildChoicePropertyRecord('db-preset', 'grid-template-rows', 'Rows', 'none', presetRecords.rows, forGrid()),
      buildNumberPropertyRecord('column-gap', 'Column gap', '0', forGrid({ id: 'grid-column-gap' })),
      buildNumberPropertyRecord('row-gap', 'Row gap', '0', forGrid({ id: 'grid-row-gap' })),
      buildChoicePropertyRecord(
        'select',
        'grid-auto-flow',
        'Auto flow',
        'row',
        ['row', 'column', 'row dense', 'column dense'],
        forGrid(),
      ),
      buildChoicePropertyRecord('select', 'justify-items', 'Justify items', 'stretch', placementOptions, forGrid({ id: 'grid-justify-items' })),
      buildChoicePropertyRecord('select', 'align-items', 'Align items', 'stretch', placementOptions, forGrid({ id: 'grid-align-items' })),
      buildChoicePropertyRecord('select', 'justify-content', 'Justify content', 'start', distributionOptions, forGrid({ id: 'grid-justify-content' })),
      buildChoicePropertyRecord('select', 'align-content', 'Align content', 'start', distributionOptions, forGrid({ id: 'grid-align-content' })),
      buildChoicePropertyRecord('db-preset', 'grid-column', 'Column span', 'auto', presetRecords.span, forGridChild()),
      buildChoicePropertyRecord('db-preset', 'grid-row', 'Row span', 'auto', presetRecords.span, forGridChild()),
      buildChoicePropertyRecord('select', 'justify-self', 'Justify self', 'auto', selfPlacementOptions, forGridChild({ id: 'grid-justify-self' })),
      buildChoicePropertyRecord('select', 'align-self', 'Align self', 'auto', selfPlacementOptions, forGridChild({ id: 'grid-align-self' })),
    ],
  };
};

export default buildGridSectorDefinition;
