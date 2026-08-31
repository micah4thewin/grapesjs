import buildThemePaletteCss from './buildThemePaletteCss.js';
import buildThemeScaleTokensCss from './buildThemeScaleTokensCss.js';
import buildGrapesVariableBridgeCss from './buildGrapesVariableBridgeCss.js';
import buildPanelsTopBarCss from './buildPanelsTopBarCss.js';
import buildButtonsToolbarsCss from './buildButtonsToolbarsCss.js';
import buildBlockManagerCss from './buildBlockManagerCss.js';
import buildLayerManagerCss from './buildLayerManagerCss.js';
import buildStyleManagerCss from './buildStyleManagerCss.js';
import buildTraitManagerCss from './buildTraitManagerCss.js';
import buildSelectorManagerCss from './buildSelectorManagerCss.js';
import buildAssetManagerCss from './buildAssetManagerCss.js';
import buildModalDialogCss from './buildModalDialogCss.js';
import buildRichTextToolbarCss from './buildRichTextToolbarCss.js';
import buildCanvasChromeCss from './buildCanvasChromeCss.js';
import buildInputFieldsCss from './buildInputFieldsCss.js';
import buildScrollbarCss from './buildScrollbarCss.js';
import buildPrimitiveModalFormCss from './buildPrimitiveModalFormCss.js';
import buildPrimitiveButtonsCss from './buildPrimitiveButtonsCss.js';
import buildPrimitiveListsReportsCss from './buildPrimitiveListsReportsCss.js';
import buildPrimitivePaletteCss from './buildPrimitivePaletteCss.js';
import buildPrimitiveTopBarCss from './buildPrimitiveTopBarCss.js';
import buildPrimitivePreviewCardsCss from './buildPrimitivePreviewCardsCss.js';

const composeEditorThemeCss = () =>
  [
    buildThemePaletteCss,
    buildThemeScaleTokensCss,
    buildGrapesVariableBridgeCss,
    buildPanelsTopBarCss,
    buildButtonsToolbarsCss,
    buildBlockManagerCss,
    buildLayerManagerCss,
    buildStyleManagerCss,
    buildTraitManagerCss,
    buildSelectorManagerCss,
    buildAssetManagerCss,
    buildModalDialogCss,
    buildRichTextToolbarCss,
    buildCanvasChromeCss,
    buildInputFieldsCss,
    buildScrollbarCss,
    buildPrimitiveModalFormCss,
    buildPrimitiveButtonsCss,
    buildPrimitiveListsReportsCss,
    buildPrimitivePaletteCss,
    buildPrimitiveTopBarCss,
    buildPrimitivePreviewCardsCss,
  ]
    .map((buildSectionCss) => buildSectionCss().trim())
    .join('\n');

export default composeEditorThemeCss;
