import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyStockPhotoToComponent from '../../../src/dynamic-builder/stockPhotos/applyStockPhotoToComponent';
import applyStockPhotos from '../../../src/dynamic-builder/stockPhotos/applyStockPhotos';
import buildStockPhotoAltText from '../../../src/dynamic-builder/stockPhotos/buildStockPhotoAltText';
import buildStockPhotoAssetRecord from '../../../src/dynamic-builder/stockPhotos/buildStockPhotoAssetRecord';
import buildStockPhotoAttribution from '../../../src/dynamic-builder/stockPhotos/buildStockPhotoAttribution';
import buildStockPhotoCardMarkup from '../../../src/dynamic-builder/stockPhotos/buildStockPhotoCardMarkup';
import buildStockPhotoFileName from '../../../src/dynamic-builder/stockPhotos/buildStockPhotoFileName';
import chooseStockPhoto from '../../../src/dynamic-builder/stockPhotos/chooseStockPhoto';
import createOpenverseAdapter from '../../../src/dynamic-builder/stockPhotos/createOpenverseAdapter';
import createPexelsAdapter from '../../../src/dynamic-builder/stockPhotos/createPexelsAdapter';
import createUnsplashAdapter from '../../../src/dynamic-builder/stockPhotos/createUnsplashAdapter';
import describeStockPhotoAddedText from '../../../src/dynamic-builder/stockPhotos/describeStockPhotoAddedText';
import describeStockPhotoState from '../../../src/dynamic-builder/stockPhotos/describeStockPhotoState';
import normalizeOpenversePhotoRecord from '../../../src/dynamic-builder/stockPhotos/normalizeOpenversePhotoRecord';
import normalizePexelsPhotoRecord from '../../../src/dynamic-builder/stockPhotos/normalizePexelsPhotoRecord';
import normalizeUnsplashPhotoRecord from '../../../src/dynamic-builder/stockPhotos/normalizeUnsplashPhotoRecord';
import resolveStockPhotoOptions from '../../../src/dynamic-builder/stockPhotos/resolveStockPhotoOptions';

const openversePhotoPayload = {
  id: 'ov-1',
  title: 'Sunlit beach',
  creator: 'Ada Lovelace',
  creator_url: 'https://example.org/ada',
  url: 'https://images.example.org/beach.jpg',
  thumbnail: 'https://images.example.org/beach-thumb.jpg',
  foreign_landing_url: 'https://example.org/photo/1',
  license: 'by-sa',
  license_version: '4.0',
  license_url: 'https://creativecommons.org/licenses/by-sa/4.0/',
  width: 4000,
  height: 3000,
};

const openverseSearchPayload = {
  result_count: 42,
  page_count: 3,
  results: [openversePhotoPayload, { id: 'ov-2', title: 'Unsafe', url: 'javascript:alert(1)' }],
};

const buildFakeResponse = (payloadRecord, statusCode) => ({
  ok: (statusCode || 200) < 400,
  status: statusCode || 200,
  json: () => Promise.resolve(payloadRecord),
});

const waitForCondition = async (readCondition) => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (readCondition()) return true;
    await new Promise((resolveWait) => setTimeout(resolveWait, 10));
  }
  return readCondition();
};

const buildFakeAdapter = (photoRecords, hasMore) => ({
  describeProvider: () => ({
    providerId: 'test',
    providerName: 'Test photos',
    licenceSummary: 'Free for any project.',
    needsKey: false,
  }),
  searchPhotos: (searchQuery, pageNumber) =>
    Promise.resolve({
      photos: photoRecords.map((photoRecord) => ({ ...photoRecord, description: photoRecord.description })),
      totalCount: 40,
      hasMore: Boolean(hasMore) && pageNumber < 2,
    }),
});

describe('Dynamic builder stock photos', () => {
  const openversePhoto = normalizeOpenversePhotoRecord(openversePhotoPayload);

  describe('provider adapters', () => {
    afterEach(() => {
      delete global.fetch;
    });

    test('the Openverse adapter needs no key and normalises the rows it gets back', async () => {
      const requestCalls = [];
      global.fetch = (requestUrl, requestInit) => {
        requestCalls.push({ requestUrl, requestInit });
        return Promise.resolve(buildFakeResponse(openverseSearchPayload));
      };
      const searchResult = await createOpenverseAdapter().searchPhotos('beach', 2);
      expect(requestCalls[0].requestUrl).toContain('api.openverse.org');
      expect(requestCalls[0].requestUrl).toContain('q=beach');
      expect(requestCalls[0].requestUrl).toContain('page=2');
      expect(requestCalls[0].requestInit.headers).toEqual({});
      expect(searchResult.photos.length).toBe(1);
      expect(searchResult.hasMore).toBe(true);
      expect(searchResult.totalCount).toBe(42);
      expect(searchResult.photos[0].photographerName).toBe('Ada Lovelace');
      expect(searchResult.photos[0].licenceName).toBe('CC BY SA 4.0');
      expect(searchResult.photos[0].requiresAttribution).toBe(true);
    });

    test('the Unsplash adapter sends the key as a header and never in the address', async () => {
      const requestCalls = [];
      global.fetch = (requestUrl, requestInit) => {
        requestCalls.push({ requestUrl, requestInit });
        return Promise.resolve(
          buildFakeResponse({
            total: 5,
            total_pages: 1,
            results: [
              {
                id: 'un-1',
                alt_description: 'a quiet desk',
                urls: { small: 'https://img.example/small.jpg', regular: 'https://img.example/regular.jpg' },
                links: { html: 'https://unsplash.example/photo/un-1' },
                user: { name: 'Grace Hopper', links: { html: 'https://unsplash.example/@grace' } },
              },
            ],
          }),
        );
      };
      const unsplashAdapter = createUnsplashAdapter({ apiKey: 'secret-key' });
      const searchResult = await unsplashAdapter.searchPhotos('desk', 1);
      expect(requestCalls[0].requestUrl).not.toContain('secret-key');
      expect(requestCalls[0].requestInit.headers.Authorization).toBe('Client-ID secret-key');
      expect(unsplashAdapter.describeProvider().providerName).toBe('Unsplash');
      expect(searchResult.hasMore).toBe(false);
      expect(searchResult.photos[0].downloadUrl).toBe('https://img.example/regular.jpg');
      expect(searchResult.photos[0].licenceName).toBe('Unsplash licence');
    });

    test('the Pexels adapter asks for a sensible width and reads the paging flag', async () => {
      const requestCalls = [];
      global.fetch = (requestUrl, requestInit) => {
        requestCalls.push({ requestUrl, requestInit });
        return Promise.resolve(
          buildFakeResponse({
            total_results: 90,
            next_page: 'https://api.pexels.com/v1/search?page=2',
            photos: [
              {
                id: 12,
                alt: 'green plant',
                photographer: 'Mary Jackson',
                photographer_url: 'https://pexels.example/@mary',
                url: 'https://pexels.example/photo/12',
                src: { original: 'https://img.pexels.example/12.jpg', medium: 'https://img.pexels.example/12-m.jpg' },
              },
            ],
          }),
        );
      };
      const searchResult = await createPexelsAdapter({ apiKey: 'pex-key' }).searchPhotos('plant', 1);
      expect(requestCalls[0].requestInit.headers.Authorization).toBe('pex-key');
      expect(searchResult.hasMore).toBe(true);
      expect(searchResult.photos[0].downloadUrl).toContain('w=1600');
      expect(searchResult.photos[0].thumbnailUrl).toBe('https://img.pexels.example/12-m.jpg');
    });

    test('service problems come back as sentences an owner can act on', async () => {
      global.fetch = () => Promise.resolve(buildFakeResponse({}, 401));
      await expect(createUnsplashAdapter({ apiKey: 'bad' }).searchPhotos('desk', 1)).rejects.toThrow(/key/);
      global.fetch = () => Promise.resolve(buildFakeResponse({}, 429));
      await expect(createOpenverseAdapter().searchPhotos('desk', 1)).rejects.toThrow(/busy/);
      global.fetch = () => Promise.reject(new Error('offline'));
      await expect(createOpenverseAdapter().searchPhotos('desk', 1)).rejects.toThrow(/offline/);
    });
  });

  describe('result normalisation', () => {
    test('rows without a usable picture address are dropped', () => {
      expect(normalizeOpenversePhotoRecord({ url: 'javascript:alert(1)' })).toBeNull();
      expect(normalizeOpenversePhotoRecord({})).toBeNull();
      expect(normalizeUnsplashPhotoRecord(null)).toBeNull();
      expect(normalizePexelsPhotoRecord({ src: { original: 'ftp://img.example/x.jpg' } })).toBeNull();
    });

    test('public domain pictures do not demand a credit, licensed ones do', () => {
      const publicDomainRecord = normalizeOpenversePhotoRecord({ ...openversePhotoPayload, license: 'cc0' });
      expect(publicDomainRecord.licenceName).toBe('CC0 (public domain)');
      expect(publicDomainRecord.requiresAttribution).toBe(false);
      expect(openversePhoto.requiresAttribution).toBe(true);
    });

    test('missing photographers and thumbnails fall back to something sensible', () => {
      const sparseRecord = normalizeOpenversePhotoRecord({ url: 'https://img.example/a.jpg' });
      expect(sparseRecord.photographerName).toBe('Unknown photographer');
      expect(sparseRecord.thumbnailUrl).toBe('https://img.example/a.jpg');
      expect(sparseRecord.licenceName).toBe('Open licence');
    });
  });

  describe('attribution', () => {
    test('the credit names the photographer, the service and the licence', () => {
      expect(buildStockPhotoAttribution(openversePhoto)).toBe('Photo by Ada Lovelace on Openverse (CC BY SA 4.0)');
      expect(buildStockPhotoAttribution(null)).toBe('');
    });

    test('alt text keeps the credit when no caption carries it', () => {
      expect(buildStockPhotoAltText(openversePhoto, true)).toBe('Sunlit beach');
      expect(buildStockPhotoAltText(openversePhoto, false)).toBe(
        'Sunlit beach - Photo by Ada Lovelace on Openverse (CC BY SA 4.0)',
      );
      expect(buildStockPhotoAltText({ ...openversePhoto, description: '' }, false)).toBe(
        'Photo by Ada Lovelace on Openverse (CC BY SA 4.0)',
      );
    });

    test('the asset record stores the credit next to the picture', () => {
      const assetRecord = buildStockPhotoAssetRecord(openversePhoto, null, 0);
      expect(assetRecord.type).toBe('image');
      expect(assetRecord.src).toBe('https://images.example.org/beach.jpg');
      expect(assetRecord.dbPhotographer).toBe('Ada Lovelace');
      expect(assetRecord.dbSourceUrl).toBe('https://example.org/photo/1');
      expect(assetRecord.dbLicence).toBe('CC BY SA 4.0');
      expect(assetRecord.dbAttribution).toBe('Photo by Ada Lovelace on Openverse (CC BY SA 4.0)');
      expect(assetRecord.dbRequiresAttribution).toBe(true);
      expect(buildStockPhotoFileName(openversePhoto)).toBe('sunlit-beach-openverse.jpg');
    });

    test('the compressed record keeps the stored size for the savings message', () => {
      const compressedAsset = { src: 'data:image/jpeg;base64,' + 'a'.repeat(400), width: 1600, height: 1200 };
      const assetRecord = buildStockPhotoAssetRecord(openversePhoto, compressedAsset, 4000);
      expect(assetRecord.width).toBe(1600);
      expect(assetRecord.dbOriginalBytes).toBe(4000);
      expect(assetRecord.dbStoredBytes).toBeGreaterThan(0);
      expect(describeStockPhotoAddedText(assetRecord, true)).toContain('Photo placed on the page');
      expect(describeStockPhotoAddedText(assetRecord, false)).toContain('Photo saved to your pictures');
      expect(describeStockPhotoAddedText(buildStockPhotoAssetRecord(openversePhoto, null, 0), false)).toContain(
        'still loading from Openverse',
      );
    });

    test('result cards show the credit and escape anything hostile in it', () => {
      const cardMarkup = buildStockPhotoCardMarkup(
        { ...openversePhoto, photographerName: '<img src=x onerror=alert(1)>' },
        3,
      );
      expect(cardMarkup).toContain('data-db-stock-choose="3"');
      expect(cardMarkup).toContain('CC BY SA 4.0');
      expect(cardMarkup).toContain('creativecommons.org');
      expect(cardMarkup).not.toContain('<img src=x');
      expect(cardMarkup).toContain('&lt;img src=x onerror=alert(1)&gt;');
      expect(cardMarkup.split('<img').length).toBe(2);
    });
  });

  describe('provider choice', () => {
    test('with no settings at all the free Openverse library is used', () => {
      const moduleOptions = resolveStockPhotoOptions({});
      expect(moduleOptions.enabled).toBe(true);
      expect(moduleOptions.provider.providerId).toBe('openverse');
      expect(moduleOptions.missingProviderNotice).toBe('');
      expect(moduleOptions.maxImageDimension).toBe(1600);
    });

    test('a named provider with a key wins, and a key alone picks its service', () => {
      expect(resolveStockPhotoOptions({ stockPhotos: { provider: 'pexels', apiKey: 'k' } }).provider.providerId).toBe(
        'pexels',
      );
      expect(resolveStockPhotoOptions({ stockPhotos: { keys: { unsplash: 'k' } } }).provider.providerId).toBe(
        'unsplash',
      );
      const suppliedAdapter = buildFakeAdapter([]);
      expect(resolveStockPhotoOptions({ stockPhotos: { adapter: suppliedAdapter } }).adapter).toBe(suppliedAdapter);
    });

    test('a provider without its key explains what is missing instead of failing', () => {
      const moduleOptions = resolveStockPhotoOptions({ stockPhotos: { provider: 'unsplash' } });
      expect(moduleOptions.adapter).toBeNull();
      expect(moduleOptions.missingProviderNotice).toContain('Unsplash');
      expect(moduleOptions.missingProviderNotice).toContain('access key');
      const stateRecord = describeStockPhotoState({ photos: [], query: '' }, moduleOptions);
      expect(stateRecord.statusText).toBe('No picture service is connected');
      expect(stateRecord.emptyText).toContain('Unsplash');
    });

    test('the empty state invites a search before anything is typed', () => {
      const moduleOptions = resolveStockPhotoOptions({});
      expect(describeStockPhotoState({ photos: [], query: '' }, moduleOptions).emptyText).toContain('Search above');
      expect(describeStockPhotoState({ photos: [], query: 'beach' }, moduleOptions).emptyText).toContain(
        'No photos matched beach',
      );
      expect(describeStockPhotoState({ photos: [], loading: true }, moduleOptions).statusText).toContain('Searching');
    });
  });

  describe('with an editor', () => {
    let editor;

    const openStockPhotos = (stockPhotoOptions) => {
      applyStockPhotos(editor, { stockPhotos: stockPhotoOptions || {} });
      editor.runCommand('db:open-stock-photos');
      return document.querySelector('[data-db-stock-root]');
    };

    const addImageComponent = () => {
      const wrapperComponent = editor.getWrapper();
      const imageComponent = wrapperComponent.append({ type: 'db-image' })[0];
      editor.select(imageComponent);
      return imageComponent;
    };

    beforeEach(() => {
      document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
      editor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [fixJsDom, grapesjs.dynamicBuilder],
      });
      fixJsDomIframe(editor.getModel().shallow);
    });

    afterEach(() => {
      editor.destroy();
      delete global.fetch;
    });

    test('the command opens a modal that explains where the photos come from', () => {
      const modalElement = openStockPhotos();
      expect(editor.Commands.has('db:open-stock-photos')).toBe(true);
      expect(editor.Modal.isOpen()).toBe(true);
      expect(modalElement.textContent).toContain('Openverse');
      expect(modalElement.querySelector('[data-db-stock-search]')).toBeTruthy();
      expect(modalElement.querySelectorAll('[data-db-stock-suggestion]').length).toBeGreaterThan(3);
      expect(modalElement.querySelector('.gjs-db-stock-empty').textContent).toContain('Search above');
    });

    test('an unconfigured provider shows a friendly note instead of an error', () => {
      const modalElement = openStockPhotos({ provider: 'pexels' });
      expect(modalElement.querySelector('[data-db-stock-search]').disabled).toBe(true);
      expect(modalElement.querySelector('.gjs-db-stock-empty').textContent).toContain('Pexels');
      expect(modalElement.querySelector('[data-db-stock-status]').textContent).toContain('No picture service');
    });

    test('a search fills the grid with thumbnails and credits', async () => {
      const modalElement = openStockPhotos({ adapter: buildFakeAdapter([openversePhoto], true) });
      modalElement.querySelector('[data-db-stock-search]').value = 'beach';
      modalElement.querySelector('[data-db-stock-form]').dispatchEvent(new Event('submit', { bubbles: true }));
      await waitForCondition(() => modalElement.querySelectorAll('[data-db-stock-choose]').length > 0);
      expect(modalElement.querySelectorAll('[data-db-stock-choose]').length).toBe(1);
      expect(modalElement.querySelector('.gjs-db-stock-credit').textContent).toContain('Ada Lovelace');
      expect(modalElement.querySelector('.gjs-db-stock-credit').textContent).toContain('CC BY SA 4.0');
      expect(modalElement.querySelector('[data-db-stock-status]').textContent).toContain('photos for beach');
      expect(modalElement.querySelector('[data-db-stock-more]').hidden).toBe(false);
    });

    test('choosing a photo stores the credit on the asset and on the picked image', async () => {
      global.fetch = () => Promise.reject(new Error('no network in tests'));
      const imageComponent = addImageComponent();
      applyStockPhotos(editor, { stockPhotos: {} });
      await chooseStockPhoto(editor, resolveStockPhotoOptions({}), openversePhoto);
      const assetRecords = editor.AssetManager.getAll();
      const storedAsset = assetRecords.at(assetRecords.length - 1);
      expect(storedAsset.get('src')).toBe('https://images.example.org/beach.jpg');
      expect(storedAsset.get('dbAttribution')).toBe('Photo by Ada Lovelace on Openverse (CC BY SA 4.0)');
      expect(storedAsset.get('dbLicenceUrl')).toContain('creativecommons.org');
      const imageAttributes = imageComponent.getAttributes();
      expect(imageAttributes.src).toBe('https://images.example.org/beach.jpg');
      expect(imageAttributes.alt).toContain('Sunlit beach');
      expect(imageAttributes['data-db-photo-credit']).toContain('Ada Lovelace');
      expect(imageAttributes['data-db-photo-source']).toBe('https://example.org/photo/1');
    });

    test('a picture with a caption gets the credit in the caption instead of the alt text', () => {
      const figureComponent = editor.getWrapper().append({ type: 'db-figure' })[0];
      const imageComponent = figureComponent.components().at(0);
      expect(applyStockPhotoToComponent(imageComponent, openversePhoto, 'https://img.example/a.jpg')).toBe(true);
      expect(figureComponent.components().at(1).getInnerHTML()).toContain('Photo by Ada Lovelace');
      expect(imageComponent.getAttributes().alt).toBe('Sunlit beach');
    });

    test('a selected picture offers free photos in its toolbar', () => {
      applyStockPhotos(editor, { stockPhotos: {} });
      const imageComponent = addImageComponent();
      const toolbarItems = imageComponent.get('toolbar') || [];
      expect(toolbarItems.some((toolbarItem) => toolbarItem.command === 'db:open-stock-photos')).toBe(true);
    });

    test('the assets panel offers a way in to the photo search', async () => {
      applyStockPhotos(editor, { stockPhotos: {} });
      editor.runCommand('core:open-assets');
      const readStockButton = () => editor.AssetManager.getContainer().querySelector('[data-db-stock-open]');
      await waitForCondition(() => Boolean(readStockButton()));
      expect(readStockButton()).toBeTruthy();
      expect(readStockButton().textContent).toContain('free photo');
      editor.Modal.close();
    });
  });
});
