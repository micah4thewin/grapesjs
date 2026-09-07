const buildSourceOptionRecords = (sourceNames, currentValue) => {
  const optionRecords = sourceNames.map((sourceName) => ({ id: sourceName, label: sourceName }));
  const currentName = String(currentValue == null ? '' : currentValue);
  if (currentName && sourceNames.indexOf(currentName) < 0) {
    optionRecords.unshift({ id: currentName, label: `${currentName} (missing)` });
  }
  return optionRecords;
};

export default buildSourceOptionRecords;
