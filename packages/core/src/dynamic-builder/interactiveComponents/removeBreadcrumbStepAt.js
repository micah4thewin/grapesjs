import normalizeBreadcrumbTrail from './normalizeBreadcrumbTrail.js';
import readBreadcrumbStepRecords from './readBreadcrumbStepRecords.js';

const removeBreadcrumbStepAt = (breadcrumbComponent, stepIndex) => {
  const stepRecord = readBreadcrumbStepRecords(breadcrumbComponent)[stepIndex];
  if (!stepRecord) return false;
  stepRecord.itemComponent.remove();
  normalizeBreadcrumbTrail(breadcrumbComponent);
  return true;
};

export default removeBreadcrumbStepAt;
