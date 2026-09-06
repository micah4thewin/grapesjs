import buildCoverContentChildren from './buildCoverContentChildren.js';
import buildCoverMediaChild from './buildCoverMediaChild.js';
import buildCoverOverlayChild from './buildCoverOverlayChild.js';
import getCoverTextDefaults from './getCoverTextDefaults.js';
import getCoverTraitDefinitions from './getCoverTraitDefinitions.js';
import getDefaultCoverPhotoUri from './getDefaultCoverPhotoUri.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import runCoverBehavior from './runCoverBehavior.js';

const buildCoverTypeDefinition = (mediaKind) => {
  const componentType = mediaKind === 'video' ? 'db-cover-video' : 'db-cover-photo';
  const dataType = mediaKind === 'video' ? 'cover-video' : 'cover-photo';
  const defaultPoster = getDefaultCoverPhotoUri();
  return {
    type: componentType,
    isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === dataType) && { type: componentType },
    model: {
      defaults: {
        tagName: 'section',
        name: mediaKind === 'video' ? 'Video cover' : 'Photo cover',
        draggable: getDropTargetSelectors().pageOnly,
        droppable: false,
        classes: ['db-cover', mediaKind === 'video' ? 'db-cover-video' : 'db-cover-photo'],
        attributes: {
          'data-db-type': dataType,
          'data-db-cover': mediaKind,
          'data-db-cover-height': '85vh',
          'data-db-overlay-strength': '45',
          'data-db-align': 'center',
          ...(mediaKind === 'video'
            ? { 'data-db-cover-video': '', 'data-db-cover-poster': defaultPoster, 'data-db-mobile-poster': 'true' }
            : { 'data-db-cover-image': defaultPoster, 'data-db-parallax': 'false' }),
        },
        components: [
          buildCoverMediaChild(mediaKind, mediaKind === 'video' ? '' : defaultPoster, defaultPoster),
          buildCoverOverlayChild(),
          ...buildCoverContentChildren(getCoverTextDefaults()),
        ],
        script: runCoverBehavior,
        traits: getCoverTraitDefinitions(mediaKind),
      },
    },
  };
};

export default buildCoverTypeDefinition;
