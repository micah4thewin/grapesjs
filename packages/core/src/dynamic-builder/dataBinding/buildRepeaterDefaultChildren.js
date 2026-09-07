import buildRepeaterItemInnerMarkup from './buildRepeaterItemInnerMarkup.js';

const buildRepeaterDefaultChildren = () =>
  [
    '<div data-db-type="repeater-item" data-db-repeater-item="true" class="db-repeater-item">',
    buildRepeaterItemInnerMarkup(),
    '</div>',
  ].join('');

export default buildRepeaterDefaultChildren;
