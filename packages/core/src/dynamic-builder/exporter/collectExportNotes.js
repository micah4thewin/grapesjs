import countStrippedSlotScripts from './countStrippedSlotScripts.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import hasSiteAddress from './hasSiteAddress.js';
import listPageExportEntries from './listPageExportEntries.js';

const collectExportNotes = (editor) => {
  const exportNotes = [];
  if (!listPageExportEntries(editor).length) exportNotes.push('This site has no pages yet.');
  if (!hasSiteAddress(editor)) {
    exportNotes.push('sitemap.xml is left out until you set the site address in Site settings.');
  }
  const strippedCount = countStrippedSlotScripts(getSiteCustomCodeRecord(editor));
  if (strippedCount) {
    const countText = strippedCount === 1 ? '1 script' : strippedCount + ' scripts';
    exportNotes.push(countText + ' from Custom code will be left out because scripts are off.');
  }
  return exportNotes;
};

export default collectExportNotes;
