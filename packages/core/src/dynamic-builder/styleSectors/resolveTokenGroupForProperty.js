const resolveTokenGroupForProperty = (propertyModel) => {
  if (!propertyModel || !propertyModel.getType) return '';
  const propertyType = propertyModel.getType();
  const propertyName = String(propertyModel.get('property') || propertyModel.getId() || '');
  if (propertyType === 'color') return 'color';
  if (propertyName === 'font-size') return 'type';
  if (/radius/.test(propertyName)) return 'radius';
  if (
    propertyType === 'number' &&
    /^(margin|padding|gap|row-gap|column-gap|top|right|bottom|left)/.test(propertyName)
  ) {
    return 'space';
  }
  return '';
};

export default resolveTokenGroupForProperty;
