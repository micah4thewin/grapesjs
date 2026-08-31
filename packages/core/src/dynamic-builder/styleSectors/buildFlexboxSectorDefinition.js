import buildNumberPropertyRecord from './buildNumberPropertyRecord.js';

const buildFlexboxSectorDefinition = () => {
  const flexDisplayRequirement = { display: ['flex', 'inline-flex'] };
  return {
    id: 'flexbox',
    name: 'Flexbox',
    open: false,
    properties: [
      { extend: 'flex-direction', requires: flexDisplayRequirement },
      { extend: 'flex-wrap', requires: flexDisplayRequirement },
      { extend: 'justify-content', requires: flexDisplayRequirement },
      { extend: 'align-items', requires: flexDisplayRequirement },
      { extend: 'align-content', requires: flexDisplayRequirement },
      {
        type: 'composite',
        property: 'gap',
        name: 'Gap',
        requires: flexDisplayRequirement,
        properties: [
          buildNumberPropertyRecord('row-gap', 'Row gap', '0'),
          buildNumberPropertyRecord('column-gap', 'Column gap', '0'),
        ],
      },
      { extend: 'order', requiresParent: flexDisplayRequirement },
      { extend: 'flex-grow', requiresParent: flexDisplayRequirement },
      { extend: 'flex-shrink', requiresParent: flexDisplayRequirement },
      { extend: 'flex-basis', requiresParent: flexDisplayRequirement },
      { extend: 'align-self', requiresParent: flexDisplayRequirement },
    ],
  };
};

export default buildFlexboxSectorDefinition;
