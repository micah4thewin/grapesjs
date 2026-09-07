import walkComponentTree from '../support/walkComponentTree.js';
import applyStoredContactDetails from './applyStoredContactDetails.js';
import getMarketingWrappableTypes from './getMarketingWrappableTypes.js';
import isComponentOfType from './isComponentOfType.js';
import resolveFooterPageLinks from './resolveFooterPageLinks.js';
import rotateMarketingPresetCopy from './rotateMarketingPresetCopy.js';
import syncPricingSection from './syncPricingSection.js';
import wrapMarketingDropInSection from './wrapMarketingDropInSection.js';

const watchMarketingBlockDrops = (editor) => {
  editor.on('block:drag:stop', (droppedValue) => {
    const droppedComponent = Array.isArray(droppedValue) ? droppedValue[0] : droppedValue;
    if (!droppedComponent || typeof droppedComponent.get !== 'function') return;
    const droppedType = String(droppedComponent.get('type') || '');
    if (getMarketingWrappableTypes().indexOf(droppedType) >= 0) wrapMarketingDropInSection(editor, droppedComponent);
    rotateMarketingPresetCopy(editor, droppedComponent);
    walkComponentTree(droppedComponent, (currentComponent) => {
      if (isComponentOfType(currentComponent, 'db-contact')) applyStoredContactDetails(editor, currentComponent);
      if (isComponentOfType(currentComponent, 'db-footer')) resolveFooterPageLinks(editor, currentComponent);
      if (isComponentOfType(currentComponent, 'db-pricing')) syncPricingSection(currentComponent);
    });
  });
};

export default watchMarketingBlockDrops;
