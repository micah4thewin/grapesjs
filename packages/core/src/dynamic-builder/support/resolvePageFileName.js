import resolvePagePathEntry from './resolvePagePathEntry.js';

const resolvePageFileName = (editor, page) => {
  const pathEntry = resolvePagePathEntry(editor, page);
  return pathEntry ? pathEntry.baseName : 'page';
};

export default resolvePageFileName;
