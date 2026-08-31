import buildCalloutIconGlyphMarkup from './buildCalloutIconGlyphMarkup.js';

const createCalloutTypeDefinition = (contentTextDefaults) => ({
  type: 'db-callout',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'callout' && { type: 'db-callout' },
  model: {
    defaults: {
      tagName: 'aside',
      name: 'Callout',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'callout', 'data-db-variant': 'info', role: 'note' },
      classes: ['db-callout'],
      components: [
        {
          tagName: 'span',
          name: 'Callout icon',
          classes: ['db-callout-icon'],
          attributes: { 'aria-hidden': 'true' },
          selectable: false,
          hoverable: false,
          layerable: false,
          draggable: false,
          droppable: false,
          copyable: false,
          removable: false,
          components: buildCalloutIconGlyphMarkup(),
        },
        {
          tagName: 'div',
          name: 'Callout content',
          classes: ['db-callout-content'],
          draggable: false,
          droppable: true,
          removable: false,
          copyable: false,
          components: [
            {
              type: 'text',
              tagName: 'p',
              name: 'Callout title',
              classes: ['db-callout-title'],
              draggable: false,
              droppable: false,
              components: contentTextDefaults.calloutTitleText,
            },
            {
              type: 'text',
              tagName: 'p',
              name: 'Callout body',
              classes: ['db-callout-body'],
              draggable: false,
              droppable: false,
              components: contentTextDefaults.calloutBodyText,
            },
          ],
        },
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-variant',
          label: 'Variant',
          options: [
            { id: 'info', label: 'Info' },
            { id: 'success', label: 'Success' },
            { id: 'warning', label: 'Warning' },
            { id: 'error', label: 'Error' },
          ],
        },
      ],
    },
  },
});

export default createCalloutTypeDefinition;
