import findComponentsByClassName from './findComponentsByClassName.js';
import lockInteractiveInnerParts from './lockInteractiveInnerParts.js';
import readComponentTextContent from './readComponentTextContent.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const syncNavbarLogo = (navbarComponent) => {
  if (!navbarComponent || typeof navbarComponent.getAttributes !== 'function') return;
  const brandComponent = findComponentsByClassName(navbarComponent, 'db-navbar-brand')[0];
  if (!brandComponent) return;
  const logoSource = sanitizeUrlValue((navbarComponent.getAttributes() || {})['data-db-logo']);
  const existingLogo = findComponentsByClassName(brandComponent, 'db-navbar-logo')[0];
  if (!logoSource) {
    if (existingLogo) existingLogo.remove();
    return;
  }
  const altText = (readComponentTextContent(brandComponent) || 'Home') + ' logo';
  if (existingLogo) {
    const currentAttributes = existingLogo.getAttributes() || {};
    if (currentAttributes.src !== logoSource || currentAttributes.alt !== altText) {
      existingLogo.addAttributes({ src: logoSource, alt: altText });
    }
    return;
  }
  brandComponent.append(
    {
      type: 'image',
      tagName: 'img',
      classes: ['db-navbar-logo'],
      attributes: { src: logoSource, alt: altText, loading: 'eager' },
    },
    { at: 0 },
  );
  lockInteractiveInnerParts(navbarComponent);
};

export default syncNavbarLogo;
