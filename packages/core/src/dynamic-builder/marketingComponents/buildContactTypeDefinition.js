import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildAddChildButtonTrait from './buildAddChildButtonTrait.js';
import buildContactDefaultChildren from './buildContactDefaultChildren.js';
import getDefaultContactRecord from './getDefaultContactRecord.js';
import insertContactMap from './insertContactMap.js';

const buildContactTypeDefinition = () => {
  const contactRecord = getDefaultContactRecord();
  return {
    type: 'db-contact',
    isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'contact') && { type: 'db-contact' },
    model: {
      defaults: {
        tagName: 'div',
        name: 'Contact details',
        draggable: getDropTargetSelectors().sectionBody,
        droppable: false,
        classes: ['db-contact'],
        attributes: {
          'data-db-type': 'contact',
          'data-db-address': contactRecord.address,
          'data-db-phone': contactRecord.phone,
          'data-db-email': contactRecord.email,
        },
        components: buildContactDefaultChildren(contactRecord),
        traits: [
          { type: 'text', name: 'data-db-address', label: 'Street address', placeholder: '1 High Street, Town' },
          { type: 'text', name: 'data-db-phone', label: 'Phone number', placeholder: '+44 20 7946 0000' },
          { type: 'text', name: 'data-db-email', label: 'Email address', placeholder: 'hello@yourbusiness.com' },
          buildAddChildButtonTrait('Insert a map below', insertContactMap),
        ],
      },
    },
  };
};

export default buildContactTypeDefinition;
