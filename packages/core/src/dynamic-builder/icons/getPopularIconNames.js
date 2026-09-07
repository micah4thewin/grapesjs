import getIconLibraryNames from './getIconLibraryNames.js';

const popularIconNames = [
  'star',
  'heart',
  'check',
  'arrowRight',
  'mail',
  'phone',
  'mapPin',
  'cart',
  'user',
  'users',
  'calendar',
  'clock',
  'play',
  'search',
  'menu',
  'globe',
  'shield',
  'zap',
  'home',
  'gift',
  'camera',
  'lightbulb',
  'rocket',
  'truck',
];

const getPopularIconNames = () => {
  const libraryNames = getIconLibraryNames();
  return popularIconNames.filter((iconName) => libraryNames.indexOf(iconName) >= 0);
};

export default getPopularIconNames;
