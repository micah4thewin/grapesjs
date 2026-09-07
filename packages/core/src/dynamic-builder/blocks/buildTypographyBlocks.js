import buildBlockDefinition from './buildBlockDefinition.js';

const buildTypographyBlocks = () => [
  buildBlockDefinition('db-heading', 'Heading', 'Typography', 'heading', { type: 'db-heading' }),
  buildBlockDefinition('db-text', 'Text', 'Typography', 'text', { type: 'db-text' }),
  buildBlockDefinition('db-lead-text', 'Lead text', 'Typography', 'typography', {
    type: 'db-text',
    attributes: { 'data-db-variant': 'lead' },
  }),
  buildBlockDefinition('db-button', 'Button', 'Typography', 'button', { type: 'db-button' }),
  buildBlockDefinition('db-quote', 'Quote', 'Typography', 'quote', { type: 'db-quote' }),
  buildBlockDefinition('db-list', 'List', 'Typography', 'list', { type: 'db-list' }),
  buildBlockDefinition('db-callout-info', 'Info note', 'Typography', 'info', { type: 'db-callout' }),
  buildBlockDefinition('db-callout-warning', 'Warning note', 'Typography', 'warning', {
    type: 'db-callout',
    attributes: { 'data-db-variant': 'warning' },
  }),
  buildBlockDefinition('db-eyebrow-heading', 'Small label + title', 'Typography', 'badge', {
    type: 'db-eyebrow-group',
  }),
];

export default buildTypographyBlocks;
