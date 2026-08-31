import buildVideoFacadeChildren from './buildVideoFacadeChildren.js';
import runVideoFacadeBehavior from './runVideoFacadeBehavior.js';

const buildVideoTypeDefinition = () => ({
  type: 'db-video',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'video') && { type: 'db-video' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Video',
      draggable: true,
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
      traits: [
        {
          type: 'select',
          name: 'data-db-provider',
          label: 'Provider',
          default: 'youtube',
          options: [
            { id: 'youtube', label: 'YouTube (no-cookie)' },
            { id: 'vimeo', label: 'Vimeo' },
            { id: 'file', label: 'Video file' },
          ],
        },
        { type: 'text', name: 'data-db-video', label: 'Video id or URL', placeholder: 'dQw4w9WgXcQ' },
        { type: 'text', name: 'data-db-title', label: 'Accessible title (required)' },
        { type: 'db-asset', name: 'data-db-poster', label: 'Poster image' },
        { type: 'db-textarea-trait', name: 'data-db-consent-note', label: 'Consent note' },
      ],
    },
  },
});

export default buildVideoTypeDefinition;
