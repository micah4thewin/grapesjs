import buildMediaTraitCategory from './buildMediaTraitCategory.js';

const getMapTraitDefinitions = () => {
  const mapCategory = buildMediaTraitCategory('map', 'Map');
  return [
    {
      type: 'db-url',
      name: 'data-db-paste-link',
      label: 'Paste a map link',
      placeholder: 'Google Maps or OpenStreetMap link',
      category: mapCategory,
    },
    { type: 'number', name: 'data-db-lat', label: 'Latitude', min: -90, max: 90, step: 0.0001, category: mapCategory },
    {
      type: 'number',
      name: 'data-db-lng',
      label: 'Longitude',
      min: -180,
      max: 180,
      step: 0.0001,
      category: mapCategory,
    },
    {
      type: 'db-slider',
      name: 'data-db-zoom',
      label: 'Zoom',
      min: 1,
      max: 19,
      step: 1,
      default: '13',
      category: mapCategory,
    },
    { type: 'text', name: 'data-db-address', label: 'Place name', placeholder: 'City, Country', category: mapCategory },
    { type: 'db-textarea-trait', name: 'data-db-note', label: 'Note shown before loading', category: mapCategory },
  ];
};

export default getMapTraitDefinitions;
