import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import findStyleProperty from './findStyleProperty.js';
import getIconMarkup from '../support/getIconMarkup.js';
import openTokenBindingMenu from './openTokenBindingMenu.js';
import refreshTokenBindingState from './refreshTokenBindingState.js';
import resolveTokenGroupForProperty from './resolveTokenGroupForProperty.js';

const mountTokenBindingButtons = (editor) => {
  const decorateProperty = (propertyElement) => {
    const sectorElement = propertyElement.closest('.gjs-sm-sector');
    const sectorMatch = sectorElement ? sectorElement.className.match(/gjs-sm-sector__([\w-]+)/) : null;
    const propertyMatch = propertyElement.className.match(/gjs-sm-property__([\w-]+)/);
    const labelElement = propertyElement.querySelector(':scope > .gjs-sm-label');
    if (!sectorMatch || !propertyMatch || !labelElement) return;
    const propertyModel = findStyleProperty(editor.StyleManager, sectorMatch[1], propertyMatch[1]);
    const groupKey = resolveTokenGroupForProperty(propertyModel);
    if (!groupKey) return;
    const bindButton = buildElementFromMarkup(
      propertyElement.ownerDocument,
      [
        '<button type="button" class="gjs-db-token-bind" data-db-token-bind aria-haspopup="menu" aria-expanded="false"',
        ` aria-label="Use a site value">${getIconMarkup('tokens', { size: 14 })}</button>`,
      ].join(''),
    );
    if (!bindButton) return;
    labelElement.appendChild(bindButton);
    bindButton.addEventListener('click', (clickEvent) => {
      clickEvent.stopPropagation();
      openTokenBindingMenu(editor, propertyModel, groupKey, bindButton);
    });
    propertyModel.on('change:value', () => refreshTokenBindingState(bindButton, propertyModel));
    refreshTokenBindingState(bindButton, propertyModel);
  };
  const decorateAll = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    if (!containerElement) return;
    containerElement.querySelectorAll('.gjs-sm-property:not([data-db-token-bind-ready])').forEach((propertyElement) => {
      propertyElement.setAttribute('data-db-token-bind-ready', 'true');
      decorateProperty(propertyElement);
    });
    containerElement.querySelectorAll('[data-db-token-bind]').forEach((bindButton) => {
      const propertyElement = bindButton.closest('.gjs-sm-property');
      const sectorElement = propertyElement ? propertyElement.closest('.gjs-sm-sector') : null;
      const sectorMatch = sectorElement ? sectorElement.className.match(/gjs-sm-sector__([\w-]+)/) : null;
      const propertyMatch = propertyElement ? propertyElement.className.match(/gjs-sm-property__([\w-]+)/) : null;
      const propertyModel =
        sectorMatch && propertyMatch ? findStyleProperty(editor.StyleManager, sectorMatch[1], propertyMatch[1]) : null;
      if (propertyModel) refreshTokenBindingState(bindButton, propertyModel);
    });
  };
  editor.on('run:core:open-styles run:open-sm style:target', () => setTimeout(decorateAll, 0));
};

export default mountTokenBindingButtons;
