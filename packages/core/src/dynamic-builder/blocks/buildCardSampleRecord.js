import buildCardDefaultChildren from '../marketingComponents/buildCardDefaultChildren.js';
import getSampleCardRecords from './getSampleCardRecords.js';

const buildCardSampleRecord = (sampleIndex) => {
  const cardRecords = getSampleCardRecords();
  const cardRecord = cardRecords[sampleIndex % cardRecords.length];
  const [imageRecord, bodyRecord] = buildCardDefaultChildren();
  imageRecord.attributes = { ...imageRecord.attributes, alt: 'Illustration for ' + cardRecord.title };
  const [titleRecord, textRecord, linkRecord] = bodyRecord.components;
  titleRecord.components = cardRecord.title;
  textRecord.components = cardRecord.text;
  if (linkRecord && linkRecord.attributes) {
    linkRecord.attributes = { ...linkRecord.attributes, 'aria-label': 'Read more: ' + cardRecord.title };
  }
  return { type: 'db-card', components: [imageRecord, bodyRecord] };
};

export default buildCardSampleRecord;
