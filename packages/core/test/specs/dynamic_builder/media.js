import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyAssetUploadOptimization from '../../../src/dynamic-builder/mediaComponents/applyAssetUploadOptimization';
import applyIconColorStyle from '../../../src/dynamic-builder/icons/applyIconColorStyle';
import buildCssFilterString from '../../../src/dynamic-builder/photoEditor/buildCssFilterString';
import buildGalleryMediaCss from '../../../src/dynamic-builder/mediaComponents/buildGalleryMediaCss';
import computeCropRectangle from '../../../src/dynamic-builder/photoEditor/computeCropRectangle';
import deriveAltTextFromAssetName from '../../../src/dynamic-builder/mediaComponents/deriveAltTextFromAssetName';
import describeUploadSavings from '../../../src/dynamic-builder/mediaComponents/describeUploadSavings';
import describeUploadSkipReason from '../../../src/dynamic-builder/mediaComponents/describeUploadSkipReason';
import estimateDataUrlBytes from '../../../src/dynamic-builder/photoEditor/estimateDataUrlBytes';
import getIconCategoryRecords from '../../../src/dynamic-builder/icons/getIconCategoryRecords';
import handleAssetFileUpload from '../../../src/dynamic-builder/mediaComponents/handleAssetFileUpload';
import matchIconSearchQuery from '../../../src/dynamic-builder/icons/matchIconSearchQuery';
import moveIconGridFocus from '../../../src/dynamic-builder/icons/moveIconGridFocus';
import parseMapLinkCoordinates from '../../../src/dynamic-builder/mediaComponents/parseMapLinkCoordinates';
import parseMediaLinkRecord from '../../../src/dynamic-builder/mediaComponents/parseMediaLinkRecord';
import parseVideoLinkRecord from '../../../src/dynamic-builder/mediaComponents/parseVideoLinkRecord';
import readPhotoControlChange from '../../../src/dynamic-builder/photoEditor/readPhotoControlChange';
import rebuildIconComponentMarkup from '../../../src/dynamic-builder/icons/rebuildIconComponentMarkup';
import resolveCompressedImageFormat from '../../../src/dynamic-builder/mediaComponents/resolveCompressedImageFormat';
import runCarouselBehavior from '../../../src/dynamic-builder/mediaComponents/runCarouselBehavior';
import runGalleryLightboxBehavior from '../../../src/dynamic-builder/mediaComponents/runGalleryLightboxBehavior';
import runLightboxRuntime from '../../../src/dynamic-builder/mediaComponents/runLightboxRuntime';
import runVideoFacadeBehavior from '../../../src/dynamic-builder/mediaComponents/runVideoFacadeBehavior';
import sanitizeSvgAssetRecord from '../../../src/dynamic-builder/icons/sanitizeSvgAssetRecord';
import getPhotoEditState from '../../../src/dynamic-builder/photoEditor/getPhotoEditState';

const stubMatchMedia = () => {
  window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
};

const buildFakeEditor = () => {
  const addedAssets = [];
  const toasts = [];
  return {
    addedAssets,
    toasts,
    Assets: { add: (assetRecord) => addedAssets.push(assetRecord) },
    getContainer: () => {
      const containerElement = document.createElement('div');
      containerElement.addEventListener = () => {};
      const originalAppend = containerElement.appendChild.bind(containerElement);
      containerElement.appendChild = (childElement) => {
        toasts.push(childElement);
        return originalAppend(childElement);
      };
      return containerElement;
    },
    trigger: () => {},
  };
};

describe('Dynamic builder media components', () => {
  describe('pure helpers', () => {
    test('describeUploadSkipReason accepts pictures and explains other files', () => {
      expect(describeUploadSkipReason({ type: 'image/png', name: 'a.png' })).toBe('');
      expect(describeUploadSkipReason({ type: 'text/javascript', name: 'probe.mjs' })).toContain('only pictures');
      expect(describeUploadSkipReason({ type: 'video/mp4', name: 'clip.mp4' })).toContain('paste its link');
    });

    test('describeUploadSavings reports the saving in plain words', () => {
      expect(describeUploadSavings('photo.jpg', 4 * 1024 * 1024, 620 * 1024, 1600)).toBe(
        'photo.jpg: 4.00 MB to 620 KB (85% smaller), 1600 px wide',
      );
      expect(describeUploadSavings('tiny.png', 100, 120, 40)).toBe('tiny.png added at 120 B, 40 px wide');
    });

    test('resolveCompressedImageFormat keeps transparency-friendly formats', () => {
      expect(resolveCompressedImageFormat('image/png')).toBe('image/png');
      expect(resolveCompressedImageFormat('image/webp')).toBe('image/webp');
      expect(resolveCompressedImageFormat('image/jpeg')).toBe('image/jpeg');
    });

    test('deriveAltTextFromAssetName turns file names into readable text', () => {
      expect(deriveAltTextFromAssetName('sunset-beach.jpg', 3)).toBe('Sunset beach');
      expect(deriveAltTextFromAssetName('IMG_2048.JPG', 3)).toBe('Picture 3');
      expect(deriveAltTextFromAssetName('', 1)).toBe('Picture 1');
      expect(deriveAltTextFromAssetName('https://cdn.example.com/photos/parisEiffel.png?x=1', 1)).toBe('Paris Eiffel');
    });

    test('parseVideoLinkRecord recognises YouTube, Vimeo and file links', () => {
      expect(parseVideoLinkRecord('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10')).toEqual({
        provider: 'youtube',
        videoId: 'dQw4w9WgXcQ',
      });
      expect(parseVideoLinkRecord('https://youtu.be/dQw4w9WgXcQ')).toEqual({
        provider: 'youtube',
        videoId: 'dQw4w9WgXcQ',
      });
      expect(parseVideoLinkRecord('https://www.youtube.com/shorts/dQw4w9WgXcQ').videoId).toBe('dQw4w9WgXcQ');
      expect(parseVideoLinkRecord('https://example.com/?sv=dQw4w9WgXcQ')).toBeNull();
      expect(parseVideoLinkRecord('https://vimeo.com/123456789/abcdef01')).toEqual({
        provider: 'vimeo',
        videoId: '123456789',
      });
      expect(parseVideoLinkRecord('https://cdn.example.com/clip.mp4').provider).toBe('file');
    });

    test('parseMapLinkCoordinates reads Google, OpenStreetMap and plain coordinates', () => {
      expect(parseMapLinkCoordinates('https://www.google.com/maps/place/Paris/@48.8566,2.3522,15z/data=x')).toEqual({
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 15,
      });
      expect(parseMapLinkCoordinates('https://www.openstreetmap.org/#map=12/51.5074/-0.1278')).toEqual({
        latitude: 51.5074,
        longitude: -0.1278,
        zoom: 12,
      });
      expect(parseMapLinkCoordinates('https://maps.google.com/?q=40.7128,-74.006&z=11').zoom).toBe(11);
      expect(parseMapLinkCoordinates('40.7128, -74.0060').zoom).toBeNull();
      expect(parseMapLinkCoordinates('https://goo.gl/maps/abc')).toBeNull();
      expect(parseMapLinkCoordinates('@95.1,10.2,3z')).toBeNull();
    });

    test('parseMediaLinkRecord dispatches on the link kind', () => {
      expect(parseMediaLinkRecord('https://youtu.be/dQw4w9WgXcQ').kind).toBe('video');
      expect(parseMediaLinkRecord('https://www.openstreetmap.org/#map=12/51.5/-0.1').kind).toBe('map');
      expect(parseMediaLinkRecord('https://cdn.example.com/a.webp').kind).toBe('image');
      expect(parseMediaLinkRecord('not a link')).toBeNull();
    });

    test('matchIconSearchQuery uses aliases and split names', () => {
      expect(matchIconSearchQuery('mail', 'email envelope contact', 'envelope')).toBe(true);
      expect(matchIconSearchQuery('arrowRight', '', 'arrow right')).toBe(true);
      expect(matchIconSearchQuery('arrowRight', '', 'cart')).toBe(false);
    });

    test('icon categories start with a real popular set and hide builder chrome', () => {
      const categoryRecords = getIconCategoryRecords();
      expect(categoryRecords[0].categoryLabel).toBe('Popular');
      expect(categoryRecords[0].iconNames).toContain('heart');
      expect(categoryRecords[0].iconNames).not.toContain('appShell');
      const allNames = categoryRecords.reduce((names, record) => names.concat(record.iconNames), []);
      expect(allNames).not.toContain('exportBundle');
      expect(allNames).toContain('search');
    });

    test('moveIconGridFocus walks the grid with arrow keys', () => {
      document.body.innerHTML =
        '<div data-db-icon-results><div class="gjs-db-icon-grid">' +
        '<button data-db-icon-choice="a"></button><button data-db-icon-choice="b"></button>' +
        '<button data-db-icon-choice="c"></button></div></div>';
      const resultsElement = document.querySelector('[data-db-icon-results]');
      const cells = resultsElement.querySelectorAll('button');
      expect(moveIconGridFocus(resultsElement, cells[0], 'ArrowRight')).toBe(cells[1]);
      expect(moveIconGridFocus(resultsElement, cells[2], 'ArrowRight')).toBeNull();
      expect(moveIconGridFocus(resultsElement, cells[2], 'Home')).toBe(cells[0]);
      expect(moveIconGridFocus(resultsElement, cells[0], 'x')).toBeNull();
    });

    test('gallery css lets the picture corner shape win over the grid rules', () => {
      const cssText = buildGalleryMediaCss();
      expect(cssText).toContain(':where(.db-gallery-item) img');
      expect(cssText).toContain("[data-db-mobile-columns='2']");
    });

    test('photo editor helpers compute crops, filters, sizes and control changes', () => {
      const editState = getPhotoEditState();
      const cropRect = computeCropRectangle(1000, 500, { ...editState, aspectId: 'square' });
      expect(cropRect.width).toBe(500);
      expect(cropRect.height).toBe(500);
      expect(buildCssFilterString({ ...editState, blur: 2, filterId: 'grayscale' })).toBe(
        'brightness(1) contrast(1) saturate(1) blur(2px) grayscale(1)',
      );
      expect(estimateDataUrlBytes('data:image/png;base64,QUJD')).toBe(3);
      const rangeInput = document.createElement('input');
      rangeInput.setAttribute('name', 'cropWidth');
      rangeInput.value = '50';
      expect(readPhotoControlChange(editState, rangeInput).cropHeight).toBe(0.5);
    });
  });

  describe('upload handler', () => {
    test('skips non-image files with a toast instead of adding broken assets', async () => {
      const fakeEditor = buildFakeEditor();
      const scriptFile = new File(['console.log(1)'], 'probe.mjs', { type: 'text/javascript' });
      await handleAssetFileUpload(fakeEditor, { target: { files: [scriptFile] } }, 1600);
      expect(fakeEditor.addedAssets).toEqual([]);
      expect(fakeEditor.toasts.length).toBeGreaterThan(0);
    });

    test('adds svg and gif pictures without re-encoding them', async () => {
      const fakeEditor = buildFakeEditor();
      const gifFile = new File(['GIF89a'], 'loop.gif', { type: 'image/gif' });
      await handleAssetFileUpload(fakeEditor, { target: { files: [gifFile] } }, 1600);
      expect(fakeEditor.addedAssets.length).toBe(1);
      expect(fakeEditor.addedAssets[0].src.indexOf('data:image/gif')).toBe(0);
      expect(fakeEditor.addedAssets[0].name).toBe('loop.gif');
    });

    test('writes the handler onto the asset manager module config', () => {
      const moduleConfig = {};
      const fakeEditor = {
        AssetManager: { getConfig: () => moduleConfig },
        getConfig: () => ({ assetManager: {} }),
        on: () => {},
      };
      applyAssetUploadOptimization(fakeEditor, {});
      expect(typeof moduleConfig.uploadFile).toBe('function');
    });
  });

  describe('exported runtime scripts', () => {
    beforeEach(() => {
      stubMatchMedia();
      window.dbOpenLightbox = undefined;
      document.body.innerHTML = '';
      document.body.removeAttribute('data-db-editing');
    });

    const buildGalleryMarkup = () =>
      '<div data-db-type="gallery" data-db-lightbox="true">' +
      '<figure><img src="a.png" alt="First"></figure><figure><img src="b.png" alt="Second"></figure>' +
      '<figure><img src="c.png" alt="Third"></figure></div>';

    test('gallery images become keyboard reachable and open the viewer', () => {
      document.body.innerHTML = buildGalleryMarkup();
      runLightboxRuntime();
      runGalleryLightboxBehavior();
      const images = document.querySelectorAll('img');
      expect(images[0].getAttribute('tabindex')).toBe('0');
      expect(images[0].getAttribute('role')).toBe('button');
      images[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      const overlay = document.querySelector('.db-lightbox');
      expect(overlay).not.toBeNull();
      expect(overlay.querySelector('.db-lightbox-counter').textContent).toBe('Image 2 of 3');
      expect(document.documentElement.style.overflow).toBe('hidden');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(document.querySelector('.db-lightbox-counter').textContent).toBe('Image 3 of 3');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(document.querySelector('.db-lightbox-counter').textContent).toBe('Image 1 of 3');
      document.body.focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(document.querySelector('.db-lightbox')).toBeNull();
      expect(document.documentElement.style.overflow).toBe('');
      expect(document.activeElement).toBe(images[1]);
    });

    test('gallery clicks stay inert while the canvas body is marked as editing', () => {
      document.body.innerHTML = buildGalleryMarkup();
      document.body.setAttribute('data-db-editing', 'true');
      runLightboxRuntime();
      runGalleryLightboxBehavior();
      document.querySelector('img').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(document.querySelector('.db-lightbox')).toBeNull();
    });

    const buildCarouselMarkup = (extraAttributes) =>
      '<div data-db-type="carousel" data-db-loop="false" ' +
      extraAttributes +
      '>' +
      '<div data-db-carousel-track><div>1</div><div>2</div></div>' +
      '<button data-db-carousel-prev></button><button data-db-carousel-next></button>' +
      '<button data-db-carousel-pause aria-pressed="false"></button>' +
      '<div data-db-carousel-dots><button class="db-carousel-dot"></button><button class="db-carousel-dot"></button></div>' +
      '<p data-db-carousel-status></p></div>';

    test('carousel honours loop off, labels slides and updates the dots', () => {
      jest.useFakeTimers();
      document.body.innerHTML = buildCarouselMarkup('data-db-autoplay="false"');
      runCarouselBehavior();
      const carousel = document.querySelector('[data-db-type="carousel"]');
      const status = carousel.querySelector('[data-db-carousel-status]');
      expect(status.textContent).toBe('Slide 1 of 2');
      expect(carousel.querySelectorAll('[data-db-carousel-track] > div')[1].getAttribute('aria-label')).toBe(
        'Slide 2 of 2',
      );
      carousel.querySelector('[data-db-carousel-next]').click();
      carousel.querySelector('[data-db-carousel-next]').click();
      expect(status.textContent).toBe('Slide 2 of 2');
      expect(carousel.querySelectorAll('.db-carousel-dot')[1].getAttribute('aria-current')).toBe('true');
      expect(jest.getTimerCount()).toBe(0);
      jest.useRealTimers();
    });

    test('carousel autoplay advances, stops at the end without loop and pauses on demand', () => {
      jest.useFakeTimers();
      document.body.innerHTML = buildCarouselMarkup('data-db-autoplay="true" data-db-interval="2000"');
      runCarouselBehavior();
      const carousel = document.querySelector('[data-db-type="carousel"]');
      const status = carousel.querySelector('[data-db-carousel-status]');
      expect(jest.getTimerCount()).toBe(1);
      jest.advanceTimersByTime(2100);
      expect(status.textContent).toBe('Slide 2 of 2');
      jest.advanceTimersByTime(2100);
      expect(status.textContent).toBe('Slide 2 of 2');
      carousel.querySelector('[data-db-carousel-prev]').click();
      const pauseButton = carousel.querySelector('[data-db-carousel-pause]');
      pauseButton.click();
      expect(pauseButton.getAttribute('aria-pressed')).toBe('true');
      jest.advanceTimersByTime(2100);
      expect(status.textContent).toBe('Slide 1 of 2');
      jest.useRealTimers();
    });

    test('video facade explains a missing video instead of failing silently', () => {
      document.body.innerHTML =
        '<div data-db-type="video" data-db-provider="youtube" data-db-video="">' +
        '<button data-db-video-load>Play</button></div>';
      runVideoFacadeBehavior();
      document.querySelector('[data-db-video-load]').click();
      expect(document.querySelector('iframe')).toBeNull();
      expect(document.querySelector('[data-db-video-missing]').textContent).toContain('not been set up');
    });

    test('video facade builds a no-cookie embed with autoplay from a pasted link', () => {
      document.body.innerHTML =
        '<div data-db-type="video" data-db-provider="youtube" data-db-video="https://youtu.be/dQw4w9WgXcQ">' +
        '<button data-db-video-load>Play</button></div>';
      runVideoFacadeBehavior();
      document.querySelector('[data-db-video-load]').click();
      const frame = document.querySelector('iframe');
      expect(frame.src).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0');
    });
  });

  describe('editor integration', () => {
    let editor;

    beforeEach(() => {
      stubMatchMedia();
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
    });

    test('the upload handler is the one the asset manager will use', () => {
      expect(typeof editor.AssetManager.getConfig().uploadFile).toBe('function');
    });

    test('corner shape swaps the radius class', () => {
      const [image] = editor.addComponents({ type: 'db-image' });
      image.addAttributes({ 'data-db-radius': 'circle' });
      expect(image.getClasses()).toContain('db-radius-circle');
      image.addAttributes({ 'data-db-radius': 'md' });
      expect(image.getClasses()).toContain('db-radius-md');
      expect(image.getClasses()).not.toContain('db-radius-circle');
    });

    test('typing alt text switches a decorative picture back to described', () => {
      const [image] = editor.addComponents({ type: 'db-image' });
      image.addAttributes({ 'data-db-decorative': 'true' });
      expect(image.getAttributes().alt).toBe('');
      expect(image.getAttributes().role).toBe('presentation');
      image.addAttributes({ alt: 'A lovely dog' });
      expect(image.getAttributes().alt).toBe('A lovely dog');
      expect(image.getAttributes()['data-db-decorative']).toBe('false');
      expect(image.getAttributes().role).toBeUndefined();
    });

    test('icon markup is rebuilt only when its state changes and children stay locked', () => {
      const [icon] = editor.addComponents({ type: 'db-icon' });
      const svgChild = icon.components().at(0);
      expect(svgChild.get('type')).toBe('svg');
      expect(svgChild.get('selectable')).toBe(false);
      expect(svgChild.get('layerable')).toBe(false);
      expect(rebuildIconComponentMarkup(editor, icon)).toBe(false);
      icon.addAttributes({ 'data-db-icon-name': 'heart' });
      expect(icon.getInnerHTML()).toContain('<svg');
      expect(rebuildIconComponentMarkup(editor, icon)).toBe(false);
      icon.addAttributes({ 'data-db-icon-decorative': 'false', 'data-db-icon-label': '' });
      expect(icon.toHTML()).toContain('aria-label="heart"');
      expect(icon.toHTML()).not.toContain('aria-hidden');
      expect(icon.toHTML()).toContain('data-db-icon-decorative="false"');
    });

    test('icon colour writes a validated colour style', () => {
      const [icon] = editor.addComponents({ type: 'db-icon' });
      expect(applyIconColorStyle(icon, '#ff0000')).toBe(true);
      expect(icon.getStyle().color).toBe('#ff0000');
      expect(applyIconColorStyle(icon, 'url(javascript:1)')).toBe(true);
      expect(icon.getStyle().color).toBeUndefined();
    });

    test('the icon toolbar button is added from the toolbar itself, not a persisted flag', () => {
      const [icon] = editor.addComponents({ type: 'db-icon' });
      editor.select(icon);
      const toolbarTitles = icon.get('toolbar').map((item) => (item.attributes || {}).title);
      expect(toolbarTitles).toContain('Change icon');
      expect(icon.get('dbIconPickerWired')).toBeUndefined();
      icon.set(
        'toolbar',
        icon.get('toolbar').filter((item) => (item.attributes || {}).title !== 'Change icon'),
      );
      editor.select(null);
      editor.select(icon);
      expect(icon.get('toolbar').filter((item) => (item.attributes || {}).title === 'Change icon').length).toBe(1);
    });

    test('svg assets with scripts are rejected', () => {
      const svgSource =
        'data:image/svg+xml,' +
        encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
      const cleanSource =
        'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><circle r="2"/></svg>');
      const badAsset = editor.Assets.add({ src: svgSource, name: 'bad.svg' });
      sanitizeSvgAssetRecord(editor, badAsset);
      const goodAsset = editor.Assets.add({ src: cleanSource, name: 'good.svg' });
      sanitizeSvgAssetRecord(editor, goodAsset);
      expect(editor.Assets.getAll().filter((asset) => asset.get('name') === 'bad.svg').length).toBe(0);
      expect(editor.Assets.getAll().filter((asset) => asset.get('name') === 'good.svg').length).toBe(1);
    });

    test('gallery captions toggle every item and the paste link fills the map', () => {
      const [gallery] = editor.addComponents({ type: 'db-gallery' });
      gallery.addAttributes({ 'data-db-captions': 'false' });
      gallery.components().forEach((item) => expect(item.getAttributes()['data-db-show-caption']).toBe('false'));
      const [map] = editor.addComponents({ type: 'db-map' });
      map.addAttributes({ 'data-db-paste-link': 'https://www.openstreetmap.org/#map=9/48.8566/2.3522' });
      expect(map.getAttributes()['data-db-lat']).toBe('48.8566');
      expect(map.getAttributes()['data-db-zoom']).toBe('9');
      expect(map.getAttributes()['data-db-paste-link']).toBeUndefined();
      const [video] = editor.addComponents({ type: 'db-video' });
      video.addAttributes({ 'data-db-video': 'https://vimeo.com/123456789' });
      expect(video.getAttributes()['data-db-provider']).toBe('vimeo');
      expect(video.getAttributes()['data-db-video']).toBe('123456789');
    });

    test('adding a slide adds a dot and the add-images command appends a described picture', () => {
      const [carousel] = editor.addComponents({ type: 'db-carousel' });
      const track = carousel.find('[data-db-carousel-track]')[0] || carousel.components().at(0);
      track.append({ type: 'db-carousel-slide' });
      const dots = carousel.components().filter((child) => child.getAttributes()['data-db-carousel-dots'])[0];
      expect(dots.components().length).toBe(4);
      const [gallery] = editor.addComponents({ type: 'db-gallery' });
      editor.select(gallery);
      const asset = editor.Assets.add({ src: 'https://cdn.example.com/sunset-beach.jpg', name: 'sunset-beach.jpg' });
      editor.AssetManager.open = (openOptions) => openOptions.select(asset, true);
      editor.AssetManager.close = () => {};
      editor.runCommand('db:add-gallery-images');
      expect(gallery.components().length).toBe(4);
      const addedImage = gallery.components().at(3).components().at(0);
      expect(addedImage.getAttributes().alt).toBe('Sunset beach');
      expect(addedImage.getAttributes().src).toBe('https://cdn.example.com/sunset-beach.jpg');
    });

    test('facade children are locked so clicks select the map or video itself', () => {
      const [map] = editor.addComponents({ type: 'db-map' });
      const placeholder = map.components().at(0);
      expect(placeholder.get('selectable')).toBe(false);
      placeholder.components().forEach((child) => expect(child.get('selectable')).toBe(false));
      const [video] = editor.addComponents({ type: 'db-video' });
      expect(video.components().at(0).get('selectable')).toBe(false);
      map.addAttributes({ 'data-db-address': 'Paris <b>x</b>' });
      expect(map.toHTML()).toContain('Paris &lt;b&gt;x&lt;/b&gt;');
    });

    test('figure and icon row markup is typed on import', () => {
      const [figure, iconRow] = editor.addComponents(
        '<figure class="db-figure"><img data-db-type="image" src="a.png" alt="A"></figure>' +
          '<div class="db-icon-row"><span data-db-type="icon"></span><p>Hi</p></div>',
      );
      expect(figure.get('type')).toBe('db-figure');
      expect(iconRow.get('type')).toBe('db-icon-row');
    });
  });
});
