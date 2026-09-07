import validatePageName from './validatePageName.js';

const resolveUniquePageName = (editor, preferredName) => {
  const baseName = String(preferredName || 'New page').trim() || 'New page';
  let candidateName = baseName;
  let nameSuffix = 2;
  while (!validatePageName(editor, candidateName, '').isValid && nameSuffix < 100) {
    candidateName = `${baseName} ${nameSuffix}`;
    nameSuffix += 1;
  }
  return candidateName;
};

export default resolveUniquePageName;
