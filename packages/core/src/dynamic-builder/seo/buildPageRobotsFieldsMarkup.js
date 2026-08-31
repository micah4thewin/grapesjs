import buildSeoCheckboxFieldMarkup from './buildSeoCheckboxFieldMarkup.js';

const buildPageRobotsFieldsMarkup = (pageSeoRecord) =>
  [
    '<div class="gjs-db-section-title">Robots directives</div>',
    buildSeoCheckboxFieldMarkup(
      'noindex',
      'Hide from search results (noindex)',
      'Asks search engines not to list this page in results.',
      pageSeoRecord.noindex,
    ),
    buildSeoCheckboxFieldMarkup(
      'nofollow',
      'Do not follow links (nofollow)',
      'Asks search engines not to follow links found on this page.',
      pageSeoRecord.nofollow,
    ),
    buildSeoCheckboxFieldMarkup(
      'noarchive',
      'No cached copies (noarchive)',
      'Asks search engines not to keep a cached copy of this page.',
      pageSeoRecord.noarchive,
    ),
    buildSeoCheckboxFieldMarkup(
      'nosnippet',
      'No text snippets (nosnippet)',
      'Asks search engines not to show text snippets from this page.',
      pageSeoRecord.nosnippet,
    ),
  ].join('');

export default buildPageRobotsFieldsMarkup;
