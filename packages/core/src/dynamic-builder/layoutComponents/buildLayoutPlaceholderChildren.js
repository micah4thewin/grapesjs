const buildLayoutPlaceholderChildren = (placementKind) => {
  if (placementKind === 'column') {
    return [
      {
        type: 'text',
        tagName: 'p',
        classes: ['db-layout-placeholder'],
        content: 'Column content. Drop blocks here or edit this text.',
      },
    ];
  }
  return [
    {
      type: 'text',
      tagName: 'h2',
      classes: ['db-layout-placeholder'],
      content: 'A clear headline for this section',
    },
    {
      type: 'text',
      tagName: 'p',
      classes: ['db-layout-placeholder'],
      content: 'Drop blocks here or edit this text to start shaping the section.',
    },
  ];
};

export default buildLayoutPlaceholderChildren;
