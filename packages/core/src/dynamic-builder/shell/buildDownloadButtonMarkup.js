import getIconMarkup from '../support/getIconMarkup.js';

const buildDownloadButtonMarkup = () =>
  [
    '<button type="button" class="gjs-db-button gjs-db-button-primary gjs-db-download-button"',
    ' data-db-command="db:download-site" title="Download the full site as a zip archive">',
    getIconMarkup('download', { size: 15 }),
    '<span>Download</span>',
    '</button>',
  ].join('');

export default buildDownloadButtonMarkup;
