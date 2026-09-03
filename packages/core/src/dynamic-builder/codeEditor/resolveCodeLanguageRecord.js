import getCodeLanguageRecords from './getCodeLanguageRecords.js';

const resolveCodeLanguageRecord = (languageName) => {
  const languageRecords = getCodeLanguageRecords();
  return languageRecords[String(languageName || '')] || languageRecords.html;
};

export default resolveCodeLanguageRecord;
