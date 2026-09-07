import getIconPathLibrary from '../support/getIconPathLibrary.js';
import listCustomIconNames from '../customAssets/listCustomIconNames.js';

const getIconLibraryNames = () =>
  [...Object.keys(getIconPathLibrary()), ...listCustomIconNames()].sort((firstName, secondName) =>
    firstName.localeCompare(secondName),
  );

export default getIconLibraryNames;
