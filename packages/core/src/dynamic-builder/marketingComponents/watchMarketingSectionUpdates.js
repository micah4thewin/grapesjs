import getMarketingSectionTypes from './getMarketingSectionTypes.js';
import isComponentOfType from './isComponentOfType.js';
import syncAnchorIdSlug from './syncAnchorIdSlug.js';
import syncFooterLayout from './syncFooterLayout.js';
import syncHeroMediaVisibility from './syncHeroMediaVisibility.js';
import syncMarketingBackgroundImage from './syncMarketingBackgroundImage.js';

const watchMarketingSectionUpdates = (editor) => {
  const isMarketingSection = (component) =>
    getMarketingSectionTypes().some((typeName) => isComponentOfType(component, typeName));
  editor.on('component:update:attributes:data-db-bg-image', (component) => {
    if (isMarketingSection(component)) syncMarketingBackgroundImage(component);
  });
  editor.on('component:update:attributes:id', (component) => {
    if (isMarketingSection(component)) syncAnchorIdSlug(component);
  });
  editor.on('component:update:attributes:data-db-media', (component) => {
    if (isComponentOfType(component, 'db-hero')) syncHeroMediaVisibility(component);
  });
  editor.on('component:update:attributes:data-db-footer', (component) => {
    if (isComponentOfType(component, 'db-footer')) syncFooterLayout(component);
  });
  editor.on('component:add', (component, addOptions) => {
    if (addOptions && addOptions.temporary) return;
    if (isComponentOfType(component, 'db-footer')) syncFooterLayout(component);
  });
};

export default watchMarketingSectionUpdates;
