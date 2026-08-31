const buildSpacingSelectOptions = (sizeRecord) =>
  Object.keys(sizeRecord).map((sizeKey) => ({ id: sizeKey, label: sizeRecord[sizeKey].label }));

export default buildSpacingSelectOptions;
