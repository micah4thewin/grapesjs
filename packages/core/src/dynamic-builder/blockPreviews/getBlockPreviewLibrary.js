import getCoverPreviewShapes from './getCoverPreviewShapes.js';
import getDataPreviewShapes from './getDataPreviewShapes.js';
import getFormPreviewShapes from './getFormPreviewShapes.js';
import getInteractivePreviewShapes from './getInteractivePreviewShapes.js';
import getLayoutPreviewShapes from './getLayoutPreviewShapes.js';
import getMarketingGridPreviewShapes from './getMarketingGridPreviewShapes.js';
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
  ...getCoverPreviewShapes(),
  ...getInteractivePreviewShapes(),
  ...getMarketingPreviewShapes(),
  ...getMarketingGridPreviewShapes(),
  ...getFormPreviewShapes(),
  ...getDataPreviewShapes(),
  ...getUtilityPreviewShapes(),
});

export default getBlockPreviewLibrary;
