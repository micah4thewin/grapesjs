import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import listSeoHealthChecks from './listSeoHealthChecks.js';
import resolveSeoPageContext from './resolveSeoPageContext.js';

const computeSeoHealthReport = (editor, page) => {
  const pageContext = resolveSeoPageContext(editor, page);
  const checkContext = {
    siteSeo: getSiteSeoRecord(editor),
    pageSeo: getPageSeoRecord(editor, pageContext.page),
    pageName: pageContext.pageName,
    isMainPage: pageContext.isMainPage,
  };
  const findings = [];
  let lostPoints = 0;
  listSeoHealthChecks().forEach((healthCheck) => {
    const messageText = healthCheck.run(checkContext);
    if (!messageText) return;
    lostPoints += healthCheck.weight;
    findings.push({ checkId: healthCheck.checkId, message: messageText, weight: healthCheck.weight });
  });
  const score = Math.max(0, 100 - lostPoints);
  const level = score >= 90 ? 'good' : score >= 60 ? 'fair' : 'poor';
  const pageId = pageContext.page && pageContext.page.getId ? String(pageContext.page.getId()) : '';
  return { score, level, findings, pageId, pageName: pageContext.pageName };
};

export default computeSeoHealthReport;
