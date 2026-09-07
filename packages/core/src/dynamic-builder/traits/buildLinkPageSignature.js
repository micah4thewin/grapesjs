import collectPageAnchorRecords from './collectPageAnchorRecords.js';
import listSitePageRecords from './listSitePageRecords.js';

const buildLinkPageSignature = (editor) =>
  listSitePageRecords(editor)
    .map((pageRecord) => {
      const anchorKeys = collectPageAnchorRecords(pageRecord.page).map((anchorRecord) => anchorRecord.anchorId);
      return `${pageRecord.pageId}:${pageRecord.label}:${pageRecord.fileName}:${anchorKeys.join(',')}`;
    })
    .join('|');

export default buildLinkPageSignature;
