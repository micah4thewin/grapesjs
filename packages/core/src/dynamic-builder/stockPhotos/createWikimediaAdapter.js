import buildSearchRequestUrl from './buildSearchRequestUrl.js';
import buildStockPhotoSearchResult from './buildStockPhotoSearchResult.js';
import fetchStockPhotoJson from './fetchStockPhotoJson.js';
import normalizeWikimediaPhotoRecord from './normalizeWikimediaPhotoRecord.js';
import readSearchPageNumber from './readSearchPageNumber.js';
import readSearchPageSize from './readSearchPageSize.js';

const wikimediaEndpointUrl = 'https://commons.wikimedia.org/w/api.php';

// Wikimedia Commons needs no key, answers cross-origin requests when origin=*
// is sent, and serves its files with open CORS headers, so the pictures can be
// fetched, shrunk and stored with the site instead of hot-linked.
const createWikimediaAdapter = (adapterOptions = {}) => ({
  describeProvider: () => ({
    providerId: 'wikimedia',
    providerName: 'Wikimedia Commons',
    providerUrl: 'https://commons.wikimedia.org',
    licenceSummary: 'Openly licensed pictures from museums, archives and photographers. Most ask for a credit.',
    needsKey: false,
  }),
  searchPhotos: (searchQuery, pageNumber) => {
    const requestedPage = readSearchPageNumber(pageNumber);
    const pageSize = readSearchPageSize(adapterOptions);
    return fetchStockPhotoJson(
      buildSearchRequestUrl(String(adapterOptions.endpointUrl || wikimediaEndpointUrl), {
        action: 'query',
        format: 'json',
        formatversion: 2,
        origin: '*',
        generator: 'search',
        gsrnamespace: 6,
        gsrsearch: 'filetype:bitmap ' + String(searchQuery || '').trim(),
        gsrlimit: pageSize,
        gsroffset: (requestedPage - 1) * pageSize,
        prop: 'imageinfo',
        iiprop: 'url|size|mime|extmetadata',
        iiurlwidth: 1600,
        iiextmetadatafilter: 'Artist|Credit|LicenseShortName|LicenseUrl|ImageDescription',
      }),
    ).then((payloadRecord) => {
      const queryRecord = (payloadRecord && payloadRecord.query) || {};
      const searchInfo = queryRecord.searchinfo || {};
      return buildStockPhotoSearchResult(
        queryRecord.pages,
        normalizeWikimediaPhotoRecord,
        searchInfo.totalhits,
        Boolean(payloadRecord && payloadRecord.continue && payloadRecord.continue.gsroffset),
      );
    });
  },
});

export default createWikimediaAdapter;
