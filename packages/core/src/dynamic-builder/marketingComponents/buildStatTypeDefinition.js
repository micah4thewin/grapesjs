import buildStatChildComponents from './buildStatChildComponents.js';
import getStatPresetRecords from './getStatPresetRecords.js';

const buildStatTypeDefinition = () => {
  const firstPreset = getStatPresetRecords()[0];
  return {
    type: 'db-stat',
    isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'stat') && { type: 'db-stat' },
    model: {
      defaults: {
        tagName: 'div',
        name: 'Big number',
        draggable: '[data-db-type=stats]',
        droppable: false,
        classes: ['db-stat'],
        attributes: {
          'data-db-type': 'stat',
          'data-db-stat-target': String(firstPreset.target),
          'data-db-stat-prefix': '',
          'data-db-stat-suffix': firstPreset.suffix,
        },
        components: buildStatChildComponents(firstPreset),
        traits: [
          { type: 'number', name: 'data-db-stat-target', label: 'Number', step: 0.01, placeholder: '12000' },
          { type: 'text', name: 'data-db-stat-prefix', label: 'Text before (e.g. $)', placeholder: '$' },
          { type: 'text', name: 'data-db-stat-suffix', label: 'Text after (e.g. +)', placeholder: '+' },
        ],
      },
    },
  };
};

export default buildStatTypeDefinition;
