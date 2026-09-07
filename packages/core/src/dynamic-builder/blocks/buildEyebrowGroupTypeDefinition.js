import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildEyebrowGroupTypeDefinition = () => ({
  type: 'db-eyebrow-group',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'eyebrow-group') && { type: 'db-eyebrow-group' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Small label + title',
      draggable: true,
      droppable: false,
      classes: ['db-eyebrow-group'],
      attributes: { 'data-db-type': 'eyebrow-group', 'data-db-align': 'start' },
      components: [
        {
          ...buildTextContentRecord('Our mission', 'caption'),
          name: 'Small label',
          classes: ['db-text', 'db-eyebrow'],
        },
        buildHeadingContentRecord('2', 'A better way to build for the web'),
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-align',
          label: 'Alignment',
          default: 'start',
          options: [
            { id: 'start', label: 'Left' },
            { id: 'center', label: 'Center' },
          ],
        },
      ],
    },
  },
});

export default buildEyebrowGroupTypeDefinition;
