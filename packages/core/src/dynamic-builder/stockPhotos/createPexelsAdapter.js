import buildSearchRequestUrl from './buildSearchRequestUrl.js';
import buildStockPhotoSearchResult from './buildStockPhotoSearchResult.js';
import fetchStockPhotoJson from './fetchStockPhotoJson.js';
import normalizePexelsPhotoRecord from './normalizePexelsPhotoRecord.js';
import readSearchPageNumber from './readSearchPageNumber.js';
import readSearchPageSize from './readSearchPageSize.js';

const pexelsEndpointUrl = 'https://api.pexels.com/v1/search';

const createPexelsAdapter = (adapterOptions = {}) => ({
  describeProvider: () => ({
    providerId: 'pexels',
    providerName: 'Pexels',
    providerUrl: 'https://www.pexels.com',
    licenceSummary: 'Free to use for any project. Pexels asks you to credit the photographer.',
    needsKey: true,
  }),
  searchPhotos: (searchQuery, pageNumber) =>
    fetchStockPhotoJson(
      buildSearchRequestUrl(String(adapterOptions.endpointUrl || pexelsEndpointUrl), {
        query: String(searchQuery || '').trim(),
        page: readSearchPageNumber(pageNumber),
        per_page: readSearchPageSize(adapterOptions),
      }),
      { Authorization: String(adapterOptions.apiKey || '') },
    ).then((payloadRecord) =>
      buildStockPhotoSearchResult(
        payloadRecord && payloadRecord.photos,
        normalizePexelsPhotoRecord,
        payloadRecord && payloadRecord.total_results,
        payloadRecord && Boolean(payloadRecord.next_page),
      ),
    ),
});

export default createPexelsAdapter;
