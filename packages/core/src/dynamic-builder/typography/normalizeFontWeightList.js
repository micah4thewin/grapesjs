const normalizeFontWeightList = (weightValues) => {
  const rawWeightList = Array.isArray(weightValues)
    ? weightValues
    : String(weightValues == null ? '' : weightValues).split(/[^0-9]+/);
  const numericWeights = rawWeightList
    .map((weightValue) => parseInt(weightValue, 10))
    .filter((weightNumber) => Number.isFinite(weightNumber) && weightNumber >= 100 && weightNumber <= 1000);
  return Array.from(new Set(numericWeights)).sort((firstWeight, secondWeight) => firstWeight - secondWeight);
};

export default normalizeFontWeightList;
