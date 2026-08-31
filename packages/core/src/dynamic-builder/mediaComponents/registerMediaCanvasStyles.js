import deepMergeRecords from '../support/deepMergeRecords.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import buildCarouselMediaCss from './buildCarouselMediaCss.js';
import buildFacadeMediaCss from './buildFacadeMediaCss.js';
import buildGalleryMediaCss from './buildGalleryMediaCss.js';
import buildLightboxMediaCss from './buildLightboxMediaCss.js';
import buildMediaBaseCss from './buildMediaBaseCss.js';

const registerMediaCanvasStyles = (editor, moduleOptions) => {
  const mediaThemeRecord = deepMergeRecords(
    { accentColor: '#2563eb', overlayColor: 'rgba(15, 23, 42, 0.92)', controlColor: '#f8fafc' },
    (moduleOptions && moduleOptions.theme) || {},
  );
  const mediaCssText = [
    buildMediaBaseCss(mediaThemeRecord),
    buildGalleryMediaCss(),
    buildCarouselMediaCss(mediaThemeRecord),
    buildFacadeMediaCss(mediaThemeRecord),
    buildLightboxMediaCss(mediaThemeRecord),
  ].join('\n');
  registerCanvasStyles(editor, 'db-css-media-base', mediaCssText);
};

export default registerMediaCanvasStyles;
