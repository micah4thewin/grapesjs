import computeSeoHealthReport from './computeSeoHealthReport.js';
import updateSeoHealthChip from './updateSeoHealthChip.js';

const runSeoHealthCheck = (editor, page) => {
  const healthReport = computeSeoHealthReport(editor, page);
  editor.getModel().set('dbSeoHealth', healthReport);
  updateSeoHealthChip(editor, healthReport);
  editor.trigger('db:seo-health:update', healthReport);
  return healthReport;
};

export default runSeoHealthCheck;
