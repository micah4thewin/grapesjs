import resolvePagePathEntry from './resolvePagePathEntry.js';

const resolvePagePublicPath = (editor, page) => {
  const pathEntry = resolvePagePathEntry(editor, page);
  if (!pathEntry || pathEntry.isMainPage) return '';
  return pathEntry.baseName;
};

export default resolvePagePublicPath;
