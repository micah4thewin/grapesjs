import formatTokenLabelText from './formatTokenLabelText.js';

const getTokenGroupLabel = (groupKey) => {
  const groupLabelMap = {
    color: 'Colors',
    font: 'Font stacks',
    type: 'Type scale',
    space: 'Spacing scale',
    radius: 'Radius scale',
    shadow: 'Shadows',
    motion: 'Motion',
  };
  return groupLabelMap[groupKey] || formatTokenLabelText(groupKey);
};

export default getTokenGroupLabel;
