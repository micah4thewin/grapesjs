import buildDragRule from '../support/buildDragRule.js';
import buildDropRule from '../support/buildDropRule.js';
import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';
import buildLayoutPlaceholderChildren from './buildLayoutPlaceholderChildren.js';
import buildOptionalAttributeGetter from './buildOptionalAttributeGetter.js';
import buildOptionalAttributeSetter from './buildOptionalAttributeSetter.js';

const buildColumnTypeDefinition = () => ({
  type: 'db-column',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'column') && { type: 'db-column' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Column',
      draggable: buildDragRule(['db-columns']),
      droppable: buildDropRule(getPageLevelComponentTypes()),
      classes: ['db-column'],
      attributes: { 'data-db-type': 'column' },
      components: buildLayoutPlaceholderChildren('column'),
      traits: [
        {
          type: 'select',
          name: 'data-db-theme',
          label: 'Background',
          getValue: buildOptionalAttributeGetter('data-db-theme', 'none'),
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
          getValue: buildOptionalAttributeGetter('data-db-align', 'left'),
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
