import readCustomIconRecords from './readCustomIconRecords.js';

const getCustomIconAliasRecords = () => {
  const aliasRecords = {};
  readCustomIconRecords().forEach((iconRecord) => {
    aliasRecords[iconRecord.iconName] = [iconRecord.label.toLowerCase(), iconRecord.keywords, 'my icons']
      .filter(Boolean)
      .join(' ');
  });
  return aliasRecords;
};

export default getCustomIconAliasRecords;
