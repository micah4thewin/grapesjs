import getIconMarkup from '../support/getIconMarkup.js';

const buildBlockDefinition = (blockId, blockLabel, categoryLabel, iconName, blockContent) => ({
  id: blockId,
  label: blockLabel,
  category: categoryLabel,
  media: getIconMarkup(iconName, { size: 28 }),
  select: true,
  content: blockContent,
});

export default buildBlockDefinition;
