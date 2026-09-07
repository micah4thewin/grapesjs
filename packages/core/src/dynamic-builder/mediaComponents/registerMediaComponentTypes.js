import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildCarouselSlideTypeDefinition from './buildCarouselSlideTypeDefinition.js';
import buildCarouselTypeDefinition from './buildCarouselTypeDefinition.js';
import buildFigureTypeDefinition from './buildFigureTypeDefinition.js';
import buildGalleryItemTypeDefinition from './buildGalleryItemTypeDefinition.js';
import buildGalleryTypeDefinition from './buildGalleryTypeDefinition.js';
import buildIconRowTypeDefinition from './buildIconRowTypeDefinition.js';
import buildImageTypeDefinition from './buildImageTypeDefinition.js';
import buildMapTypeDefinition from './buildMapTypeDefinition.js';
import buildVideoTypeDefinition from './buildVideoTypeDefinition.js';

const registerMediaComponentTypes = (editor) =>
  registerComponentTypeSet(editor, [
    buildImageTypeDefinition(editor),
    buildFigureTypeDefinition(),
    buildIconRowTypeDefinition(),
    buildGalleryItemTypeDefinition(),
    buildGalleryTypeDefinition(),
    buildCarouselSlideTypeDefinition(),
    buildCarouselTypeDefinition(),
    buildVideoTypeDefinition(),
    buildMapTypeDefinition(),
  ]);

export default registerMediaComponentTypes;
