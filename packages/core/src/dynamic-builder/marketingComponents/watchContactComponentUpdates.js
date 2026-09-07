import isComponentOfType from './isComponentOfType.js';
import readContactDetailsFromAttributes from './readContactDetailsFromAttributes.js';
import saveContactDetailsToSiteMeta from './saveContactDetailsToSiteMeta.js';
import syncContactDetails from './syncContactDetails.js';

const watchContactComponentUpdates = (editor) => {
  ['data-db-address', 'data-db-phone', 'data-db-email'].forEach((attributeName) => {
    editor.on('component:update:attributes:' + attributeName, (component) => {
      if (!isComponentOfType(component, 'db-contact')) return;
      syncContactDetails(component);
      saveContactDetailsToSiteMeta(editor, readContactDetailsFromAttributes(component));
    });
  });
};

export default watchContactComponentUpdates;
