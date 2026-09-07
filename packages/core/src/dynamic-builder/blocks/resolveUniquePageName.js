import validatePageName from '../shell/validatePageName.js';

const resolveUniquePageName = (editor, baseName) => {
  const cleanBaseName = String(baseName || 'New page').trim() || 'New page';
  const candidateNames = Array.from({ length: 50 }, (unusedValue, candidateIndex) =>
    candidateIndex === 0 ? cleanBaseName : cleanBaseName + ' ' + (candidateIndex + 1),
  );
  const uniqueName = candidateNames.find((candidateName) => validatePageName(editor, candidateName, '').isValid);
  return uniqueName || cleanBaseName;
};

export default resolveUniquePageName;
