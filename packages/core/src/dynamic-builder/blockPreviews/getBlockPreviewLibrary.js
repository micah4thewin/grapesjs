import getInteractivePreviewShapes from './getInteractivePreviewShapes.js';
import getLayoutPreviewShapes from './getLayoutPreviewShapes.js';
import getMarketingPreviewShapes from './getMarketingPreviewShapes.js';
import getMediaPreviewShapes from './getMediaPreviewShapes.js';
import getTemplatePreviewShapes from './getTemplatePreviewShapes.js';
import getTypographyPreviewShapes from './getTypographyPreviewShapes.js';
import getUtilityPreviewShapes from './getUtilityPreviewShapes.js';

const getBlockPreviewLibrary = () => ({
  ...getTemplatePreviewShapes(),
  ...getLayoutPreviewShapes(),
  ...getTypographyPreviewShapes(),
  ...getMediaPreviewShapes(),
  ...getInteractivePreviewShapes(),
  ...getMarketingPreviewShapes(),
  ...getUtilityPreviewShapes(),
});

export default getBlockPreviewLibrary;
