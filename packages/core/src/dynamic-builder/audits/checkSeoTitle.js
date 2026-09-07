import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';
import resolveSeoTitleText from '../seo/resolveSeoTitleText.js';

const checkSeoTitle = (auditContext) => {
  const { pageSeo, siteSeo } = resolveSeoRecords(auditContext);
  const customTitle = String(pageSeo.title || '').trim();
  const renderedTitle = resolveSeoTitleText(siteSeo, pageSeo, auditContext.pageName);
  const findings = [];
  const titleDetails = { fixId: 'seo-field:title' };
  if (!customTitle) {
    findings.push(
      createFindingRecord(
        'warning',
        'Metadata',
        'No custom page title is set; search results will show "' + renderedTitle + '".',
        'Write a title of roughly 30 to 60 characters that says what this page offers.',
        titleDetails,
      ),
    );
  }
  if (renderedTitle.length > 60) {
    findings.push(
      createFindingRecord(
        'warning',
        'Metadata',
        'The title shown in search results is ' + renderedTitle.length + ' characters: "' + renderedTitle + '".',
        'Keep the full title, including the site name, under 60 characters so it is not cut off.',
        titleDetails,
      ),
    );
  } else if (customTitle && renderedTitle.length < 10) {
    findings.push(
      createFindingRecord(
        'warning',
        'Metadata',
        'The page title is only ' + renderedTitle.length + ' characters long.',
        'Expand the title so it describes the page; aim for 30 to 60 characters.',
        titleDetails,
      ),
    );
  }
  return findings;
};

export default checkSeoTitle;
