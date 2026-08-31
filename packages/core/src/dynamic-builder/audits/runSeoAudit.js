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

const runSeoAudit = (editor, moduleOptions) =>
  runAuditChecks(
    [
      checkSeoTitle,
      checkSeoDescription,
      checkCanonicalBase,
      checkSlugFormat,
      checkSingleH1Presence,
      checkOgImage,
      checkAltCoverage,
      checkWordCount,
      checkSchemaPageType,
      checkSitemapSlugs,
    ],
    getAuditContext(editor, moduleOptions),
  );

export default runSeoAudit;
