import listPagePathEntries from '../support/listPagePathEntries.js';

const resolveNavbarCtaHref = (editor) => {
  const contactEntry = listPagePathEntries(editor).find(
    (pathEntry) => !pathEntry.isMainPage && /contact/.test(String(pathEntry.baseName || '')),
  );
  return contactEntry ? String(contactEntry.baseName) + '.html' : '#contact';
};

export default resolveNavbarCtaHref;
