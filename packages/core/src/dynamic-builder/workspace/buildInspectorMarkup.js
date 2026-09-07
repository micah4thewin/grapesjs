import getIconMarkup from '../support/getIconMarkup.js';
import getInspectorGroupRecords from './getInspectorGroupRecords.js';

const buildInspectorMarkup = () => {
  const groupMarkup = getInspectorGroupRecords()
    .map((groupRecord) =>
      [
        `<section class="gjs-db-inspector-group" data-db-inspector-group="${groupRecord.id}" data-db-open="1">`,
        `<button type="button" class="gjs-db-group-head" data-db-group-toggle="${groupRecord.id}"`,
        ' aria-expanded="true">',
        `<span class="gjs-db-group-caret">${getIconMarkup('chevronRight', { size: 13 })}</span>`,
        `<span>${groupRecord.label}</span>`,
        '</button>',
        `<div class="gjs-db-group-body" data-db-inspector-slot="${groupRecord.id}"></div>`,
        '</section>',
      ].join(''),
    )
    .join('');
  return [
    '<aside class="gjs-db-ws-inspector" data-db-inspector data-db-has-selection="0" aria-label="Inspector">',
    '<div class="gjs-db-inspector-head">',
    '<span class="gjs-db-inspector-eyebrow" data-db-inspector-eyebrow>Nothing selected</span>',
    '<h2 class="gjs-db-inspector-title" data-db-inspector-title>Pick something on the page</h2>',
    '</div>',
    '<div class="gjs-db-inspector-body">',
    '<p class="gjs-db-inspector-empty">Click any part of the page to change its settings and styling here.</p>',
    groupMarkup,
    '</div>',
    '</aside>',
  ].join('');
};

export default buildInspectorMarkup;
