import formatTokenLabelText from './formatTokenLabelText.js';

const getTokenGroupLabel = (groupKey) => {
  const groupLabelMap = {
    color: 'Colors',
    font: 'Fonts',
    type: 'Text sizes',
    space: 'Spacing steps',
    radius: 'Corner rounding',
    shadow: 'Shadows',
    motion: 'Motion and timing',
  };
  return groupLabelMap[groupKey] || formatTokenLabelText(groupKey);
};

export default getTokenGroupLabel;
