import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const swatchLabels = { brand: 'Brand', accent: 'Accent', surfaceAlt: 'Tinted background', text: 'Text' };

const buildDesignKitCardMarkup = (kitRecord, activeKitId, previewTokens) => {
  const colorRecord = (previewTokens && previewTokens.color) || {};
  const fontRecord = (previewTokens && previewTokens.font) || {};
  const readColor = (colorName) => escapeHtmlText(colorRecord[colorName] || '');
  const swatchesMarkup = Object.keys(swatchLabels)
    .map((colorName) => {
      const swatchTitle = `${swatchLabels[colorName]} ${readColor(colorName)}`;
      return [
        `<span class="gjs-db-kit-swatch" role="img" title="${swatchTitle}" aria-label="${swatchTitle}"`,
        ` style="background-color:${readColor(colorName)}"></span>`,
      ].join('');
    })
    .join('');
  const fontPairText = (kitRecord.fontFamilies || []).join(' + ') || 'System fonts';
  const safeName = escapeHtmlText(kitRecord.kitName);
  const safeId = escapeHtmlText(kitRecord.kitId);
  const isActiveKit = !!activeKitId && activeKitId === kitRecord.kitId;
  const currentBadgeMarkup = isActiveKit ? '<span class="gjs-db-badge gjs-db-badge-success">Current</span>' : '';
  const cardLabel = `${safeName} kit. ${escapeHtmlText(kitRecord.kitHint || '')} Fonts: ${escapeHtmlText(fontPairText)}.`;
  const removeMarkup = kitRecord.isCustom
    ? [
        `<button type="button" class="gjs-db-kit-remove" data-db-kit-remove="${safeId}"`,
        ` title="Remove this kit" aria-label="Remove kit ${safeName}">${getIconMarkup('close', { size: 14 })}</button>`,
      ].join('')
    : '';
  return [
    '<div class="gjs-db-kit-item">',
    `<button type="button" class="gjs-db-kit-card" data-db-kit-id="${safeId}"`,
    ` aria-pressed="${isActiveKit ? 'true' : 'false'}" aria-label="${cardLabel}">`,
    '<span class="gjs-db-kit-mock" aria-hidden="true"',
    ` style="background-color:${readColor('surface')};color:${readColor('text')};border-color:${readColor('line')}">`,
    `<span class="gjs-db-kit-mock-title" style="font-family:${escapeHtmlText(fontRecord.display || '')}">Aa</span>`,
    `<span class="gjs-db-kit-mock-text" style="font-family:${escapeHtmlText(fontRecord.body || '')};`,
    `color:${readColor('textMuted')}">Body text</span>`,
    `<span class="gjs-db-kit-mock-button" style="background-color:${readColor('brand')};`,
    `color:${readColor('brandContrast')}">Button</span>`,
    '</span>',
    '<span class="gjs-db-kit-body">',
    `<span class="gjs-db-kit-name">${safeName}${currentBadgeMarkup}</span>`,
    `<span class="gjs-db-block-hint">${escapeHtmlText(kitRecord.kitHint || '')}</span>`,
    `<span class="gjs-db-kit-fonts">${escapeHtmlText(fontPairText)}</span>`,
    '</span>',
    `<span class="gjs-db-kit-swatches">${swatchesMarkup}</span>`,
    '</button>',
    removeMarkup,
    '</div>',
  ].join('');
};

export default buildDesignKitCardMarkup;
