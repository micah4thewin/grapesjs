import buildDropRule from '../support/buildDropRule.js';
import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';
import buildLayoutPlaceholderChildren from './buildLayoutPlaceholderChildren.js';
import buildOptionalAttributeSetter from './buildOptionalAttributeSetter.js';

const buildColumnTypeDefinition = () => ({
  type: 'db-column',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'column') && { type: 'db-column' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Column',
      draggable: '[data-db-type=columns]',
      droppable: buildDropRule(getPageLevelComponentTypes()),
      classes: ['db-column'],
      attributes: { 'data-db-type': 'column' },
      components: buildLayoutPlaceholderChildren('column'),
      traits: [
        {
          type: 'select',
          name: 'data-db-theme',
          label: 'Background',
          setValue: buildOptionalAttributeSetter('data-db-theme', 'none'),
          options: [
            { id: 'none', label: 'None' },
            { id: 'light', label: 'Light grey' },
            { id: 'dark', label: 'Dark' },
            { id: 'brand', label: 'Brand colour' },
          ],
        },
        {
          type: 'select',
          name: 'data-db-align',
          label: 'Text alignment',
          setValue: buildOptionalAttributeSetter('data-db-align', 'left'),
          options: [
            { id: 'left', label: 'Left' },
            { id: 'center', label: 'Centered' },
          ],
        },
      ],
    },
  },
});

export default buildColumnTypeDefinition;
