import buildSchemaPageUrl from './buildSchemaPageUrl.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';

const resolveTrailPageName = (trailPage, isMainPage) => {
  const pageName = String((trailPage.getName ? trailPage.getName() : '') || '').trim();
  if (pageName) return pageName;
  return isMainPage ? 'Home' : '';
};

const buildBreadcrumbListRecord = (editor, page) => {
  const pagesModule = editor.Pages;
  if (!page || !pagesModule || !pagesModule.getAll) return null;
  const mainPage = (pagesModule.getMain && pagesModule.getMain()) || pagesModule.getAll()[0] || null;
  if (!mainPage || mainPage === page) return null;
  const trailPages = [
    { trailPage: mainPage, isMainPage: true },
    { trailPage: page, isMainPage: false },
  ];
  const itemListElement = trailPages.map((trailRecord, trailIndex) => ({
    '@type': 'ListItem',
    position: trailIndex + 1,
    name: resolveTrailPageName(trailRecord.trailPage, trailRecord.isMainPage),
    item: buildSchemaPageUrl(editor, trailRecord.trailPage),
  }));
  const hasIncompleteItem = itemListElement.some((listItem) => !listItem.name || !listItem.item);
  if (hasIncompleteItem) return null;
  return (
    pruneEmptySchemaValues({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    }) || null
  );
};

export default buildBreadcrumbListRecord;
