import buildIconMarkupForName from '../customAssets/buildIconMarkupForName.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildIconSvgMarkup = (iconSettings) => {
  const accessibleLabel = iconSettings.isDecorative ? '' : escapeHtmlText(iconSettings.accessibleLabel || '');
  return buildIconMarkupForName(iconSettings.iconName, {
    size: iconSettings.size,
    strokeWidth: iconSettings.strokeWidth,
    label: accessibleLabel,
  });
};

export default buildIconSvgMarkup;
