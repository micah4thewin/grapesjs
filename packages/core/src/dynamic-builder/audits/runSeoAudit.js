import checkAltCoverage from './checkAltCoverage.js';
import checkCanonicalBase from './checkCanonicalBase.js';
import checkOgImage from './checkOgImage.js';
import checkSchemaPageType from './checkSchemaPageType.js';
import checkSeoDescription from './checkSeoDescription.js';
import checkSeoTitle from './checkSeoTitle.js';
import checkSingleH1Presence from './checkSingleH1Presence.js';
import checkSitemapSlugs from './checkSitemapSlugs.js';
import checkSlugFormat from './checkSlugFormat.js';
import checkWordCount from './checkWordCount.js';
import getAuditContext from './getAuditContext.js';
import runAuditChecks from './runAuditChecks.js';

const runSeoAudit = (editor, moduleOptions, auditContext) => {
  const resolvedContext = auditContext || getAuditContext(editor, moduleOptions);
  const siteWideChecks = resolvedContext.includeSiteWideChecks === false ? [] : [checkCanonicalBase, checkSitemapSlugs];
  return runAuditChecks(
    [
      checkSeoTitle,
      checkSeoDescription,
      checkSlugFormat,
      checkSingleH1Presence,
      checkOgImage,
      checkAltCoverage,
      checkWordCount,
      checkSchemaPageType,
      ...siteWideChecks,
    ],
    resolvedContext,
  );
};

export default runSeoAudit;
