const syncCoverMediaFromAttributes = (coverComponent) => {
  if (!coverComponent || !coverComponent.getAttributes || !coverComponent.find) return;
  const attributeRecord = coverComponent.getAttributes();
  const mediaComponent = coverComponent.find('[data-db-cover-media]')[0];
  if (!mediaComponent) return;
  const overlayStrength = String(attributeRecord['data-db-overlay-strength'] || '45');
  coverComponent.addStyle({ '--db-cover-overlay': overlayStrength });
  if (attributeRecord['data-db-cover'] === 'video') {
    const videoSource = String(attributeRecord['data-db-cover-video'] || '');
    const posterSource = String(attributeRecord['data-db-cover-poster'] || '');
    const mediaAttributes = { poster: posterSource };
    if (videoSource) mediaAttributes.src = videoSource;
    else mediaComponent.removeAttributes(['src']);
    mediaComponent.addAttributes(mediaAttributes);
    return;
  }
  const imageSource = String(attributeRecord['data-db-cover-image'] || '');
  if (imageSource && mediaComponent.getAttributes().src !== imageSource)
    mediaComponent.addAttributes({ src: imageSource });
};

export default syncCoverMediaFromAttributes;
