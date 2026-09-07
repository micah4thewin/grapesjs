import buildCustomFontFormMarkup from './buildCustomFontFormMarkup.js';
import buildCustomIconFormMarkup from './buildCustomIconFormMarkup.js';

const buildTabButtonMarkup = (tabId, tabLabel, isActive) =>
  [
    '<button type="button" role="tab" class="gjs-db-custom-tab"',
    ` id="db-custom-tab-${tabId}" aria-controls="db-custom-panel-${tabId}"`,
    ` aria-selected="${isActive ? 'true' : 'false'}" tabindex="${isActive ? '0' : '-1'}"`,
    ` data-db-custom-tab="${tabId}">${tabLabel}</button>`,
  ].join('');

const buildPanelMarkup = (tabId, tabLabel, formMarkup, isActive) =>
  [
    `<section id="db-custom-panel-${tabId}" role="tabpanel" aria-labelledby="db-custom-tab-${tabId}"`,
    ` data-db-custom-panel="${tabId}"${isActive ? '' : ' hidden'}>`,
    formMarkup,
    `<h4 class="gjs-db-icon-group-title">Your ${tabLabel.toLowerCase()}</h4>`,
    `<div class="gjs-db-custom-list" data-db-custom-list="${tabId}">`,
    '<p class="gjs-db-muted">Loading what you have added...</p>',
    '</div>',
    '</section>',
  ].join('');

const buildCustomAssetsModalMarkup = (activeTabId) => {
  const isFontsActive = activeTabId !== 'icons';
  return [
    '<div class="gjs-db-form gjs-db-custom-assets">',
    '<p class="gjs-db-muted">',
    'Add the fonts and icons your brand already uses. They stay with this site and ship with the files you export.',
    '</p>',
    '<div class="gjs-db-custom-tabs" role="tablist" aria-label="Your uploads">',
    buildTabButtonMarkup('fonts', 'Fonts', isFontsActive),
    buildTabButtonMarkup('icons', 'Icons', !isFontsActive),
    '</div>',
    buildPanelMarkup('fonts', 'Fonts', buildCustomFontFormMarkup(), isFontsActive),
    buildPanelMarkup('icons', 'Icons', buildCustomIconFormMarkup(), !isFontsActive),
    '</div>',
  ].join('');
};

export default buildCustomAssetsModalMarkup;
