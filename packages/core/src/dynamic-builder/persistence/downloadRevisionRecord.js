import buildAutoRevisionLabel from './buildAutoRevisionLabel.js';
import downloadTextFile from '../support/downloadTextFile.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import toSlugText from '../support/toSlugText.js';

const buildCompactTimestamp = (savedAtText) => {
  const parsedTime = new Date(Date.parse(savedAtText || '') || Date.now());
  const padTwoDigits = (numberValue) => String(numberValue).padStart(2, '0');
  return [
    parsedTime.getFullYear(),
    padTwoDigits(parsedTime.getMonth() + 1),
    padTwoDigits(parsedTime.getDate()),
    '-',
    padTwoDigits(parsedTime.getHours()),
    padTwoDigits(parsedTime.getMinutes()),
  ].join('');
};

const downloadRevisionRecord = (editor, revisionRecord) => {
  const siteSeoRecord = getSiteMetaRecord(editor).seo || {};
  const siteSlug = toSlugText(siteSeoRecord.siteName) || 'site';
  const labelText = String(revisionRecord.label || '');
  const isCustomLabel = labelText && labelText !== buildAutoRevisionLabel();
  const labelSuffix = isCustomLabel ? '-' + toSlugText(labelText).slice(0, 40) : '';
  const fileName = siteSlug + '-revision-' + buildCompactTimestamp(revisionRecord.savedAt) + labelSuffix + '.json';
  downloadTextFile(fileName.replace(/-+/g, '-'), 'application/json', JSON.stringify(revisionRecord, null, 2));
  return fileName;
};

export default downloadRevisionRecord;
