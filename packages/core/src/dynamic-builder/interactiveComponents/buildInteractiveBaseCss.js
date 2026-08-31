import buildAccordionInteractiveCss from './buildAccordionInteractiveCss.js';
import buildAnnouncementInteractiveCss from './buildAnnouncementInteractiveCss.js';
import buildBreadcrumbInteractiveCss from './buildBreadcrumbInteractiveCss.js';
import buildCountdownInteractiveCss from './buildCountdownInteractiveCss.js';
import buildInteractiveSharedCss from './buildInteractiveSharedCss.js';
import buildNavbarInteractiveCss from './buildNavbarInteractiveCss.js';
import buildSocialLinksInteractiveCss from './buildSocialLinksInteractiveCss.js';
import buildTabsInteractiveCss from './buildTabsInteractiveCss.js';

const buildInteractiveBaseCss = () =>
  [
    buildInteractiveSharedCss(),
    buildAccordionInteractiveCss(),
    buildTabsInteractiveCss(),
    buildCountdownInteractiveCss(),
    buildNavbarInteractiveCss(),
    buildBreadcrumbInteractiveCss(),
    buildSocialLinksInteractiveCss(),
    buildAnnouncementInteractiveCss(),
  ]
    .map((cssText) => cssText.trim())
    .join('\n');

export default buildInteractiveBaseCss;
