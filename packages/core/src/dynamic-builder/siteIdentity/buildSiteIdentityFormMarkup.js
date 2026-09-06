import buildPalettePreviewMarkup from './buildPalettePreviewMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import generateBrandPalette from './generateBrandPalette.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getPaletteMoodRecords from './getPaletteMoodRecords.js';

const buildSiteIdentityFormMarkup = (identityRecord) => {
  const moodChips = getPaletteMoodRecords()
    .map((moodRecord) => {
      const activeClass = moodRecord.moodId === identityRecord.moodId ? ' gjs-db-chip-active' : '';
      return `<button type="button" class="gjs-db-chip${activeClass}" data-db-identity-mood="${moodRecord.moodId}">${escapeHtmlText(moodRecord.moodLabel)}</button>`;
    })
    .join('');
  const fieldMarkup = (name, label, placeholder, value) =>
    `<label class="gjs-db-field-label" for="db-identity-${name}">${label}</label><input id="db-identity-${name}" class="gjs-db-field-input" name="${name}" placeholder="${placeholder}" value="${escapeHtmlText(value)}">`;
  return [
    '<form class="gjs-db-form gjs-db-identity" data-db-identity-form>',
    '<p class="gjs-db-muted">Tell the builder who the site is for. Every new block picks up the name, and the palette flows into every colour on the site.</p>',
    '<div class="gjs-db-identity-grid">',
    fieldMarkup('siteName', 'Site name', 'Acme Studio', identityRecord.siteName),
    fieldMarkup('tagline', 'Tagline', 'Design that earns attention', identityRecord.tagline),
    '</div>',
    '<label class="gjs-db-field-label" for="db-identity-description">Short description</label>',
    `<textarea id="db-identity-description" class="gjs-db-field-input" name="description" rows="2" placeholder="One or two sentences visitors and search engines see first">${escapeHtmlText(identityRecord.description)}</textarea>`,
    '<div class="gjs-db-identity-logo-row">',
    `<span class="gjs-db-identity-logo" data-db-identity-logo>${identityRecord.logoSrc ? `<img src="${escapeHtmlText(identityRecord.logoSrc)}" alt="Logo preview">` : getIconMarkup('image', { size: 22 })}</span>`,
    `<input type="hidden" name="logoSrc" value="${escapeHtmlText(identityRecord.logoSrc)}" data-db-identity-logo-src>`,
    '<button type="button" class="gjs-db-button" data-db-identity-pick-logo>Choose logo</button>',
    '<button type="button" class="gjs-db-button" data-db-identity-extract>Palette from logo</button>',
    '</div>',
    '<div class="gjs-db-identity-color-row">',
    '<label class="gjs-db-field-label" for="db-identity-brand">Brand colour</label>',
    `<input id="db-identity-brand" type="color" name="brandColor" value="${escapeHtmlText(identityRecord.brandColor)}" data-db-identity-brand>`,
    `<div class="gjs-db-chip-row" data-db-identity-moods>${moodChips}</div>`,
    '</div>',
    `<div data-db-identity-palette>${buildPalettePreviewMarkup(generateBrandPalette(identityRecord.brandColor, identityRecord.moodId))}</div>`,
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary">Apply to site</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildSiteIdentityFormMarkup;
