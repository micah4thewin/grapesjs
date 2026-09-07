import createFindingRecord from './createFindingRecord.js';
import getSiteSeoRecord from '../seo/getSiteSeoRecord.js';

const collectSiteSettingItems = (editor) => {
  const siteSeoRecord = getSiteSeoRecord(editor);
  const items = [];
  if (!String(siteSeoRecord.siteName || '').trim()) {
    items.push(
      createFindingRecord(
        'warning',
        'Site',
        'The site has no name yet.',
        'Browser tabs, search results and the footer all show the site name.',
        { fixId: 'open-site-identity' },
      ),
    );
  }
  if (!String(siteSeoRecord.canonicalBase || '').trim()) {
    items.push(
      createFindingRecord(
        'warning',
        'Site',
        'No website address (canonical base URL) is set.',
        'Enter the address the site will live at, such as https://www.example.com, so links and the sitemap work.',
        { fixId: 'seo-field:canonicalBase' },
      ),
    );
  }
  return items;
};

export default collectSiteSettingItems;
