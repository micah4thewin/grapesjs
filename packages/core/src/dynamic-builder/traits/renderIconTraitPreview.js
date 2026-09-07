import getIconMarkup from '../support/getIconMarkup.js';
import resolveTraitInnerElement from './resolveTraitInnerElement.js';
import splitIconNameWords from '../icons/splitIconNameWords.js';

const renderIconTraitPreview = (wrapperElement, iconName) => {
  const previewElement = resolveTraitInnerElement(wrapperElement, '[data-db-icon-preview]');
  const labelElement = resolveTraitInnerElement(wrapperElement, '[data-db-icon-current]');
  if (previewElement) previewElement.innerHTML = iconName ? getIconMarkup(iconName, { size: 20 }) : '';
  if (labelElement) labelElement.textContent = iconName ? splitIconNameWords(iconName) : 'Choose icon';
};

export default renderIconTraitPreview;
