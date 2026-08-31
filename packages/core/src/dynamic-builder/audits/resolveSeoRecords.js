import isPlainRecord from '../support/isPlainRecord.js';
import resolvePageSeoRecord from './resolvePageSeoRecord.js';

const resolveSeoRecords = (auditContext) => {
  const siteMeta = isPlainRecord(auditContext.siteMeta) ? auditContext.siteMeta : {};
  const pageMeta = isPlainRecord(auditContext.pageMeta) ? auditContext.pageMeta : {};
  const nestedSiteSeo = isPlainRecord(siteMeta.seo) ? siteMeta.seo : {};
  const nestedSiteSchema = isPlainRecord(siteMeta.schema) ? siteMeta.schema : {};
  const nestedPageSchema = isPlainRecord(pageMeta.schema) ? pageMeta.schema : {};
  return {
    siteSeo: { ...siteMeta, ...nestedSiteSeo },
    pageSeo: resolvePageSeoRecord(pageMeta),
    siteSchema: nestedSiteSchema,
    pageSchema: { ...pageMeta, ...nestedPageSchema },
  };
};

export default resolveSeoRecords;
