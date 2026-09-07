import buildAccordionItemTypeDefinition from './buildAccordionItemTypeDefinition.js';
import buildAccordionTypeDefinition from './buildAccordionTypeDefinition.js';
import buildAnnouncementTypeDefinition from './buildAnnouncementTypeDefinition.js';
import buildBreadcrumbTypeDefinition from './buildBreadcrumbTypeDefinition.js';
import buildCountdownTypeDefinition from './buildCountdownTypeDefinition.js';
import buildInteractiveBaseCss from './buildInteractiveBaseCss.js';
import buildInteractiveEditorCanvasCss from './buildInteractiveEditorCanvasCss.js';
import buildNavbarEditorCanvasCss from './buildNavbarEditorCanvasCss.js';
import buildNavbarTypeDefinition from './buildNavbarTypeDefinition.js';
import buildSocialLinksTypeDefinition from './buildSocialLinksTypeDefinition.js';
import buildTabButtonTypeDefinition from './buildTabButtonTypeDefinition.js';
import buildTabListTypeDefinition from './buildTabListTypeDefinition.js';
import buildTabPanelTypeDefinition from './buildTabPanelTypeDefinition.js';
import buildTabsTypeDefinition from './buildTabsTypeDefinition.js';
import createAccordionItemsTraitDefinition from './createAccordionItemsTraitDefinition.js';
import createBreadcrumbStepsTraitDefinition from './createBreadcrumbStepsTraitDefinition.js';
import createTabItemsTraitDefinition from './createTabItemsTraitDefinition.js';
import createTextWithHelpTraitDefinition from './createTextWithHelpTraitDefinition.js';
import createTimeTraitDefinition from './createTimeTraitDefinition.js';
import getInteractiveEditorCss from './getInteractiveEditorCss.js';
import getNavbarScrollRuntimeSource from './getNavbarScrollRuntimeSource.js';
import hasComponentWithAttribute from '../support/hasComponentWithAttribute.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import markEditorCanvasBody from './markEditorCanvasBody.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';
import registerRuntimeScript from '../support/registerRuntimeScript.js';
import registerTraitTypeSet from '../support/registerTraitTypeSet.js';
import resolveInteractiveTextDefaults from './resolveInteractiveTextDefaults.js';
import runNavbarBuildMenuCommand from './runNavbarBuildMenuCommand.js';
import watchInteractiveAttributeUpdates from './watchInteractiveAttributeUpdates.js';
import watchInteractiveComponentAdds from './watchInteractiveComponentAdds.js';
import watchNavigationPageSync from './watchNavigationPageSync.js';
import wireInteractiveSelectionReveal from './wireInteractiveSelectionReveal.js';

const applyInteractiveComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.interactiveComponents) || {};
  const interactiveTextDefaults = resolveInteractiveTextDefaults(moduleOptions);
  registerTraitTypeSet(editor, {
    'db-time': createTimeTraitDefinition(),
    'db-text-help': createTextWithHelpTraitDefinition(),
    'db-accordion-items': createAccordionItemsTraitDefinition(editor, interactiveTextDefaults),
    'db-tab-items': createTabItemsTraitDefinition(editor, interactiveTextDefaults),
    'db-breadcrumb-steps': createBreadcrumbStepsTraitDefinition(editor),
  });
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
  registerEditorOnlyCanvasStyles(editor, 'db-css-navbar-editor', buildNavbarEditorCanvasCss());
  registerEditorOnlyCanvasStyles(editor, 'db-css-interactive-editor-canvas', buildInteractiveEditorCanvasCss());
  registerRuntimeScript(editor, 'db-navbar-scroll', {
    detect: (runtimeEditor, page) => hasComponentWithAttribute(runtimeEditor, 'data-db-scroll', page),
    source: () => getNavbarScrollRuntimeSource(),
  });
  registerCommandSet(editor, {
    'db:navbar-build-menu': (commandEditor) => runNavbarBuildMenuCommand(commandEditor),
  });
  markEditorCanvasBody(editor);
  watchInteractiveComponentAdds(editor, interactiveTextDefaults);
  watchInteractiveAttributeUpdates(editor);
  watchNavigationPageSync(editor);
  wireInteractiveSelectionReveal(editor);
  const injectInteractiveEditorStyles = () =>
    injectEditorStylesOnce(editor, 'db-css-interactive-editor', getInteractiveEditorCss());
  injectInteractiveEditorStyles();
  if (editor.onReady) editor.onReady(injectInteractiveEditorStyles);
};

export default applyInteractiveComponents;
