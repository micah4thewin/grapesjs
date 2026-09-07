import escapeHtmlText from '../support/escapeHtmlText.js';
import getSharePreviewPlatformRecords from './getSharePreviewPlatformRecords.js';

const buildSharePreviewSwitcherMarkup = (activePlatformId) =>
  [
    '<div class="gjs-db-seo-platform-switch" role="group" aria-label="Share preview platform">',
    ...getSharePreviewPlatformRecords().map((platformRecord) => {
      const isActive = platformRecord.platformId === activePlatformId;
      return (
        '<button type="button" class="gjs-db-button gjs-db-seo-platform-button' +
        (isActive ? ' gjs-db-button-primary' : '') +
        '" data-db-seo-platform="' +
        platformRecord.platformId +
        '" aria-pressed="' +
        (isActive ? 'true' : 'false') +
        '">' +
        escapeHtmlText(platformRecord.label) +
        '</button>'
      );
    }),
    '</div>',
  ].join('');

export default buildSharePreviewSwitcherMarkup;
