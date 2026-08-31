import buildBlockDefinition from './buildBlockDefinition.js';

const buildEmbedBlocks = () => [
  buildBlockDefinition('db-custom-html', 'Custom HTML', 'Embeds', 'embed', { type: 'db-custom-html' }),
  buildBlockDefinition('db-custom-css', 'Custom CSS', 'Embeds', 'color', { type: 'db-custom-css' }),
  buildBlockDefinition('db-custom-script', 'Custom script', 'Embeds', 'code', { type: 'db-custom-script' }),
];

export default buildEmbedBlocks;
