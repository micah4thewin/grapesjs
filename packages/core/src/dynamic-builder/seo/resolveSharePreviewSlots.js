import truncateTextToLimit from './truncateTextToLimit.js';

const resolveSharePreviewSlots = (previewValues, platformRecord) => {
  const isXPlatform = platformRecord.platformId === 'x';
  const imageUrl = isXPlatform ? previewValues.twitterImageUrl : previewValues.socialImageUrl;
  const titleText = isXPlatform ? previewValues.twitterTitleText : previewValues.socialTitleText;
  const descriptionText = isXPlatform ? previewValues.twitterDescriptionText : previewValues.socialDescriptionText;
  const showsDescription =
    platformRecord.showsDescription === true || (platformRecord.showsDescription === 'without-image' && !imageUrl);
  return {
    imageUrl,
    noteText: isXPlatform ? previewValues.twitterImageNote : previewValues.socialImageNote,
    titleText: truncateTextToLimit(titleText || 'Add a share title', platformRecord.titleLimit),
    descriptionText: showsDescription
      ? truncateTextToLimit(
          descriptionText || 'Add a share description to control this text.',
          platformRecord.descriptionLimit,
        )
      : '',
    domainText: previewValues.domainText || 'example.com',
  };
};

export default resolveSharePreviewSlots;
