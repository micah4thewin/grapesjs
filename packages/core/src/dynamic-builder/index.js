import applyQualityAudits from './audits/applyQualityAudits.js';
import keepComponentTypeViewStatics from './support/keepComponentTypeViewStatics.js';
import applyScrollAnimations from './animations/applyScrollAnimations.js';
import applyBlockLibrary from './blocks/applyBlockLibrary.js';
import applySiteMetaFoundation from './support/applySiteMetaFoundation.js';
import composeModuleAppliers from './composeModuleAppliers.js';
import applyContentComponents from './contentComponents/applyContentComponents.js';
import applyCoverSections from './coverSections/applyCoverSections.js';
import applyCustomAssets from './customAssets/applyCustomAssets.js';
import applyCustomCode from './customCode/applyCustomCode.js';
import applyDataBinding from './dataBinding/applyDataBinding.js';
import applyDesignTokens from './designTokens/applyDesignTokens.js';
import applyResponsiveDevices from './devices/applyResponsiveDevices.js';
import applyExperienceUpgrades from './experience/applyExperienceUpgrades.js';
import applyExportSystem from './exporter/applyExportSystem.js';
import applyFontLibrary from './fontLibrary/applyFontLibrary.js';
import applyFormComponents from './formComponents/applyFormComponents.js';
import getDefaultPluginOptions from './getDefaultPluginOptions.js';
import applyIconSystem from './icons/applyIconSystem.js';
import applyInteractionFlows from './interactions/applyInteractionFlows.js';
import applyInteractiveComponents from './interactiveComponents/applyInteractiveComponents.js';
import applyLayoutComponents from './layoutComponents/applyLayoutComponents.js';
import applyMarketingComponents from './marketingComponents/applyMarketingComponents.js';
import applyMediaComponents from './mediaComponents/applyMediaComponents.js';
import applyPersistence from './persistence/applyPersistence.js';
import applyPhotoEditor from './photoEditor/applyPhotoEditor.js';
import applyReusableComponents from './symbols/applyReusableComponents.js';
import applySchemaManager from './schema/applySchemaManager.js';
import applySeoManager from './seo/applySeoManager.js';
import applySiteIdentity from './siteIdentity/applySiteIdentity.js';
import applyStockPhotos from './stockPhotos/applyStockPhotos.js';
import applySiteManager from './siteManager/applySiteManager.js';
import applyTemplateManager from './templateManager/applyTemplateManager.js';
import applyEditorShell from './shell/applyEditorShell.js';
import applyStyleSectors from './styleSectors/applyStyleSectors.js';
import deepMergeRecords from './support/deepMergeRecords.js';
import applyEditorTheme from './theme/applyEditorTheme.js';
import applyTraitTypes from './traits/applyTraitTypes.js';
import attachSharedComponentTraits from './support/attachSharedComponentTraits.js';
import applyTypographySystem from './typography/applyTypographySystem.js';
import applyWorkspaceLayout from './workspace/applyWorkspaceLayout.js';

const dynamicBuilderPlugin = (editor, pluginOptions = {}) => {
  const mergedOptions = deepMergeRecords(getDefaultPluginOptions(), pluginOptions);
  const applyAllModules = composeModuleAppliers([
    applySiteMetaFoundation,
    keepComponentTypeViewStatics,
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
    applyCoverSections,
    applyFormComponents,
    applyDataBinding,
    applyCustomCode,
    applyScrollAnimations,
    applyInteractionFlows,
    applyReusableComponents,
    applyBlockLibrary,
    applyTemplateManager,
    applySeoManager,
    applySchemaManager,
    applyQualityAudits,
    applyExportSystem,
    applyPersistence,
    applySiteManager,
    applySiteIdentity,
    applyFontLibrary,
    applyCustomAssets,
    applyPhotoEditor,
    applyStockPhotos,
    applyEditorShell,
    applyExperienceUpgrades,
    attachSharedComponentTraits,
    applyWorkspaceLayout,
  ]);
  applyAllModules(editor, mergedOptions);
};

export default dynamicBuilderPlugin;
