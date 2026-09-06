import escapeHtmlText from '../support/escapeHtmlText.js';
import getPhotoAspectRecords from './getPhotoAspectRecords.js';
import getPhotoFilterRecords from './getPhotoFilterRecords.js';

const buildPhotoControlMarkup = (editState) => {
  const slider = (name, label, min, max, step, value, unit) =>
    `<label class="gjs-db-photo-slider"><span>${label}<b data-db-photo-readout="${name}">${value}${unit}</b></span><input type="range" name="${name}" min="${min}" max="${max}" step="${step}" value="${value}" data-db-photo-control></label>`;
  const aspectChips = getPhotoAspectRecords()
    .map(
      (record) =>
        `<button type="button" class="gjs-db-chip${record.aspectId === editState.aspectId ? ' gjs-db-chip-active' : ''}" data-db-photo-aspect="${record.aspectId}">${escapeHtmlText(record.aspectLabel)}</button>`,
    )
    .join('');
  const filterChips = getPhotoFilterRecords()
    .map(
      (record) =>
        `<button type="button" class="gjs-db-chip${record.filterId === editState.filterId ? ' gjs-db-chip-active' : ''}" data-db-photo-filter="${record.filterId}">${escapeHtmlText(record.filterLabel)}</button>`,
    )
    .join('');
  return [
    '<div class="gjs-db-photo-controls">',
    '<h4 class="gjs-db-icon-group-title">Crop</h4>',
    `<div class="gjs-db-chip-row">${aspectChips}</div>`,
    '<div class="gjs-db-photo-actions">',
    '<button type="button" class="gjs-db-button" data-db-photo-rotate="-90">Rotate left</button>',
    '<button type="button" class="gjs-db-button" data-db-photo-rotate="90">Rotate right</button>',
    '<button type="button" class="gjs-db-button" data-db-photo-flip="horizontal">Flip</button>',
    '<button type="button" class="gjs-db-button" data-db-photo-flip="vertical">Flip vertical</button>',
    '</div>',
    slider('cropWidth', 'Zoom', 30, 100, 1, Math.round(editState.cropWidth * 100), '%'),
    slider('cropX', 'Pan left to right', 0, 100, 1, Math.round(editState.cropX * 100), '%'),
    slider('cropY', 'Pan up to down', 0, 100, 1, Math.round(editState.cropY * 100), '%'),
    '<h4 class="gjs-db-icon-group-title">Adjust</h4>',
    slider('brightness', 'Brightness', 40, 160, 1, editState.brightness, '%'),
    slider('contrast', 'Contrast', 40, 160, 1, editState.contrast, '%'),
    slider('saturation', 'Saturation', 0, 200, 1, editState.saturation, '%'),
    slider('blur', 'Soften', 0, 12, 0.5, editState.blur, 'px'),
    '<h4 class="gjs-db-icon-group-title">Look</h4>',
    `<div class="gjs-db-chip-row">${filterChips}</div>`,
    '<h4 class="gjs-db-icon-group-title">Optimise</h4>',
    slider('maxWidth', 'Max width', 320, 2560, 40, editState.maxWidth, 'px'),
    slider('quality', 'Quality', 30, 100, 1, editState.quality, '%'),
    '<label class="gjs-db-field-label" for="db-photo-format">Format</label>',
    '<select id="db-photo-format" class="gjs-db-field-input" name="format" data-db-photo-control>',
    `<option value="image/webp"${editState.format === 'image/webp' ? ' selected' : ''}>WebP (smallest)</option>`,
    `<option value="image/jpeg"${editState.format === 'image/jpeg' ? ' selected' : ''}>JPEG (photos)</option>`,
    `<option value="image/png"${editState.format === 'image/png' ? ' selected' : ''}>PNG (transparency)</option>`,
    '</select>',
    '</div>',
  ].join('');
};

export default buildPhotoControlMarkup;
