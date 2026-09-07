import createSvgIconMarkup from '../support/createSvgIconMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import resolveCalloutVariantName from './resolveCalloutVariantName.js';

const buildCalloutGlyphMarkup = (variantValue) => {
  const variantName = resolveCalloutVariantName(variantValue);
  if (variantName === 'error') {
    return createSvgIconMarkup('<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>', { size: 20 });
  }
  const iconNameRecord = { info: 'info', success: 'check', warning: 'warning' };
  return getIconMarkup(iconNameRecord[variantName], { size: 20 });
};

export default buildCalloutGlyphMarkup;
