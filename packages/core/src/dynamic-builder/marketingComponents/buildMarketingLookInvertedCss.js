import buildScopedCssRule from './buildScopedCssRule.js';
import getMarketingLookScopes from './getMarketingLookScopes.js';

const buildMarketingLookInvertedCss = () => {
  const lookScopes = getMarketingLookScopes();
  const translucentSurface = 'rgba(255, 255, 255, 0.1)';
  const translucentLine = 'rgba(255, 255, 255, 0.24)';
  return [
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-feature-card', '.db-card', '.db-pricing-tier', '.db-testimonial'],
      'background-color: ' + translucentSurface + '; border-color: ' + translucentLine + '; color: inherit;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-feature-icon'],
      'background-color: rgba(255, 255, 255, 0.16); color: inherit;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-stat-value', '.db-pricing-check', '.db-hero-eyebrow', '.db-testimonial-rating'],
      'color: inherit;',
    ),
    buildScopedCssRule(lookScopes.inverted, ['.db-hero-eyebrow'], 'opacity: 0.85;'),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-card-link', '.db-contact-link', '.db-footer-link'],
      'color: inherit; text-decoration: underline; text-underline-offset: 0.2em;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-pricing-toggle'],
      'background-color: ' + translucentSurface + '; border-color: ' + translucentLine + ';',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-pricing-toggle-button', '.db-pricing-toggle-button:hover'],
      'color: inherit;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-social-link'],
      'background-color: transparent; border-color: ' + translucentLine + '; color: inherit; opacity: 0.85;',
    ),
    buildScopedCssRule(lookScopes.inverted, ['.db-social-link:hover'], 'border-color: currentColor; opacity: 1;'),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-logo-cloud-image'],
      'filter: grayscale(1) brightness(0) invert(1); opacity: 0.72;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-logo-cloud-item:hover .db-logo-cloud-image', '.db-logo-cloud-item:focus-within .db-logo-cloud-image'],
      'filter: brightness(0) invert(1); opacity: 1;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-button[data-db-variant=secondary]'],
      'background: rgba(255, 255, 255, 0.14); border-color: ' + translucentLine + '; color: inherit;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-button[data-db-variant=outline]', '.db-button[data-db-variant=ghost]'],
      'background: transparent; border-color: currentColor; color: inherit;',
    ),
    buildScopedCssRule(
      lookScopes.inverted,
      ['.db-button[data-db-variant=outline]:hover', '.db-button[data-db-variant=ghost]:hover'],
      'background: rgba(255, 255, 255, 0.12);',
    ),
    buildScopedCssRule(lookScopes.inverted, ['.db-button[data-db-variant=ghost]'], 'border-color: transparent;'),
    buildScopedCssRule(
      lookScopes.brand,
      ['.db-button[data-db-variant=primary]', '.db-pricing-toggle-button[aria-pressed=true]'],
      'background: var(--db-color-brand-contrast, #ffffff); border-color: var(--db-color-brand-contrast, #ffffff); color: var(--db-color-brand, #4f46e5);',
    ),
    buildScopedCssRule(
      lookScopes.brand,
      ['.db-pricing-tier[data-db-featured=true]'],
      'border-color: var(--db-color-brand-contrast, #ffffff);',
    ),
    buildScopedCssRule(
      lookScopes.brand,
      ['.db-pricing-tier[data-db-featured=true]::before', '.db-pricing-save'],
      'background-color: var(--db-color-brand-contrast, #ffffff); color: var(--db-color-brand, #4f46e5);',
    ),
  ].join('\n');
};

export default buildMarketingLookInvertedCss;
