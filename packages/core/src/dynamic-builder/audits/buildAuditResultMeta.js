import getAuditContext from './getAuditContext.js';

const buildAuditResultMeta = (editor, scope, pageCount) => {
  const pageContext = getAuditContext(editor, {});
  return { scope, pageCount, pageId: pageContext.pageId, pageName: pageContext.pageName };
};

export default buildAuditResultMeta;
