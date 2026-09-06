import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildLogoCloudDefaultChildren from './buildLogoCloudDefaultChildren.js';

const buildLogoCloudTypeDefinition = () => ({
  type: 'db-logo-cloud',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'logo-cloud') && { type: 'db-logo-cloud' },
  model: {
    defaults: {
      tagName: 'ul',
      name: 'Logo cloud',
      draggable: getDropTargetSelectors().sectionBody,
      droppable: false,
      classes: ['db-logo-cloud'],
      attributes: { 'data-db-type': 'logo-cloud', 'aria-label': 'Trusted by these companies' },
      components: buildLogoCloudDefaultChildren(),
      traits: [{ type: 'db-aria-label', name: 'aria-label', label: 'List label' }],
    },
  },
});

export default buildLogoCloudTypeDefinition;
