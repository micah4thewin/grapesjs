import buildSymbolTraitDefinitions from './buildSymbolTraitDefinitions.js';

const buildSymbolTypeDefinition = () => ({
  type: 'db-symbol',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'symbol') && { type: 'db-symbol' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Reusable component',
      draggable: true,
      droppable: false,
      classes: ['db-symbol'],
      attributes: { 'data-db-type': 'symbol', 'data-db-symbol': '' },
      traits: (symbolComponent) => buildSymbolTraitDefinitions(symbolComponent && symbolComponent.em),
    },
  },
});

export default buildSymbolTypeDefinition;
