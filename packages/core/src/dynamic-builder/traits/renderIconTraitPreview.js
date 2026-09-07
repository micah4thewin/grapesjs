import buildIconMarkupForName from '../customAssets/buildIconMarkupForName.js';
import resolveIconDisplayLabel from '../customAssets/resolveIconDisplayLabel.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';

const renderIconTraitPreview = (wrapperElement, iconName) => {
  const previewElement = resolveTraitInnerElement(wrapperElement, '[data-db-icon-preview]');
  const labelElement = resolveTraitInnerElement(wrapperElement, '[data-db-icon-current]');
  if (previewElement) previewElement.innerHTML = iconName ? buildIconMarkupForName(iconName, { size: 20 }) : '';
  if (labelElement) labelElement.textContent = iconName ? resolveIconDisplayLabel(iconName) : 'Choose icon';
};

export default renderIconTraitPreview;
