import runAccessibilityAudit from './runAccessibilityAudit.js';
import runPerformanceAudit from './runPerformanceAudit.js';
import runSeoAudit from './runSeoAudit.js';

const getAuditRunnerRecords = () => ({
  accessibility: runAccessibilityAudit,
  performance: runPerformanceAudit,
  seo: runSeoAudit,
});

export default getAuditRunnerRecords;
