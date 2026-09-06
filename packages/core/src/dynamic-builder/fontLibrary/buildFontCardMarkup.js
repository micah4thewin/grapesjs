import escapeHtmlText from '../support/escapeHtmlText.js';

const buildFontCardMarkup = (fontRecord, roleName, isActive) => {
  const safeFamily = escapeHtmlText(fontRecord.family);
  const activeClass = isActive ? ' gjs-db-font-card-active' : '';
  return [
    `<button type="button" class="gjs-db-font-card${activeClass}" data-db-font-choice="${safeFamily}" data-db-font-role="${roleName}" data-db-font-category="${fontRecord.category}">`,
    `<span class="gjs-db-font-sample" style="font-family:'${safeFamily}', sans-serif">${roleName === 'display' ? 'Aa Bold headline' : 'Aa The quick brown fox jumps'}</span>`,
    `<span class="gjs-db-font-name">${safeFamily}<em>${escapeHtmlText(fontRecord.hint)}</em></span>`,
    '</button>',
  ].join('');
};

export default buildFontCardMarkup;
