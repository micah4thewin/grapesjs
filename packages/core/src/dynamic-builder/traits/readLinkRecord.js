import listSitePageRecords from './listSitePageRecords.js';

const buildRecord = (kind, href, extraFields) => ({
  kind,
  href,
  pageId: '',
  anchorId: '',
  address: '',
  ...extraFields,
});

const matchPageHref = (editor, href) => {
  const [filePart, anchorPart] = href.split('#');
  const cleanFile = filePart.replace(/^\.?\//, '');
  const pageRecord = listSitePageRecords(editor).find((candidate) => candidate.fileName === cleanFile);
  return pageRecord ? { pageId: pageRecord.pageId, anchorId: anchorPart || '' } : null;
};

const isUploadedFileSource = (editor, href) => {
  if (/^(data|blob):/i.test(href)) return true;
  const assetManager = editor && editor.AssetManager;
  return Boolean(assetManager && assetManager.get && assetManager.get(href));
};

const readLinkRecord = (editor, component) => {
  const attributeRecord = component && component.getAttributes ? component.getAttributes() : {};
  const href = String(attributeRecord.href || '').trim();
  const pageId = String(attributeRecord['data-db-link-page'] || '');
  const anchorId = String(attributeRecord['data-db-link-anchor'] || '');
  if (pageId) return buildRecord('page', href, { pageId, anchorId });
  if (/^mailto:/i.test(href)) return buildRecord('email', href, { address: href.slice(7).split('?')[0] });
  if (/^tel:/i.test(href)) return buildRecord('phone', href, { address: href.slice(4) });
  if (!href || href === '#') return buildRecord('none', href, {});
  const pageMatch = matchPageHref(editor, href);
  if (pageMatch) return buildRecord('page', href, pageMatch);
  if (href.charAt(0) === '#') {
    const selectedPage = editor.Pages && editor.Pages.getSelected ? editor.Pages.getSelected() : null;
    const selectedPageId = selectedPage && selectedPage.getId ? String(selectedPage.getId()) : '';
    return buildRecord('page', href, { pageId: selectedPageId, anchorId: href.slice(1) });
  }
  if (isUploadedFileSource(editor, href)) return buildRecord('file', href, { address: href });
  return buildRecord('url', href, { address: href });
};

export default readLinkRecord;
