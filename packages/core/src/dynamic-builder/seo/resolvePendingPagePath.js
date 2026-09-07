import listPagePathEntries from '../support/listPagePathEntries.js';
import pickUniqueNameWithSuffix from '../support/pickUniqueNameWithSuffix.js';
import toSlugText from '../support/toSlugText.js';

const resolvePendingPagePath = (editor, page, pendingSlug) => {
  const pathEntries = listPagePathEntries(editor);
  const targetId = String(page && page.getId ? page.getId() : '');
  const targetEntry = pathEntries.find((pathEntry) => pathEntry.pageId === targetId) || null;
  if (!targetEntry) return toSlugText(pendingSlug);
  if (targetEntry.isMainPage) return '';
  const pageName = page.getName ? page.getName() : '';
  const preferredName = toSlugText(pendingSlug) || toSlugText(pageName) || targetEntry.baseName;
  const usedNames = ['index'].concat(
    pathEntries.filter((pathEntry) => pathEntry.pageId !== targetId).map((pathEntry) => pathEntry.baseName),
  );
  return pickUniqueNameWithSuffix(preferredName, usedNames);
};

export default resolvePendingPagePath;
