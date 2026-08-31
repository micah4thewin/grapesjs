import buildStatChildComponents from './buildStatChildComponents.js';

const buildStatTypeDefinition = () => ({
  type: 'db-stat',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'stat') && { type: 'db-stat' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Stat',
      draggable: '[data-db-type=stats]',
      droppable: false,
      classes: ['db-stat'],
      attributes: { 'data-db-type': 'stat' },
      components: buildStatChildComponents({ target: 12000, suffix: '+', label: 'Teams onboarded' }),
    },
  },
});

export default buildStatTypeDefinition;
