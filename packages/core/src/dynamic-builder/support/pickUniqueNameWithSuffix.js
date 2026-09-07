const pickUniqueNameWithSuffix = (preferredName, usedNames) => {
  const takenNames = Array.isArray(usedNames) ? usedNames : [];
  let uniqueName = preferredName;
  let nameSuffix = 2;
  while (takenNames.indexOf(uniqueName) >= 0) {
    uniqueName = preferredName + '-' + nameSuffix;
    nameSuffix += 1;
  }
  return uniqueName;
};

export default pickUniqueNameWithSuffix;
