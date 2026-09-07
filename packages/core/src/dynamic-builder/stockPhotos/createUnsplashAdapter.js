import buildSearchRequestUrl from './buildSearchRequestUrl.js';
import buildStockPhotoSearchResult from './buildStockPhotoSearchResult.js';
import fetchStockPhotoJson from './fetchStockPhotoJson.js';
import normalizeUnsplashPhotoRecord from './normalizeUnsplashPhotoRecord.js';
import readSearchPageNumber from './readSearchPageNumber.js';
import readSearchPageSize from './readSearchPageSize.js';

const unsplashEndpointUrl = 'https://api.unsplash.com/search/photos';

const createUnsplashAdapter = (adapterOptions = {}) => ({
  describeProvider: () => ({
    providerId: 'unsplash',
    providerName: 'Unsplash',
    providerUrl: 'https://unsplash.com',
    licenceSummary: 'Free to use for any project. Unsplash asks you to credit the photographer.',
    needsKey: true,
  }),
  searchPhotos: (searchQuery, pageNumber) => {
    const requestedPage = readSearchPageNumber(pageNumber);
    return fetchStockPhotoJson(
      buildSearchRequestUrl(String(adapterOptions.endpointUrl || unsplashEndpointUrl), {
        query: String(searchQuery || '').trim(),
        page: requestedPage,
        per_page: readSearchPageSize(adapterOptions),
        content_filter: 'high',
      }),
      { Authorization: 'Client-ID ' + String(adapterOptions.apiKey || ''), 'Accept-Version': 'v1' },
    ).then((payloadRecord) =>
      buildStockPhotoSearchResult(
        payloadRecord && payloadRecord.results,
        normalizeUnsplashPhotoRecord,
        payloadRecord && payloadRecord.total,
        payloadRecord && requestedPage < Number(payloadRecord.total_pages || 0),
      ),
    );
  },
});

export default createUnsplashAdapter;
