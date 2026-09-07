import buildSeoImageFieldMarkup from './buildSeoImageFieldMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';
import normalizeRobotsExtraLines from './normalizeRobotsExtraLines.js';

const buildSiteSeoSharingFieldsMarkup = (siteSeoRecord) =>
  [
    buildSeoImageFieldMarkup(
      'favicon',
      'Favicon',
      'Small icon shown in browser tabs and bookmarks. Square images of at least 32 by 32 pixels work best.',
      siteSeoRecord.favicon,
    ),
    buildSeoImageFieldMarkup(
      'defaultOgImage',
      'Default share image',
      'Shown when a page is shared and has no share image of its own. Use a hosted image of 1200 by 630 pixels.',
      siteSeoRecord.defaultOgImage,
    ),
    buildSeoTextFieldMarkup(
      'ogSiteName',
      'Site name on shared links',
      'Leave empty to reuse the site name.',
      siteSeoRecord.ogSiteName,
    ),
    buildSeoTextFieldMarkup(
      'twitterHandle',
      'X (Twitter) account',
      'Account credited on shared cards, for example @acme. The @ is added for you.',
      siteSeoRecord.twitterHandle,
      '',
      { placeholder: '@acme' },
    ),
    buildSeoTextareaFieldMarkup(
      'robotsExtra',
      'Extra robots.txt lines',
      'One rule per line, for example Disallow: /drafts. Added to the generated robots.txt.',
      normalizeRobotsExtraLines(siteSeoRecord.robotsExtra).join('\n'),
    ),
  ].join('');

export default buildSiteSeoSharingFieldsMarkup;
