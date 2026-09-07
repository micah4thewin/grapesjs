import syncPlaceholderMarker from './syncPlaceholderMarker.js';

const placeholderHostTypes = ['db-heading', 'db-text', 'text'];

const resolvePlaceholderHost = (component) => {
  if (!component || !component.get) return null;
  if (placeholderHostTypes.indexOf(String(component.get('type') || '')) >= 0) return component;
  const parentComponent = component.parent && component.parent();
  if (!parentComponent || !parentComponent.get) return null;
  return placeholderHostTypes.indexOf(String(parentComponent.get('type') || '')) >= 0 ? parentComponent : null;
};

const watchPlaceholderCopyUpdates = (editor, contentTextDefaults) => {
  editor.on('component:add', (component, options) => {
    if (options && options.temporary) return;
    const hostComponent = resolvePlaceholderHost(component);
    hostComponent && syncPlaceholderMarker(hostComponent, contentTextDefaults, hostComponent === component);
  });
  editor.on('component:remove', (component) => {
    const hostComponent = resolvePlaceholderHost(component);
    hostComponent && hostComponent !== component && syncPlaceholderMarker(hostComponent, contentTextDefaults, false);
  });
  editor.on('component:content', (component) => {
    const hostComponent = resolvePlaceholderHost(component);
    hostComponent && syncPlaceholderMarker(hostComponent, contentTextDefaults, false);
  });
};

export default watchPlaceholderCopyUpdates;
