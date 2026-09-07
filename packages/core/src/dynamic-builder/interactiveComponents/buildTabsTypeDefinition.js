import buildTabsDefaultChildren from './buildTabsDefaultChildren.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import runTabsBehavior from './runTabsBehavior.js';

const buildTabsTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-tabs',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'tabs') && { type: 'db-tabs' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Tabs',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: false,
      classes: ['db-tabs'],
      attributes: { 'data-db-type': 'tabs', 'data-db-tabs': 'true', 'data-db-orientation': 'horizontal' },
      components: buildTabsDefaultChildren(interactiveTextDefaults),
      script: runTabsBehavior,
      traits: [
        { type: 'db-tab-items', name: 'dbTabItems', label: 'Tabs' },
        {
          type: 'select',
          name: 'data-db-orientation',
          label: 'Orientation',
          default: 'horizontal',
          options: [
            { id: 'horizontal', label: 'Horizontal' },
            { id: 'vertical', label: 'Vertical' },
          ],
        },
      ],
    },
  },
});

export default buildTabsTypeDefinition;
