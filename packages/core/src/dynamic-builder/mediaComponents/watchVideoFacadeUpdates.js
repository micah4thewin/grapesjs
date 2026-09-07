import parseVideoLinkRecord from './parseVideoLinkRecord.js';
import syncFacadeTextChild from './syncFacadeTextChild.js';

const watchVideoFacadeUpdates = (editor) => {
  const isVideoComponent = (component) => Boolean(component && component.is && component.is('db-video'));
  editor.on('component:update:attributes:data-db-consent-note', (component) => {
    if (isVideoComponent(component)) syncFacadeTextChild(component, 'data-db-consent-note', 'data-db-video-note');
  });
  editor.on('component:update:attributes:data-db-video', (component) => {
    if (!isVideoComponent(component)) return;
    const rawValue = String(component.getAttributes()['data-db-video'] || '').trim();
    if (rawValue.indexOf('/') < 0 && rawValue.indexOf('.') < 0) return;
    const videoRecord = parseVideoLinkRecord(rawValue);
    if (!videoRecord || videoRecord.videoId === rawValue) return;
    component.addAttributes({ 'data-db-provider': videoRecord.provider, 'data-db-video': videoRecord.videoId });
  });
};

export default watchVideoFacadeUpdates;
