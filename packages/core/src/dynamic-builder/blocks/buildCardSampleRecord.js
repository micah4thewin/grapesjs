import buildCardDefaultChildren from '../marketingComponents/buildCardDefaultChildren.js';
import getSampleCardRecords from './getSampleCardRecords.js';

const buildCardSampleRecord = (sampleIndex) => {
  const cardRecords = getSampleCardRecords();
  const cardRecord = cardRecords[sampleIndex % cardRecords.length];
  const [imageRecord, bodyRecord] = buildCardDefaultChildren();
  imageRecord.attributes = { ...imageRecord.attributes, alt: 'Illustration for ' + cardRecord.title };
  bodyRecord.components[0].components = cardRecord.title;
  bodyRecord.components[1].components = cardRecord.text;
  return { type: 'db-card', components: [imageRecord, bodyRecord] };
};

export default buildCardSampleRecord;
