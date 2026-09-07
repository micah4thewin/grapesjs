import buildNavbarLinkItemMarkup from './buildNavbarLinkItemMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildNavbarInnerMarkup = (interactiveTextDefaults) => {
  const navbarLinksMarkup = interactiveTextDefaults.navbarLinkLabels
    .map((linkLabelText, linkIndex) => buildNavbarLinkItemMarkup(linkLabelText, linkIndex === 0 ? 'index.html' : ''))
    .join('');
  return [
    '<nav class="db-navbar-nav" aria-label="Main">',
    '<a class="db-navbar-brand" href="index.html">',
    `<span class="db-navbar-brand-text">${escapeHtmlText(interactiveTextDefaults.navbarBrandText)}</span>`,
    '</a>',
    '<button type="button" class="db-navbar-burger" data-db-navbar-toggle="true" aria-expanded="false">',
    `<span class="db-visually-hidden">${escapeHtmlText(interactiveTextDefaults.navbarToggleLabel)}</span>`,
    '<span class="db-navbar-burger-bars" aria-hidden="true"><span></span><span></span><span></span></span>',
    '</button>',
    '<div class="db-navbar-panel" data-db-navbar-panel="true">',
    '<button type="button" class="db-navbar-close" data-db-navbar-close="true">',
    `<span class="db-visually-hidden">${escapeHtmlText(interactiveTextDefaults.navbarCloseLabel)}</span>`,
    getIconMarkup('close', { size: 20 }),
    '</button>',
    `<ul class="db-navbar-links" data-db-navbar-menu="true">${navbarLinksMarkup}</ul>`,
    `<a class="db-navbar-cta" data-db-navbar-cta="true" href="#contact">${escapeHtmlText(interactiveTextDefaults.navbarCtaLabel)}</a>`,
    '</div>',
    '<span class="db-navbar-scrim" data-db-navbar-scrim="true" aria-hidden="true"></span>',
    '</nav>',
  ].join('');
};

export default buildNavbarInnerMarkup;
