import getIconMarkup from '../support/getIconMarkup.js';

const buildAssetEditButtonElement = (ownerDocument, onEdit) => {
  const buttonElement = ownerDocument.createElement('button');
  buttonElement.type = 'button';
  buttonElement.className = 'gjs-db-asset-edit';
  buttonElement.setAttribute('data-db-asset-photo-edit', 'true');
  buttonElement.setAttribute('title', 'Crop, brighten or resize this picture');
  buttonElement.innerHTML = `${getIconMarkup('sliders', { size: 13 })}<span>Edit photo</span>`;
  buttonElement.addEventListener('click', (clickEvent) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    onEdit();
  });
  return buttonElement;
};

export default buildAssetEditButtonElement;
