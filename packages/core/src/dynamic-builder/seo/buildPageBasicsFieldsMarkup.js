import buildCharacterCounterBadgeMarkup from './buildCharacterCounterBadgeMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';

const buildPageBasicsFieldsMarkup = (pageSeoRecord, pageContext) =>
  [
    buildSeoTextFieldMarkup(
      'title',
      'Page title',
      'Headline shown in search results and browser tabs. Aim for 30 to 60 characters; the site name is added after it.',
      pageSeoRecord.title,
      buildCharacterCounterBadgeMarkup('title', 30, 60),
    ),
    buildSeoTextareaFieldMarkup(
      'description',
      'Meta description',
      'Summary shown under the title in search results. Aim for 50 to 160 characters.',
      pageSeoRecord.description,
      buildCharacterCounterBadgeMarkup('description', 50, 160),
    ),
    buildSeoTextFieldMarkup(
      'slug',
      'URL slug',
      pageContext.isMainPage
        ? 'The home page is always published at the site root, so it has no slug.'
        : 'The last part of the page address, for example about-us. Cleaned up when you leave the field.',
      pageContext.isMainPage ? '' : pageSeoRecord.slug,
      '',
      { isDisabled: pageContext.isMainPage },
    ),
    buildSeoTextFieldMarkup(
      'canonical',
      'Canonical URL override',
      'Only needed when this page is a copy of another address. Leave empty to build the address from the site address and slug.',
      pageSeoRecord.canonical,
    ),
  ].join('');

export default buildPageBasicsFieldsMarkup;
