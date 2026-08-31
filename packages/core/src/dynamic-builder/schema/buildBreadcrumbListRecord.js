import buildSchemaPageUrl from './buildSchemaPageUrl.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';

const buildBreadcrumbListRecord = (editor, page) => {
  const pagesModule = editor.Pages;
  if (!page || !pagesModule || !pagesModule.getAll) return null;
  const mainPage = (pagesModule.getMain && pagesModule.getMain()) || pagesModule.getAll()[0] || null;
  const trailPages = mainPage && mainPage !== page ? [mainPage, page] : [page];
  const itemListElement = trailPages.map((trailPage, trailIndex) =>
    pruneEmptySchemaValues({
      '@type': 'ListItem',
      position: trailIndex + 1,
      name: trailPage.getName ? trailPage.getName() : '',
      item: buildSchemaPageUrl(editor, trailPage),
    }),
  );
  return (
    pruneEmptySchemaValues({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    }) || null
  );
};

export default buildBreadcrumbListRecord;
