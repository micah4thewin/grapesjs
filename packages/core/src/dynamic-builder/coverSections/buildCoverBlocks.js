import buildBlockDefinition from '../blocks/buildBlockDefinition.js';

const buildCoverBlocks = () => [
  buildBlockDefinition('db-cover-photo', 'Photo cover', 'sections', 'image', { type: 'db-cover-photo' }),
  buildBlockDefinition('db-cover-video', 'Video cover', 'sections', 'video', { type: 'db-cover-video' }),
];

export default buildCoverBlocks;
