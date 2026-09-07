import findCustomIconRecord from './findCustomIconRecord.js';
import splitIconNameWords from '../icons/splitIconNameWords.js';

const resolveIconDisplayLabel = (iconName) => {
  const customRecord = findCustomIconRecord(iconName);
  return customRecord ? customRecord.label : splitIconNameWords(iconName);
};

export default resolveIconDisplayLabel;
