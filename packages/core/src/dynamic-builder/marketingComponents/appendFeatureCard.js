import buildFeatureCardRecord from './buildFeatureCardRecord.js';
import getFeaturePresetRecords from './getFeaturePresetRecords.js';

const appendFeatureCard = (editor, featuresComponent) => {
  if (!featuresComponent || !featuresComponent.append) return;
  const presetRecords = getFeaturePresetRecords();
  const presetRecord = presetRecords[featuresComponent.components().length % presetRecords.length];
  const addedCard = featuresComponent.append(buildFeatureCardRecord(presetRecord))[0];
  if (addedCard && editor && editor.select) editor.select(addedCard);
};

export default appendFeatureCard;
