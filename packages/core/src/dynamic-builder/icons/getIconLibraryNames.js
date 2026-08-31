import getIconPathLibrary from '../support/getIconPathLibrary.js';

const getIconLibraryNames = () =>
  Object.keys(getIconPathLibrary()).sort((firstName, secondName) => firstName.localeCompare(secondName));

export default getIconLibraryNames;
