import buildVideoFacadeChildren from './buildVideoFacadeChildren.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import getVideoTraitDefinitions from './getVideoTraitDefinitions.js';
import runVideoFacadeBehavior from './runVideoFacadeBehavior.js';

const buildVideoTypeDefinition = () => ({
  type: 'db-video',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'video') && { type: 'db-video' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Video',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: false,
      classes: ['db-video'],
      attributes: {
        'data-db-type': 'video',
        'data-db-provider': 'youtube',
        'data-db-video': '',
        'data-db-title': 'Embedded video',
        'data-db-poster': '',
        'data-db-consent-note': 'External video loads only after you press play.',
      },
      components: buildVideoFacadeChildren(),
      script: runVideoFacadeBehavior,
      traits: getVideoTraitDefinitions(),
    },
  },
});

export default buildVideoTypeDefinition;
