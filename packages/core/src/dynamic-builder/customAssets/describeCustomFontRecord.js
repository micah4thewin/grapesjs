import formatByteSizeText from '../support/formatByteSizeText.js';
import getCustomFontWeightRecords from './getCustomFontWeightRecords.js';

const describeCustomFontRecord = (fontRecord) => {
  const weightRecord = getCustomFontWeightRecords().filter(
    (candidate) => candidate.weight === fontRecord.weight,
  )[0] || { label: String(fontRecord.weight) };
  return [
    weightRecord.label,
    fontRecord.style === 'italic' ? 'Italic' : 'Upright',
    fontRecord.format,
    fontRecord.byteSize ? formatByteSizeText(fontRecord.byteSize) : '',
  ]
    .filter(Boolean)
    .join(' - ');
};

export default describeCustomFontRecord;
