const buildCoverMediaChild = (mediaKind, mediaSource, posterSource) => {
  if (mediaKind === 'video') {
    return {
      tagName: 'video',
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
      draggable: false,
      droppable: false,
      removable: false,
      copyable: false,
      selectable: false,
      hoverable: false,
      layerable: false,
    };
  }
  return {
    type: 'image',
    classes: ['db-cover-media'],
    attributes: { 'data-db-cover-media': 'image', src: mediaSource, alt: '', loading: 'eager', fetchpriority: 'high' },
    draggable: false,
    droppable: false,
    removable: false,
    copyable: false,
    selectable: false,
    hoverable: false,
    layerable: false,
  };
};

export default buildCoverMediaChild;
