const providerLabels = { youtube: 'YouTube', vimeo: 'Vimeo', file: 'a video file' };

const applyMediaLinkRecord = (targetComponent, linkRecord) => {
  const linkKind = linkRecord ? linkRecord.kind : '';
  if (targetComponent.is('db-video')) {
    if (linkKind !== 'video') {
      return { kind: 'error', text: 'That link does not look like a YouTube, Vimeo or video file link.' };
    }
    targetComponent.addAttributes({ 'data-db-provider': linkRecord.provider, 'data-db-video': linkRecord.videoId });
    return { kind: 'success', text: 'Video found on ' + providerLabels[linkRecord.provider] + '.' };
  }
  if (targetComponent.is('db-map')) {
    if (linkKind !== 'map') {
      return {
        kind: 'error',
        text: 'That link has no location in it. Open the map in your browser and copy the link from the address bar.',
      };
    }
    const nextAttributes = { 'data-db-lat': String(linkRecord.latitude), 'data-db-lng': String(linkRecord.longitude) };
    if (linkRecord.zoom) nextAttributes['data-db-zoom'] = String(linkRecord.zoom);
    targetComponent.addAttributes(nextAttributes);
    return { kind: 'success', text: 'Map moved to the place in the link.' };
  }
  if (linkKind === 'image' || linkKind === 'link') {
    targetComponent.addAttributes({ src: linkRecord.url });
    return { kind: 'success', text: 'Picture link applied.' };
  }
  return { kind: 'error', text: 'That does not look like a picture link.' };
};

export default applyMediaLinkRecord;
