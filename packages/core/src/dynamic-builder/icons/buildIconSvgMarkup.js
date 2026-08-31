import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildIconSvgMarkup = (iconSettings) => {
  const accessibleLabel = iconSettings.isDecorative ? '' : escapeHtmlText(iconSettings.accessibleLabel || '');
  return getIconMarkup(iconSettings.iconName, {
    size: iconSettings.size,
    strokeWidth: iconSettings.strokeWidth,
    label: accessibleLabel,
  });
};

export default buildIconSvgMarkup;
