import getSiteSeoRecord from './getSiteSeoRecord.js';
import normalizeRobotsExtraLines from './normalizeRobotsExtraLines.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const buildRobotsTxtContent = (editor) => {
  const siteSeoRecord = getSiteSeoRecord(editor);
  const contentLines = ['User-agent: *', 'Allow: /'];
  normalizeRobotsExtraLines(siteSeoRecord.robotsExtra).forEach((extraLine) => contentLines.push(extraLine));
  const trimmedBase = trimCanonicalBaseUrl(siteSeoRecord.canonicalBase);
  if (trimmedBase) contentLines.push('Sitemap: ' + trimmedBase + '/sitemap.xml');
  return contentLines.join('\n') + '\n';
};

export default buildRobotsTxtContent;
