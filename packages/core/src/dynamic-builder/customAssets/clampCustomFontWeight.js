import getCustomFontWeightRecords from './getCustomFontWeightRecords.js';

const clampCustomFontWeight = (weightValue) => {
  const roundedWeight = Math.round(Number(weightValue) || 400);
  const knownWeights = getCustomFontWeightRecords().map((weightRecord) => weightRecord.weight);
  return knownWeights.indexOf(roundedWeight) >= 0 ? roundedWeight : 400;
};

export default clampCustomFontWeight;
