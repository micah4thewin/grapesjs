import getPageDisplayName from './getPageDisplayName.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveUniquePageName from './resolveUniquePageName.js';
import showToastNotice from '../support/showToastNotice.js';

const duplicateSitePage = (editor, pageId) => {
  const sourcePage = editor.Pages.get(pageId);
  if (!sourcePage) return null;
  const mainComponent = sourcePage.getMainComponent ? sourcePage.getMainComponent() : null;
  if (!mainComponent) return null;
  const copyName = resolveUniquePageName(editor, `${getPageDisplayName(sourcePage)} copy`);
  const copiedPage = editor.Pages.add({ name: copyName, component: mainComponent.toJSON() }, { select: true });
  if (!copiedPage) return null;
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
