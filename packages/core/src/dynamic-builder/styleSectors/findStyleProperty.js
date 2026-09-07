const findStyleProperty = (styleManager, sectorId, propertyName) => {
  const sectorModel = styleManager && styleManager.getSector ? styleManager.getSector(sectorId) : null;
  if (!sectorModel || !sectorModel.getProperties) return null;
  const matchesName = (propertyModel) =>
    propertyModel.getId() === propertyName || propertyModel.get('property') === propertyName;
  const searchList = (propertyList) => {
    for (let listIndex = 0; listIndex < propertyList.length; listIndex += 1) {
      const propertyModel = propertyList[listIndex];
      if (matchesName(propertyModel)) return propertyModel;
      if (propertyModel.getType() === 'composite' && propertyModel.getProperties) {
        const nestedMatch = searchList(propertyModel.getProperties());
        if (nestedMatch) return nestedMatch;
      }
    }
    return null;
  };
  return searchList(sectorModel.getProperties());
};

export default findStyleProperty;
