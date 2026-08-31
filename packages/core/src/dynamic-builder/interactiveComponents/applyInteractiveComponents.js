import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildAccordionItemTypeDefinition from './buildAccordionItemTypeDefinition.js';
import buildAccordionTypeDefinition from './buildAccordionTypeDefinition.js';
import buildAnnouncementTypeDefinition from './buildAnnouncementTypeDefinition.js';
import buildBreadcrumbTypeDefinition from './buildBreadcrumbTypeDefinition.js';
import buildCountdownTypeDefinition from './buildCountdownTypeDefinition.js';
import buildInteractiveBaseCss from './buildInteractiveBaseCss.js';
import buildNavbarTypeDefinition from './buildNavbarTypeDefinition.js';
import buildSocialLinksTypeDefinition from './buildSocialLinksTypeDefinition.js';
import buildTabButtonTypeDefinition from './buildTabButtonTypeDefinition.js';
import buildTabListTypeDefinition from './buildTabListTypeDefinition.js';
import buildTabPanelTypeDefinition from './buildTabPanelTypeDefinition.js';
import buildTabsTypeDefinition from './buildTabsTypeDefinition.js';
import resolveInteractiveTextDefaults from './resolveInteractiveTextDefaults.js';

const applyInteractiveComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.interactiveComponents) || {};
  const interactiveTextDefaults = resolveInteractiveTextDefaults(moduleOptions);
  registerComponentTypeSet(editor, [
    buildAccordionItemTypeDefinition(interactiveTextDefaults),
    buildAccordionTypeDefinition(interactiveTextDefaults),
    buildTabButtonTypeDefinition(interactiveTextDefaults),
    buildTabListTypeDefinition(interactiveTextDefaults),
    buildTabPanelTypeDefinition(interactiveTextDefaults),
    buildTabsTypeDefinition(interactiveTextDefaults),
    buildCountdownTypeDefinition(interactiveTextDefaults),
    buildNavbarTypeDefinition(interactiveTextDefaults),
    buildBreadcrumbTypeDefinition(interactiveTextDefaults),
    buildSocialLinksTypeDefinition(interactiveTextDefaults),
    buildAnnouncementTypeDefinition(interactiveTextDefaults),
  ]);
  registerCanvasStyles(editor, 'db-css-interactive-base', buildInteractiveBaseCss());
};

export default applyInteractiveComponents;
