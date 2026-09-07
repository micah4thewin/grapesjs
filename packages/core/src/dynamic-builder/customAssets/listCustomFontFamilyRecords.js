import readCustomFontRecords from './readCustomFontRecords.js';

const describeFileCount = (fileCount) => (fileCount === 1 ? 'Your font, 1 file' : 'Your font, ' + fileCount + ' files');

const listCustomFontFamilyRecords = () => {
  const familyRecords = [];
  readCustomFontRecords().forEach((fontRecord) => {
    const knownRecord = familyRecords.filter((candidate) => candidate.family === fontRecord.family)[0];
    if (!knownRecord) {
      familyRecords.push({ family: fontRecord.family, category: 'custom', weights: [fontRecord.weight], hint: '' });
      return;
    }
    if (knownRecord.weights.indexOf(fontRecord.weight) < 0) knownRecord.weights.push(fontRecord.weight);
    knownRecord.fileCount = (knownRecord.fileCount || 1) + 1;
  });
  return familyRecords.map((familyRecord) => ({
    family: familyRecord.family,
    category: 'custom',
    weights: [...familyRecord.weights].sort((firstWeight, secondWeight) => firstWeight - secondWeight),
    hint: describeFileCount(familyRecord.fileCount || 1),
  }));
};

export default listCustomFontFamilyRecords;
