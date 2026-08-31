import buildCharacterCounterBadgeMarkup from './buildCharacterCounterBadgeMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';

const buildPageBasicsFieldsMarkup = (pageSeoRecord) =>
  [
    buildSeoTextFieldMarkup(
      'title',
      'Page title',
      'Headline shown in search results and browser tabs. Keep it at 60 characters or fewer.',
      pageSeoRecord.title,
      buildCharacterCounterBadgeMarkup('title', 60),
    ),
    buildSeoTextareaFieldMarkup(
      'description',
      'Meta description',
      'Summary shown under the title in search results. Keep it at 160 characters or fewer.',
      pageSeoRecord.description,
      buildCharacterCounterBadgeMarkup('description', 160),
    ),
    buildSeoTextFieldMarkup(
      'slug',
      'URL slug',
      'Path segment for this page, for example about-us. Cleaned automatically when you leave the field.',
      pageSeoRecord.slug,
    ),
    buildSeoTextFieldMarkup(
      'canonical',
      'Canonical URL override',
      'Full URL search engines should treat as the original. Leave empty to build it from the base URL and slug.',
      pageSeoRecord.canonical,
    ),
  ].join('');

export default buildPageBasicsFieldsMarkup;
