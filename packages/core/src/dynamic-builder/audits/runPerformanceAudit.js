import checkDomNodeCount from './checkDomNodeCount.js';
import checkFetchPriorityUsage from './checkFetchPriorityUsage.js';
import checkIframeCount from './checkIframeCount.js';
import checkImageDimensionAttributes from './checkImageDimensionAttributes.js';
import checkLazyLoadingBelowFold from './checkLazyLoadingBelowFold.js';
import checkLazyMediaPresence from './checkLazyMediaPresence.js';
import checkNestingDepth from './checkNestingDepth.js';
import checkOversizedImages from './checkOversizedImages.js';
import getAuditContext from './getAuditContext.js';
import runAuditChecks from './runAuditChecks.js';

const runPerformanceAudit = (editor, moduleOptions) =>
  runAuditChecks(
    [
      checkOversizedImages,
      checkImageDimensionAttributes,
      checkLazyLoadingBelowFold,
      checkFetchPriorityUsage,
      checkDomNodeCount,
      checkNestingDepth,
      checkIframeCount,
      checkLazyMediaPresence,
    ],
    getAuditContext(editor, moduleOptions),
  );

export default runPerformanceAudit;
