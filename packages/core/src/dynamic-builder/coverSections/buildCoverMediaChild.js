const lockedMediaProps = {
  draggable: false,
  droppable: false,
  removable: false,
  copyable: false,
  selectable: false,
  hoverable: false,
  layerable: false,
};

const buildCoverMediaChild = (mediaKind, mediaSource, posterSource) => {
  if (mediaKind === 'video') {
    return {
      tagName: 'video',
      name: 'Cover video',
      classes: ['db-cover-media'],
      attributes: {
        'data-db-cover-media': 'video',
        src: mediaSource,
        poster: posterSource || '',
        muted: 'muted',
        loop: 'loop',
        playsinline: 'playsinline',
        autoplay: 'autoplay',
        preload: 'metadata',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
      ...lockedMediaProps,
    };
  }
  return {
    type: 'image',
    name: 'Cover photo',
    classes: ['db-cover-media'],
    attributes: { 'data-db-cover-media': 'image', src: mediaSource, alt: '', loading: 'eager', fetchpriority: 'high' },
    ...lockedMediaProps,
  };
};

export default buildCoverMediaChild;
