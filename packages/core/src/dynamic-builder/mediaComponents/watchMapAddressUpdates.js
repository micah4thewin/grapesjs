import syncFacadeTextChild from './syncFacadeTextChild.js';

const watchMapAddressUpdates = (editor) => {
  const isMapComponent = (component) => Boolean(component && component.is && component.is('db-map'));
  editor.on('component:update:attributes:data-db-address', (component) => {
    if (isMapComponent(component)) syncFacadeTextChild(component, 'data-db-address', 'data-db-map-address');
  });
  editor.on('component:update:attributes:data-db-note', (component) => {
    if (isMapComponent(component)) syncFacadeTextChild(component, 'data-db-note', 'data-db-map-note');
  });
};

export default watchMapAddressUpdates;
