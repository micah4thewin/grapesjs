import clonePageComponents from './clonePageComponents.js';
import getPageDisplayName from './getPageDisplayName.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveUniquePageName from './resolveUniquePageName.js';
import showToastNotice from '../support/showToastNotice.js';

const duplicateSitePage = (editor, pageId) => {
  const sourcePage = editor.Pages.get(pageId);
  if (!sourcePage || !sourcePage.getMainComponent) return null;
  const copyName = resolveUniquePageName(editor, `${getPageDisplayName(sourcePage)} copy`);
  const copiedPage = editor.Pages.add({ name: copyName }, { select: true });
  if (!copiedPage) return null;
  const copiedRoot = copiedPage.getMainComponent();
  const copiedComponents = clonePageComponents(sourcePage);
  if (copiedRoot && copiedComponents.length) copiedRoot.append(copiedComponents);
  const sourceMeta = sourcePage.get('dbPageMeta');
  if (isPlainRecord(sourceMeta)) {
    const copiedMeta = JSON.parse(JSON.stringify(sourceMeta));
    if (isPlainRecord(copiedMeta.seo)) delete copiedMeta.seo.slug;
    copiedPage.set('dbPageMeta', copiedMeta);
  }
  showToastNotice(editor, `Duplicated as "${copyName}"`, { kind: 'success' });
  return copiedPage;
};

export default duplicateSitePage;
