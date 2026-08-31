import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import toSlugText from '../support/toSlugText.js';

const buildNavbarInnerMarkup = (interactiveTextDefaults) => {
  const navbarLinksMarkup = interactiveTextDefaults.navbarLinkLabels
    .map(
      (linkLabelText, linkIndex) =>
        `<li><a href="${linkIndex === 0 ? '#' : '#' + toSlugText(linkLabelText)}">${escapeHtmlText(linkLabelText)}</a></li>`,
    )
    .join('');
  return (
    '<nav class="db-navbar-nav" aria-label="Main">' +
    `<a class="db-navbar-brand" href="#">${escapeHtmlText(interactiveTextDefaults.navbarBrandText)}</a>` +
    '<button type="button" class="db-navbar-burger" data-db-navbar-toggle="true" aria-expanded="false">' +
    `<span class="db-visually-hidden">${escapeHtmlText(interactiveTextDefaults.navbarToggleLabel)}</span>` +
    '<span class="db-navbar-burger-icon">' +
    getIconMarkup('menu', { size: 20 }) +
    getIconMarkup('close', { size: 20 }) +
    '</span>' +
    '</button>' +
    `<ul class="db-navbar-links" data-db-navbar-menu="true">${navbarLinksMarkup}</ul>` +
    '</nav>'
  );
};

export default buildNavbarInnerMarkup;
