const buildRobotsMetaContent = (pageSeoRecord) =>
  ['noindex', 'nofollow', 'noarchive', 'nosnippet'].filter((robotsFlag) => pageSeoRecord[robotsFlag]).join(', ');

export default buildRobotsMetaContent;
