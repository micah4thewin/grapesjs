import listTemplateContentNames from '../blocks/listTemplateContentNames.js';

const describeTemplateContents = (templateRecord) => {
  const partNames = listTemplateContentNames(templateRecord.content).filter(Boolean);
  const uniqueNames = partNames.filter((partName, partIndex) => partNames.indexOf(partName) === partIndex);
  return uniqueNames.slice(0, 6).join(', ');
};

export default describeTemplateContents;
