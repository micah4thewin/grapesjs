import applyQualityAudits from './audits/applyQualityAudits.js';
import applyScrollAnimations from './animations/applyScrollAnimations.js';
import applyBlockLibrary from './blocks/applyBlockLibrary.js';
import applySiteMetaFoundation from './support/applySiteMetaFoundation.js';
import composeModuleAppliers from './composeModuleAppliers.js';
import applyContentComponents from './contentComponents/applyContentComponents.js';
import applyCustomCode from './customCode/applyCustomCode.js';
import applyDataBinding from './dataBinding/applyDataBinding.js';
import applyDesignTokens from './designTokens/applyDesignTokens.js';
import applyResponsiveDevices from './devices/applyResponsiveDevices.js';
import applyExperienceUpgrades from './experience/applyExperienceUpgrades.js';
import applyExportSystem from './exporter/applyExportSystem.js';
import applyFormComponents from './formComponents/applyFormComponents.js';
import getDefaultPluginOptions from './getDefaultPluginOptions.js';
import applyIconSystem from './icons/applyIconSystem.js';
import applyInteractionFlows from './interactions/applyInteractionFlows.js';
import applyInteractiveComponents from './interactiveComponents/applyInteractiveComponents.js';
import applyLayoutComponents from './layoutComponents/applyLayoutComponents.js';
import applyMarketingComponents from './marketingComponents/applyMarketingComponents.js';
import applyMediaComponents from './mediaComponents/applyMediaComponents.js';
import applyPersistence from './persistence/applyPersistence.js';
import applyReusableComponents from './symbols/applyReusableComponents.js';
import applySchemaManager from './schema/applySchemaManager.js';
import applySeoManager from './seo/applySeoManager.js';
import applyEditorShell from './shell/applyEditorShell.js';
import applyStyleSectors from './styleSectors/applyStyleSectors.js';
import deepMergeRecords from './support/deepMergeRecords.js';
import applyEditorTheme from './theme/applyEditorTheme.js';
import applyTraitTypes from './traits/applyTraitTypes.js';
import attachSharedComponentTraits from './support/attachSharedComponentTraits.js';
import applyTypographySystem from './typography/applyTypographySystem.js';

const dynamicBuilderPlugin = (editor, pluginOptions = {}) => {
  const mergedOptions = deepMergeRecords(getDefaultPluginOptions(), pluginOptions);
  const applyAllModules = composeModuleAppliers([
    applySiteMetaFoundation,
    applyEditorTheme,
    applyIconSystem,
    applyDesignTokens,
    applyResponsiveDevices,
    applyStyleSectors,
    applyTypographySystem,
    applyTraitTypes,
    applyLayoutComponents,
    applyContentComponents,
    applyMediaComponents,
    applyInteractiveComponents,
    applyMarketingComponents,
    applyFormComponents,
    applyDataBinding,
    applyCustomCode,
    applyScrollAnimations,
    applyInteractionFlows,
    applyReusableComponents,
    applyBlockLibrary,
    applySeoManager,
    applySchemaManager,
    applyQualityAudits,
    applyExportSystem,
    applyPersistence,
    applyEditorShell,
    applyExperienceUpgrades,
    attachSharedComponentTraits,
  ]);
  applyAllModules(editor, mergedOptions);
};

export default dynamicBuilderPlugin;
