import getSectionBlockOrder from './getSectionBlockOrder.js';

const sortBlockDefinitions = (blockDefinitions) => {
  const sectionOrder = getSectionBlockOrder();
  const rankWithin = (blockDefinition, originalIndex) => {
    const sectionRank = sectionOrder.indexOf(blockDefinition.id);
    return sectionRank >= 0 ? sectionRank : sectionOrder.length + originalIndex;
  };
  return blockDefinitions
    .map((blockDefinition, originalIndex) => ({ blockDefinition, originalIndex }))
    .sort((first, second) => {
      const categoryDelta = first.blockDefinition.category.order - second.blockDefinition.category.order;
      if (categoryDelta !== 0) return categoryDelta;
      return (
        rankWithin(first.blockDefinition, first.originalIndex) -
        rankWithin(second.blockDefinition, second.originalIndex)
      );
    })
    .map((entry) => entry.blockDefinition);
};

export default sortBlockDefinitions;
