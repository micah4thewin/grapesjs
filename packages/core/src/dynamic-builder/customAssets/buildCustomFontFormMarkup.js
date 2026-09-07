import getCustomFontWeightRecords from './getCustomFontWeightRecords.js';

const buildWeightOptionsMarkup = () =>
  getCustomFontWeightRecords()
    .map(
      (weightRecord) =>
        `<option value="${weightRecord.weight}"${weightRecord.weight === 400 ? ' selected' : ''}>${weightRecord.label}</option>`,
    )
    .join('');

const buildCustomFontFormMarkup = () =>
  [
    '<form class="gjs-db-form" data-db-custom-font-form>',
    '<div class="gjs-db-grid-two">',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-custom-font-family">Font name</label>',
    '<input id="db-custom-font-family" class="gjs-db-field-input" data-db-custom-font-family',
    ' placeholder="Brand Sans" autocomplete="off">',
    '<span class="gjs-db-field-help">The name you will see in the fonts list.</span>',
    '</div>',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-custom-font-file">Font file</label>',
    '<input id="db-custom-font-file" type="file" class="gjs-db-field-input" data-db-custom-font-file',
    ' accept=".woff2,.woff,.ttf,.otf,font/woff2,font/woff,font/ttf,font/otf">',
    '<span class="gjs-db-field-help">Files ending in woff2, woff, ttf or otf.</span>',
    '</div>',
    '</div>',
    '<div class="gjs-db-grid-two">',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-custom-font-weight">Weight of this file</label>',
    `<select id="db-custom-font-weight" class="gjs-db-field-input" data-db-custom-font-weight>${buildWeightOptionsMarkup()}</select>`,
    '</div>',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-custom-font-style">Style of this file</label>',
    '<select id="db-custom-font-style" class="gjs-db-field-input" data-db-custom-font-style>',
    '<option value="normal" selected>Upright</option><option value="italic">Italic</option>',
    '</select>',
    '</div>',
    '</div>',
    '<p class="gjs-db-field-help gjs-db-custom-warning">',
    'Only add a font you have the right to use. Buy a licence or pick a free one, and keep the licence file safe.',
    '</p>',
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-custom-font-add>Add font</button>',
    '</div>',
    '</form>',
  ].join('');

export default buildCustomFontFormMarkup;
