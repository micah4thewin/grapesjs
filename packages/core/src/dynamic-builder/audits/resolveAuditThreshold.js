import getDefaultAuditThresholds from './getDefaultAuditThresholds.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveAuditThreshold = (auditContext, thresholdName) => {
  const moduleOptions = auditContext && isPlainRecord(auditContext.moduleOptions) ? auditContext.moduleOptions : {};
  const configuredThresholds = isPlainRecord(moduleOptions.thresholds) ? moduleOptions.thresholds : {};
  const configuredValue = Number(configuredThresholds[thresholdName]);
  return Number.isFinite(configuredValue) ? configuredValue : getDefaultAuditThresholds()[thresholdName];
};

export default resolveAuditThreshold;
