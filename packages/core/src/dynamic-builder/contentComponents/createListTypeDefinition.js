import buildListItemComponents from './buildListItemComponents.js';

const createListTypeDefinition = (contentTextDefaults) => ({
  type: 'db-list',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'list' && { type: 'db-list' },
  model: {
    defaults: {
      tagName: 'ul',
      name: 'List',
      draggable: true,
      droppable: 'li',
      attributes: { 'data-db-type': 'list', 'data-db-spacing': 'normal' },
      classes: ['db-list'],
      components: buildListItemComponents(contentTextDefaults.listItemTexts),
      traits: [
        {
          type: 'checkbox',
          name: 'tagName',
          label: 'Numbered list',
          changeProp: true,
          valueTrue: 'ol',
          valueFalse: 'ul',
        },
        {
          type: 'select',
          name: 'data-db-spacing',
          label: 'Space between items',
          options: [
            { id: 'normal', label: 'Normal' },
            { id: 'tight', label: 'Tight' },
            { id: 'loose', label: 'Loose' },
          ],
        },
      ],
    },
  },
});

export default createListTypeDefinition;
