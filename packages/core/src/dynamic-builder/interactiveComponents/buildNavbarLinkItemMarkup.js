import escapeHtmlText from '../support/escapeHtmlText.js';
import toSlugText from '../support/toSlugText.js';

const buildNavbarLinkItemMarkup = (linkLabelText, linkHref) => {
  const resolvedHref = linkHref || '#' + toSlugText(linkLabelText);
  return [
    '<li class="db-navbar-item" data-db-navbar-item="true">',
    `<a class="db-navbar-link" href="${escapeHtmlText(resolvedHref)}">${escapeHtmlText(linkLabelText)}</a>`,
    '</li>',
  ].join('');
};

export default buildNavbarLinkItemMarkup;
