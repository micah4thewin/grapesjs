import buildMediaTraitCategory from './buildMediaTraitCategory.js';

const getVideoTraitDefinitions = () => {
  const videoCategory = buildMediaTraitCategory('video', 'Video');
  return [
    {
      type: 'db-url',
      name: 'data-db-paste-link',
      label: 'Paste a video link',
      placeholder: 'https://www.youtube.com/watch?v=...',
      category: videoCategory,
    },
    {
      type: 'select',
      name: 'data-db-provider',
      label: 'Provider',
      default: 'youtube',
      category: videoCategory,
      options: [
        { id: 'youtube', label: 'YouTube' },
        { id: 'vimeo', label: 'Vimeo' },
        { id: 'file', label: 'Video file (link to .mp4)' },
      ],
    },
    {
      type: 'text',
      name: 'data-db-video',
      label: 'Video id or file link',
      placeholder: 'Filled in from the link above',
      category: videoCategory,
    },
    { type: 'text', name: 'data-db-title', label: 'Title for screen readers', category: videoCategory },
    { type: 'db-asset', name: 'data-db-poster', label: 'Cover picture', category: videoCategory },
    {
      type: 'db-textarea-trait',
      name: 'data-db-consent-note',
      label: 'Note shown before play',
      category: videoCategory,
    },
  ];
};

export default getVideoTraitDefinitions;
