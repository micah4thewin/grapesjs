import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import buildNumberPropertyRecord from './buildNumberPropertyRecord.js';
import buildTextPropertyRecord from './buildTextPropertyRecord.js';

const buildGridSectorDefinition = () => {
  const gridDisplayRequirement = { display: ['grid', 'inline-grid'] };
  const placementOptions = ['start', 'center', 'end', 'stretch'];
  const distributionOptions = placementOptions.concat(['space-between', 'space-around', 'space-evenly']);
  return {
    id: 'grid',
    name: 'Grid',
    open: false,
    properties: [
      buildTextPropertyRecord('grid-template-columns', 'Template columns', 'none', {
        requires: gridDisplayRequirement,
      }),
      buildTextPropertyRecord('grid-template-rows', 'Template rows', 'none', { requires: gridDisplayRequirement }),
      buildNumberPropertyRecord('column-gap', 'Column gap', '0', {
        id: 'grid-column-gap',
        requires: gridDisplayRequirement,
      }),
      buildNumberPropertyRecord('row-gap', 'Row gap', '0', { id: 'grid-row-gap', requires: gridDisplayRequirement }),
      buildChoicePropertyRecord(
        'select',
        'grid-auto-flow',
        'Auto flow',
        'row',
        ['row', 'column', 'row dense', 'column dense'],
        { requires: gridDisplayRequirement },
      ),
      buildChoicePropertyRecord('select', 'justify-items', 'Justify items', 'stretch', placementOptions, {
        id: 'grid-justify-items',
        requires: gridDisplayRequirement,
      }),
      buildChoicePropertyRecord('select', 'align-items', 'Align items', 'stretch', placementOptions, {
        id: 'grid-align-items',
        requires: gridDisplayRequirement,
      }),
      buildChoicePropertyRecord('select', 'justify-content', 'Justify content', 'start', distributionOptions, {
        id: 'grid-justify-content',
        requires: gridDisplayRequirement,
      }),
      buildChoicePropertyRecord('select', 'align-content', 'Align content', 'start', distributionOptions, {
        id: 'grid-align-content',
        requires: gridDisplayRequirement,
      }),
    ],
  };
};

export default buildGridSectorDefinition;
