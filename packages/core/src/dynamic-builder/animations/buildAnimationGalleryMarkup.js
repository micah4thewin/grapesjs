import escapeHtmlText from '../support/escapeHtmlText.js';
import getAnimationEffectRecords from './getAnimationEffectRecords.js';

const staggerStepOptions = [
  { id: '80', label: '80 ms apart' },
  { id: '120', label: '120 ms apart' },
  { id: '200', label: '200 ms apart' },
];

const buildTileMarkup = (effectRecord, currentEffect) =>
  [
    '<li>',
    '<button type="button" class="gjs-db-aos-tile" data-db-aos-effect="' + escapeHtmlText(effectRecord.id) + '"',
    ' aria-pressed="' + (effectRecord.id === currentEffect ? 'true' : 'false') + '">',
    '<span class="gjs-db-aos-stage" aria-hidden="true">',
    '<span class="gjs-db-aos-demo" data-db-aos-demo="' + escapeHtmlText(effectRecord.id) + '"></span>',
    '</span>',
    '<span>' + escapeHtmlText(effectRecord.label) + '</span>',
    '</button>',
    '</li>',
  ].join('');

const buildAnimationGalleryMarkup = (galleryState) => {
  const tilesMarkup = getAnimationEffectRecords()
    .map((effectRecord) => buildTileMarkup(effectRecord, galleryState.effect))
    .join('');
  const stepOptionsMarkup = staggerStepOptions
    .map(
      (optionRecord) =>
        '<option value="' +
        optionRecord.id +
        '"' +
        (optionRecord.id === galleryState.staggerStep ? ' selected' : '') +
        '>' +
        optionRecord.label +
        '</option>',
    )
    .join('');
  return [
    '<form class="gjs-db-form gjs-db-aos-gallery-form">',
    '<p class="gjs-db-aos-gallery-intro">Hover an effect to see it move, then click to apply it to <strong>' +
      escapeHtmlText(galleryState.componentLabel) +
      '</strong>. It plays when the element scrolls into view.</p>',
    '<ul class="gjs-db-aos-gallery">' + tilesMarkup + '</ul>',
    galleryState.childCount > 1
      ? '<label class="gjs-db-aos-stagger-row">' +
        '<input type="checkbox" data-db-aos-stagger-toggle' +
        (galleryState.staggerStep !== '0' ? ' checked' : '') +
        '>' +
        '<span>Animate the ' +
        galleryState.childCount +
        ' items inside one after another</span>' +
        '<select class="gjs-db-field-input" data-db-aos-stagger-step aria-label="Time between items">' +
        stepOptionsMarkup +
        '</select>' +
        '</label>'
      : '',
    '</form>',
  ].join('');
};

export default buildAnimationGalleryMarkup;
