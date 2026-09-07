const buildColumnTemplateFromWidths = (widthList) => {
  const totalWidth = widthList.reduce((sum, widthValue) => sum + widthValue, 0);
  if (!totalWidth || !widthList.length) return '';
  const unitWidth = totalWidth / widthList.length;
  return widthList
    .map((widthValue) => `minmax(0, ${(Math.round((widthValue / unitWidth) * 1000) / 1000).toString()}fr)`)
    .join(' ');
};

export default buildColumnTemplateFromWidths;
