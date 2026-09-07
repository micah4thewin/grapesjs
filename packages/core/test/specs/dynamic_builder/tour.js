import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyEditedPhotoToAsset from '../../../src/dynamic-builder/photoEditor/applyEditedPhotoToAsset';
import applyGuidedTour from '../../../src/dynamic-builder/tour/applyGuidedTour';
import describeAssetEditOffer from '../../../src/dynamic-builder/photoEditor/describeAssetEditOffer';
import getDriverCdnRecord from '../../../src/dynamic-builder/tour/getDriverCdnRecord';
import getTourStepRecords from '../../../src/dynamic-builder/tour/getTourStepRecords';
import isEditableImageAsset from '../../../src/dynamic-builder/photoEditor/isEditableImageAsset';
import positionTourPopover from '../../../src/dynamic-builder/tour/positionTourPopover';
import resolveTourSettings from '../../../src/dynamic-builder/tour/resolveTourSettings';
import resolveTourStepTargets from '../../../src/dynamic-builder/tour/resolveTourStepTargets';
import shouldOfferAssetPhotoEdit from '../../../src/dynamic-builder/photoEditor/shouldOfferAssetPhotoEdit';

const pixelSource =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

const waitForCondition = async (readCondition) => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (readCondition()) return true;
    await new Promise((resolveWait) => setTimeout(resolveWait, 10));
  }
  return readCondition();
};

const buildFakeAsset = (assetRecord) => ({ get: (fieldName) => assetRecord[fieldName] });

const buildFakePopover = (widthValue, heightValue) => ({
  style: {},
  attributes: {},
  getBoundingClientRect: () => ({ width: widthValue, height: heightValue }),
  setAttribute: (attributeName, attributeValue) => {
    buildFakePopover.lastSide = attributeValue;
    return attributeName;
  },
});

describe('Dynamic builder guided tour', () => {
  describe('tour content and settings', () => {
    test('the tour stays short and gives every step one plain idea', () => {
      const stepRecords = getTourStepRecords();
      expect(stepRecords.length).toBeGreaterThanOrEqual(6);
      expect(stepRecords.length).toBeLessThanOrEqual(8);
      expect(new Set(stepRecords.map((stepRecord) => stepRecord.id)).size).toBe(stepRecords.length);
      stepRecords.forEach((stepRecord) => {
        expect(stepRecord.selector.length).toBeGreaterThan(3);
        expect(stepRecord.title.length).toBeLessThan(46);
        expect(stepRecord.description.length).toBeLessThan(190);
      });
      const stepIds = stepRecords.map((stepRecord) => stepRecord.id);
      expect(stepIds).toEqual(expect.arrayContaining(['blocks-dock', 'stage', 'inspector', 'pages', 'preview']));
    });

    test('the driver.js copy is pinned to one version with a hash for both files', () => {
      const cdnRecord = getDriverCdnRecord();
      expect(cdnRecord.scriptUrl).toContain(`driver.js/${cdnRecord.version}/`);
      expect(cdnRecord.styleUrl).toContain(`driver.js/${cdnRecord.version}/`);
      expect(cdnRecord.scriptIntegrity.indexOf('sha384-')).toBe(0);
      expect(cdnRecord.styleIntegrity.indexOf('sha384-')).toBe(0);
    });

    test('default settings load the pinned copy and keep the tour switched on', () => {
      const tourSettings = resolveTourSettings({});
      expect(tourSettings.enabled).toBe(true);
      expect(tourSettings.autoStart).toBe(true);
      expect(tourSettings.scriptUrl).toBe(getDriverCdnRecord().scriptUrl);
      expect(tourSettings.integrity).toBe(getDriverCdnRecord().scriptIntegrity);
    });

    test('a self-hosted copy drops the pinned hash unless the site gives its own', () => {
      const selfHosted = resolveTourSettings({ tour: { driverScriptUrl: '/vendor/driver.js' } });
      expect(selfHosted.scriptUrl).toBe('/vendor/driver.js');
      expect(selfHosted.integrity).toBe('');
      const withHash = resolveTourSettings({ tour: { driverScriptUrl: '/vendor/driver.js', integrity: 'sha384-x' } });
      expect(withHash.integrity).toBe('sha384-x');
      expect(resolveTourSettings({ tour: { driverScriptUrl: '' } }).scriptUrl).toBe('');
      expect(resolveTourSettings({ tour: { enabled: false } }).enabled).toBe(false);
    });

    test('steps whose element is missing are skipped instead of pointing at nothing', () => {
      const hostElement = document.createElement('div');
      hostElement.innerHTML = '<div data-db-stage-canvas></div><aside data-db-inspector></aside>';
      const stepRecords = resolveTourStepTargets(hostElement);
      expect(stepRecords.length).toBe(2);
      expect(stepRecords.map((stepRecord) => stepRecord.id)).toEqual(['stage', 'inspector']);
      expect(resolveTourStepTargets(null)).toEqual([]);
    });

    test('the popover moves to the other side when there is no room and stays on screen', () => {
      const popoverElement = buildFakePopover(320, 200);
      const tightRect = { left: 700, right: 780, top: 40, bottom: 90 };
      positionTourPopover(popoverElement, tightRect, 'right', 800, 600);
      expect(buildFakePopover.lastSide).toBe('left');
      expect(Number(popoverElement.style.left.replace('px', ''))).toBeGreaterThanOrEqual(12);
      const cornerRect = { left: 780, right: 800, top: 560, bottom: 600 };
      positionTourPopover(popoverElement, cornerRect, 'bottom', 800, 600);
      expect(Number(popoverElement.style.left.replace('px', ''))).toBeLessThanOrEqual(800 - 320 - 12);
      expect(Number(popoverElement.style.top.replace('px', ''))).toBeLessThanOrEqual(600 - 200 - 12);
    });
  });

  describe('running in the editor', () => {
    let editor;

    const mountEditor = (tourOptions) => {
      window.Element.prototype.scrollIntoView = () => {};
      document.body.innerHTML = '<div id="db-editor"></div>';
      const builtEditor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [
          fixJsDom,
          (editorInstance) => {
            grapesjs.dynamicBuilder(editorInstance, { shell: { firstRunWizard: false } });
            applyGuidedTour(editorInstance, { tour: { driverScriptUrl: '', startDelay: 10, ...(tourOptions || {}) } });
          },
        ],
      });
      fixJsDomIframe(builtEditor.getModel().shallow);
      return new Promise((resolve) => builtEditor.onReady(() => setTimeout(() => resolve(builtEditor), 10)));
    };

    const readTourRoot = () => document.querySelector('[data-db-tour-root]');

    beforeEach(() => {
      try {
        window.localStorage.clear();
      } catch (storageError) {
        editor = null;
      }
    });

    afterEach(() =>
      new Promise((resolve) => setTimeout(resolve, 20)).then(() => {
        editor && editor.destroy();
        editor = null;
      }),
    );

    test('the tour runs itself on a first launch and never comes back after that', async () => {
      editor = await mountEditor();
      expect(await waitForCondition(() => Boolean(readTourRoot()))).toBe(true);
      expect(readTourRoot().querySelector('[data-db-tour-title]').textContent.length).toBeGreaterThan(5);
      expect(readTourRoot().querySelector('[data-db-tour-progress]').textContent).toContain('Step 1 of');
      expect(window.localStorage.getItem('db-editor:db-editor:guided-tour')).toBe('seen');
      editor.destroy();
      editor = await mountEditor();
      await new Promise((resolve) => setTimeout(resolve, 60));
      expect(readTourRoot()).toBeNull();
    });

    test('every step offers a skip button that closes the tour at once', async () => {
      editor = await mountEditor();
      await waitForCondition(() => Boolean(readTourRoot()));
      const rootElement = readTourRoot();
      rootElement.querySelector('[data-db-tour-next]').click();
      expect(rootElement.querySelector('[data-db-tour-progress]').textContent).toContain('Step 2 of');
      expect(rootElement.querySelector('[data-db-tour-skip]').textContent).toBe('Skip tour');
      rootElement.querySelector('[data-db-tour-skip]').click();
      expect(readTourRoot()).toBeNull();
    });

    test('Escape closes the tour and the editor keeps working', async () => {
      editor = await mountEditor();
      await waitForCondition(() => Boolean(readTourRoot()));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      expect(readTourRoot()).toBeNull();
      expect(editor.getContainer().querySelector('[data-db-workspace]')).toBeTruthy();
    });

    test('the help control and the command both bring the tour back', async () => {
      editor = await mountEditor();
      await waitForCondition(() => Boolean(readTourRoot()));
      readTourRoot().querySelector('[data-db-tour-skip]').click();
      const helpButton = editor.getContainer().querySelector('[data-db-tour-help]');
      expect(helpButton).toBeTruthy();
      expect(helpButton.getAttribute('aria-label')).toContain('Show me around');
      helpButton.click();
      expect(await waitForCondition(() => Boolean(readTourRoot()))).toBe(true);
      readTourRoot().querySelector('[data-db-tour-skip]').click();
      expect(editor.Commands.has('db:open-tour')).toBe(true);
      editor.runCommand('db:open-tour');
      expect(await waitForCondition(() => Boolean(readTourRoot()))).toBe(true);
      readTourRoot().querySelector('[data-db-tour-skip]').click();
    });

    test('the popover keeps focus inside itself and every control is a real button', async () => {
      editor = await mountEditor();
      await waitForCondition(() => Boolean(readTourRoot()));
      const rootElement = readTourRoot();
      const buttonElements = Array.from(rootElement.querySelectorAll('button'));
      expect(buttonElements.length).toBeGreaterThanOrEqual(3);
      buttonElements.forEach((buttonElement) => expect(buttonElement.getAttribute('type')).toBe('button'));
      const popoverElement = rootElement.querySelector('[data-db-tour-popover]');
      expect(popoverElement.getAttribute('role')).toBe('dialog');
      rootElement.querySelector('[data-db-tour-next]').focus();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      expect(popoverElement.contains(document.activeElement)).toBe(true);
      rootElement.querySelector('[data-db-tour-skip]').click();
    });

    test('driver.js drives the tour whenever the library is available', async () => {
      const driveCalls = [];
      window.driver = {
        js: {
          driver: (configRecord) => {
            driveCalls.push(configRecord);
            return { drive: () => driveCalls.push('drive'), destroy: () => driveCalls.push('destroy') };
          },
        },
      };
      editor = await mountEditor({ driverScriptUrl: 'https://cdn.example/driver.js' });
      await waitForCondition(() => driveCalls.length > 1);
      expect(driveCalls[0].steps.length).toBeGreaterThanOrEqual(6);
      expect(driveCalls[0].popoverClass).toContain('gjs-db-tour-popover');
      expect(driveCalls[0].allowClose).toBe(true);
      expect(driveCalls[0].steps[0].popover.title.length).toBeGreaterThan(5);
      expect(driveCalls).toContain('drive');
      delete window.driver;
    });
  });

  describe('editing a picture straight after it arrives', () => {
    let editor;

    const mountPhotoEditor = () => {
      window.Element.prototype.scrollIntoView = () => {};
      document.body.innerHTML = '<div id="db-photo-editor"></div>';
      const builtEditor = grapesjs.init({
        container: '#db-photo-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [
          fixJsDom,
          (editorInstance) => grapesjs.dynamicBuilder(editorInstance, { shell: { firstRunWizard: false } }),
        ],
      });
      fixJsDomIframe(builtEditor.getModel().shallow);
      return new Promise((resolve) => builtEditor.onReady(() => setTimeout(() => resolve(builtEditor), 450)));
    };

    const readOfferToast = () => document.querySelector('[data-db-photo-offer]');

    afterEach(() =>
      new Promise((resolve) => setTimeout(resolve, 20)).then(() => {
        editor && editor.destroy();
        editor = null;
      }),
    );

    test('a picture that arrives from an upload offers a way straight into the editor', async () => {
      editor = await mountPhotoEditor();
      editor.Assets.add({ type: 'image', src: pixelSource, name: 'beach.png', dbOriginalBytes: 9000 });
      expect(await waitForCondition(() => Boolean(readOfferToast()))).toBe(true);
      const toastElement = readOfferToast();
      expect(toastElement.textContent).toContain('beach.png');
      expect(toastElement.querySelector('[data-db-toast-action]').textContent).toBe('Edit photo');
      expect(toastElement.querySelector('[data-db-toast-close]')).toBeTruthy();
      expect(editor.Modal.isOpen()).toBe(false);
    });

    test('pictures that arrive with a saved project stay quiet', async () => {
      editor = await mountPhotoEditor();
      editor.Assets.add({ type: 'image', src: pixelSource, name: 'stored.png' });
      editor.trigger('project:load', { initial: false });
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(readOfferToast()).toBeNull();
    });

    test('drawings and moving pictures are left alone', () => {
      expect(shouldOfferAssetPhotoEdit(buildFakeAsset({ type: 'image', src: pixelSource }))).toBe(true);
      expect(isEditableImageAsset(buildFakeAsset({ type: 'image', src: 'https://x.test/logo.svg' }))).toBe(false);
      expect(isEditableImageAsset(buildFakeAsset({ type: 'image', src: 'data:image/gif;base64,AA' }))).toBe(false);
      expect(isEditableImageAsset(buildFakeAsset({ type: 'image', src: '' }))).toBe(false);
      const editedAsset = buildFakeAsset({ type: 'image', src: pixelSource, dbEditedAt: 12 });
      expect(shouldOfferAssetPhotoEdit(editedAsset)).toBe(false);
      expect(isEditableImageAsset(editedAsset)).toBe(true);
      expect(describeAssetEditOffer(buildFakeAsset({ name: 'beach.png' }))).toContain('beach.png');
    });

    test('the picture library gives every photo its own edit button', async () => {
      editor = await mountPhotoEditor();
      editor.Assets.add({ type: 'image', src: pixelSource, name: 'hero.png' });
      editor.runCommand('core:open-assets');
      const readEditButton = () => editor.AssetManager.getContainer().querySelector('[data-db-asset-photo-edit]');
      expect(await waitForCondition(() => Boolean(readEditButton()))).toBe(true);
      expect(readEditButton().textContent).toContain('Edit photo');
      expect(readEditButton().getAttribute('title')).toContain('Crop');
      editor.Modal.close();
    });

    test('editing a stored picture swaps it everywhere the site already uses it', async () => {
      editor = await mountPhotoEditor();
      const assetModel = editor.Assets.add({ type: 'image', src: pixelSource, name: 'hero.png' });
      const imageComponent = editor.getWrapper().append({ type: 'image', src: pixelSource })[0];
      const changedCount = applyEditedPhotoToAsset(editor, assetModel, `${pixelSource}AA`);
      expect(changedCount).toBe(1);
      expect(assetModel.get('src')).toBe(`${pixelSource}AA`);
      expect(assetModel.get('dbEditedAt')).toBeGreaterThan(0);
      expect(imageComponent.getAttributes().src).toBe(`${pixelSource}AA`);
      expect(applyEditedPhotoToAsset(editor, assetModel, `${pixelSource}AA`)).toBe(0);
    });

    test('the library command opens the pictures panel when no picture is named', async () => {
      editor = await mountPhotoEditor();
      expect(editor.Commands.has('db:edit-asset-photo')).toBe(true);
      editor.runCommand('db:edit-asset-photo');
      expect(editor.Modal.isOpen()).toBe(true);
      editor.Modal.close();
    });
  });
});
