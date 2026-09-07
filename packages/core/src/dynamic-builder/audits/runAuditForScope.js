import createFindingRecord from './createFindingRecord.js';
import getAuditContext from './getAuditContext.js';
import stampFindingsWithPage from './stampFindingsWithPage.js';

const buildCoverageNote = (auditContext) =>
  createFindingRecord(
    'info',
    'Coverage',
    'Layout checks such as contrast, tap targets and labels only ran on the open page "' + auditContext.pageName + '".',
    'Open the other pages and run this check again to cover their layout.',
    { pageId: auditContext.pageId, pageName: auditContext.pageName },
  );

const runAuditForScope = (editor, moduleOptions, auditDefinition, auditRunner, scope) => {
  const pagesModule = editor.Pages;
  const allPages = scope === 'site' && pagesModule && pagesModule.getAll ? pagesModule.getAll() : [];
  if (allPages.length < 2) {
    const singleContext = getAuditContext(editor, moduleOptions);
    return {
      findings: stampFindingsWithPage(auditRunner(editor, moduleOptions, singleContext), singleContext),
      pageCount: 1,
    };
  }
  const collectedFindings = [];
  let selectedContext = null;
  allPages.forEach((page, pageIndex) => {
    const pageContext = getAuditContext(editor, moduleOptions, page);
    pageContext.includeSiteWideChecks = pageIndex === 0;
    if (pageContext.canvasRoot) selectedContext = pageContext;
    collectedFindings.push(...stampFindingsWithPage(auditRunner(editor, moduleOptions, pageContext), pageContext));
  });
  if (auditDefinition.hasLayoutChecks && selectedContext) collectedFindings.push(buildCoverageNote(selectedContext));
  return { findings: collectedFindings, pageCount: allPages.length };
};

export default runAuditForScope;
