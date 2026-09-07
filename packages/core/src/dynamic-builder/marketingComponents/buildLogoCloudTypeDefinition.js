import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import appendLogoCloudItem from './appendLogoCloudItem.js';
import buildAddChildButtonTrait from './buildAddChildButtonTrait.js';
import buildLogoCloudDefaultChildren from './buildLogoCloudDefaultChildren.js';
import runLogoMarqueeBehavior from './runLogoMarqueeBehavior.js';

const buildLogoCloudTypeDefinition = () => ({
  type: 'db-logo-cloud',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'logo-cloud') && { type: 'db-logo-cloud' },
  model: {
    defaults: {
      tagName: 'ul',
      name: 'Logo row',
      draggable: getDropTargetSelectors().sectionBody,
      droppable: false,
      classes: ['db-logo-cloud'],
      attributes: {
        'data-db-type': 'logo-cloud',
        'aria-label': 'Trusted by these companies',
        'data-db-marquee': 'false',
        'data-db-logo-color': 'hover',
      },
      script: runLogoMarqueeBehavior,
      components: buildLogoCloudDefaultChildren(),
      traits: [
        { type: 'db-aria-label', name: 'aria-label', label: 'Screen reader label' },
        {
          type: 'select',
          name: 'data-db-logo-color',
          label: 'Logo colours',
          default: 'hover',
          options: [
            { id: 'hover', label: 'Grey, colour on hover' },
            { id: 'always', label: 'Always in colour' },
            { id: 'grey', label: 'Always grey' },
          ],
        },
        {
          type: 'checkbox',
          name: 'data-db-marquee',
          label: 'Scroll continuously',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
        buildAddChildButtonTrait('Add a logo', appendLogoCloudItem),
      ],
    },
  },
});

export default buildLogoCloudTypeDefinition;
