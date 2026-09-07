import getDialogIconRecords from './getDialogIconRecords.js';

const buildDialogIconMarkupRecord = () => {
  const iconRecords = getDialogIconRecords();
  const markupRecord = {};
  Object.keys(iconRecords).forEach((kindName) => {
    markupRecord[kindName] =
      '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.4"' +
      ' stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">' +
      iconRecords[kindName].markup +
      '</svg>';
  });
  return markupRecord;
};

export default buildDialogIconMarkupRecord;
