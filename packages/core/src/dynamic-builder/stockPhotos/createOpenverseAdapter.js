import buildSearchRequestUrl from './buildSearchRequestUrl.js';
import buildStockPhotoSearchResult from './buildStockPhotoSearchResult.js';
import fetchStockPhotoJson from './fetchStockPhotoJson.js';
import normalizeOpenversePhotoRecord from './normalizeOpenversePhotoRecord.js';
import readSearchPageNumber from './readSearchPageNumber.js';
import readSearchPageSize from './readSearchPageSize.js';

const openverseEndpointUrl = 'https://api.openverse.org/v1/images/';

const createOpenverseAdapter = (adapterOptions = {}) => ({
  describeProvider: () => ({
    providerId: 'openverse',
    providerName: 'Openverse',
    providerUrl: 'https://openverse.org',
    licenceSummary: 'Openly licensed pictures from museums, archives and photo sites. Most ask for a credit.',
    needsKey: false,
  }),
  searchPhotos: (searchQuery, pageNumber) => {
    const requestedPage = readSearchPageNumber(pageNumber);
    return fetchStockPhotoJson(
      buildSearchRequestUrl(String(adapterOptions.endpointUrl || openverseEndpointUrl), {
        q: String(searchQuery || '').trim(),
        page: requestedPage,
        page_size: readSearchPageSize(adapterOptions),
        license_type: 'all-cc,commercial',
        mature: 'false',
      }),
    ).then((payloadRecord) =>
      buildStockPhotoSearchResult(
        payloadRecord && payloadRecord.results,
        normalizeOpenversePhotoRecord,
        payloadRecord && payloadRecord.result_count,
        payloadRecord && requestedPage < Number(payloadRecord.page_count || 0),
      ),
    );
  },
});

export default createOpenverseAdapter;
