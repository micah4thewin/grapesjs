import buildNavbarLinkItemMarkup from './buildNavbarLinkItemMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildNavbarInnerMarkup = (interactiveTextDefaults) => {
  const navbarLinksMarkup = interactiveTextDefaults.navbarLinkLabels
    .map((linkLabelText, linkIndex) => buildNavbarLinkItemMarkup(linkLabelText, linkIndex === 0 ? '#' : ''))
    .join('');
  return [
    '<nav class="db-navbar-nav" aria-label="Main">',
    `<a class="db-navbar-brand" href="#">${escapeHtmlText(interactiveTextDefaults.navbarBrandText)}</a>`,
    '<button type="button" class="db-navbar-burger" data-db-navbar-toggle="true" aria-expanded="false">',
    `<span class="db-visually-hidden">${escapeHtmlText(interactiveTextDefaults.navbarToggleLabel)}</span>`,
    '<span class="db-navbar-burger-bars" aria-hidden="true"><span></span><span></span><span></span></span>',
    '</button>',
    '<div class="db-navbar-panel" data-db-navbar-panel="true">',
    `<ul class="db-navbar-links" data-db-navbar-menu="true">${navbarLinksMarkup}</ul>`,
    '<a class="db-navbar-cta" data-db-navbar-cta="true" href="#contact">Get in touch</a>',
    '</div>',
    '<span class="db-navbar-scrim" data-db-navbar-scrim="true" aria-hidden="true"></span>',
    '</nav>',
  ].join('');
};

export default buildNavbarInnerMarkup;
