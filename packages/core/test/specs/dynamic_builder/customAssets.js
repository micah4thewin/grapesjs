import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyCustomAssets from '../../../src/dynamic-builder/customAssets/applyCustomAssets';
import buildCustomFontFaceCss from '../../../src/dynamic-builder/customAssets/buildCustomFontFaceCss';
import buildCustomAssetsModalMarkup from '../../../src/dynamic-builder/customAssets/buildCustomAssetsModalMarkup';
import buildFontFamilyPropertyRecord from '../../../src/dynamic-builder/styleSectors/buildFontFamilyPropertyRecord';
import buildFontListMarkup from '../../../src/dynamic-builder/fontLibrary/buildFontListMarkup';
import buildIconPickerGridMarkup from '../../../src/dynamic-builder/icons/buildIconPickerGridMarkup';
import buildIconSvgMarkup from '../../../src/dynamic-builder/icons/buildIconSvgMarkup';
import buildPageDocumentMarkup from '../../../src/dynamic-builder/exporter/buildPageDocumentMarkup';
import cacheCustomAssetRecords from '../../../src/dynamic-builder/customAssets/cacheCustomAssetRecords';
import createLocalCustomFontAdapter from '../../../src/dynamic-builder/customAssets/createLocalCustomFontAdapter';
import createLocalCustomIconAdapter from '../../../src/dynamic-builder/customAssets/createLocalCustomIconAdapter';
import getCustomFontStorageKey from '../../../src/dynamic-builder/customAssets/getCustomFontStorageKey';
import getCustomIconStorageKey from '../../../src/dynamic-builder/customAssets/getCustomIconStorageKey';
import getFontFileFormatName from '../../../src/dynamic-builder/customAssets/getFontFileFormatName';
import getFontLibraryRecords from '../../../src/dynamic-builder/fontLibrary/getFontLibraryRecords';
import getIconCategoryRecords from '../../../src/dynamic-builder/icons/getIconCategoryRecords';
import getIconLibraryNames from '../../../src/dynamic-builder/icons/getIconLibraryNames';
import handleCustomFontUpload from '../../../src/dynamic-builder/customAssets/handleCustomFontUpload';
import handleCustomIconUpload from '../../../src/dynamic-builder/customAssets/handleCustomIconUpload';
import normalizeCustomIconRecord from '../../../src/dynamic-builder/customAssets/normalizeCustomIconRecord';
import openCustomAssetsModal from '../../../src/dynamic-builder/customAssets/openCustomAssetsModal';
import refreshFontFamilyStyleOptions from '../../../src/dynamic-builder/customAssets/refreshFontFamilyStyleOptions';
import registerCustomFontFaces from '../../../src/dynamic-builder/customAssets/registerCustomFontFaces';
import sanitizeCustomIconMarkup from '../../../src/dynamic-builder/customAssets/sanitizeCustomIconMarkup';

const fontSource = 'data:font/woff2;base64,d09GMgABAAAAAAoAAA==';
const safeIconMarkup = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>';
const scriptedIconMarkup =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><script>alert(1)</script></svg>';
const clickableIconMarkup =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path onclick="go()" d="M1 1"/></svg>';

const buildFontRecord = (overrides = {}) => ({
  family: 'Brand Sans',
  weight: 700,
  style: 'normal',
  fileName: 'brand-bold.woff2',
  byteSize: 2048,
  source: fontSource,
  ...overrides,
});

const attachFile = (rootElement, fieldAttribute, fileObject) => {
  const fieldElement = rootElement.querySelector('[' + fieldAttribute + ']');
  Object.defineProperty(fieldElement, 'files', { value: [fileObject], configurable: true });
  return fieldElement;
};

const setFieldValue = (rootElement, fieldAttribute, fieldValue) => {
  const fieldElement = rootElement.querySelector('[' + fieldAttribute + ']');
  fieldElement.value = fieldValue;
  return fieldElement;
};

describe('Dynamic builder custom fonts and icons', () => {
  let editor;

  const clearStoredAssets = () => {
    window.localStorage.removeItem(getCustomFontStorageKey());
    window.localStorage.removeItem(getCustomIconStorageKey());
    cacheCustomAssetRecords('fonts', null);
    cacheCustomAssetRecords('icons', null);
  };

  beforeEach(() => {
    clearStoredAssets();
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    applyCustomAssets(editor, {});
  });

  afterEach(() => {
    editor.destroy();
    clearStoredAssets();
  });

  describe('font storage adapter', () => {
    test('writes, lists and deletes fonts behind a promise api', async () => {
      const fontAdapter = createLocalCustomFontAdapter();
      const savedRecord = await fontAdapter.writeFont(buildFontRecord());
      expect(savedRecord.fontId).toBe('font-brand-sans-700-normal');
      expect(savedRecord.format).toBe('woff2');
      expect(String(window.localStorage.getItem(getCustomFontStorageKey()))).toContain('Brand Sans');
      expect((await fontAdapter.listFonts()).length).toBe(1);
      await fontAdapter.writeFont(buildFontRecord({ fileName: 'brand-bold-again.woff2' }));
      expect((await fontAdapter.listFonts()).length).toBe(1);
      await fontAdapter.writeFont(buildFontRecord({ weight: 400, fileName: 'brand.woff' }));
      expect((await fontAdapter.listFonts()).length).toBe(2);
      await fontAdapter.deleteFont('font-brand-sans-700-normal');
      const remainingRecords = await fontAdapter.listFonts();
      expect(remainingRecords.map((fontRecord) => fontRecord.fontId)).toEqual(['font-brand-sans-400-normal']);
    });

    test('refuses files that are not real font data', async () => {
      const fontAdapter = createLocalCustomFontAdapter();
      await expect(
        fontAdapter.writeFont(buildFontRecord({ source: 'https://fonts.example.com/x.woff2' })),
      ).rejects.toThrow();
      await expect(fontAdapter.writeFont(buildFontRecord({ fileName: 'brand.exe' }))).rejects.toThrow();
      expect(getFontFileFormatName('BRAND.OTF')).toBe('opentype');
      expect(getFontFileFormatName('brand.svg')).toBe('');
    });
  });

  describe('font face css', () => {
    test('builds an at font-face rule the exported site can use', () => {
      const faceCss = buildCustomFontFaceCss([buildFontRecord({ style: 'italic' })]);
      expect(faceCss).toContain('@font-face');
      expect(faceCss).toContain('font-family: "Brand Sans"');
      expect(faceCss).toContain('format("woff2")');
      expect(faceCss).toContain('font-weight: 700');
      expect(faceCss).toContain('font-style: italic');
      expect(faceCss).toContain('font-display: swap');
      expect(faceCss).toContain(fontSource);
    });

    test('skips records that could break out of the css rule', () => {
      expect(buildCustomFontFaceCss([buildFontRecord({ source: 'data:font/woff2,");}body{x:1' })])).toBe('');
      expect(buildCustomFontFaceCss([{ family: '', source: fontSource, fileName: 'a.woff2' }])).toBe('');
    });
  });

  describe('uploaded fonts across the editor', () => {
    beforeEach(async () => {
      await createLocalCustomFontAdapter().writeFont(buildFontRecord());
      cacheCustomAssetRecords('fonts', null);
    });

    test('offers the family in the font library and the style manager', () => {
      const customRecord = getFontLibraryRecords().filter((fontRecord) => fontRecord.family === 'Brand Sans')[0];
      expect(customRecord).toBeTruthy();
      expect(customRecord.category).toBe('custom');
      expect(buildFontListMarkup('display', '', 'custom', '')).toContain('Brand Sans');
      const familyOptions = buildFontFamilyPropertyRecord(editor).options;
      expect(familyOptions.filter((optionRecord) => optionRecord.label === 'Brand Sans').length).toBe(1);
      expect(refreshFontFamilyStyleOptions(editor)).toBe(true);
    });

    test('ships the font face with the exported page and keeps storage keys out of it', () => {
      registerCustomFontFaces(editor);
      editor.getWrapper().components('<h1 style="font-family: Brand Sans">Hello</h1>');
      const documentMarkup = buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {});
      expect(documentMarkup).toContain('@font-face');
      expect(documentMarkup).toContain('Brand Sans');
      expect(documentMarkup).not.toContain('db-fonts:user');
      expect(documentMarkup).not.toContain('localStorage');
    });
  });

  describe('icon safety', () => {
    test('keeps safe svg markup and refuses svg that carries code', () => {
      expect(sanitizeCustomIconMarkup(safeIconMarkup)).toContain('<path');
      expect(sanitizeCustomIconMarkup(scriptedIconMarkup)).toBe('');
      expect(sanitizeCustomIconMarkup(clickableIconMarkup)).toBe('');
      expect(sanitizeCustomIconMarkup('<div>not an icon</div>')).toBe('');
      expect(normalizeCustomIconRecord({ iconName: 'custom:x', label: 'X', markup: scriptedIconMarkup })).toBe(null);
      expect(normalizeCustomIconRecord({ iconName: 'star', label: 'X', markup: safeIconMarkup })).toBe(null);
    });

    test('stores safe icons with a name and search words', async () => {
      const iconAdapter = createLocalCustomIconAdapter();
      const savedRecord = await iconAdapter.writeIcon({
        label: 'Brand mark',
        keywords: 'Logo, BADGE!',
        markup: safeIconMarkup,
      });
      expect(savedRecord.iconName).toBe('custom:brand-mark');
      expect(savedRecord.keywords).toBe('logo badge');
      const secondRecord = await iconAdapter.writeIcon({ label: 'Brand mark', markup: safeIconMarkup });
      expect(secondRecord.iconName).toBe('custom:brand-mark-2');
      expect((await iconAdapter.listIcons()).length).toBe(2);
      await iconAdapter.deleteIcon('custom:brand-mark-2');
      expect((await iconAdapter.listIcons()).length).toBe(1);
      await expect(iconAdapter.writeIcon({ label: 'Bad', markup: scriptedIconMarkup })).rejects.toThrow();
    });
  });

  describe('uploaded icons across the editor', () => {
    beforeEach(async () => {
      await createLocalCustomIconAdapter().writeIcon({
        label: 'Brand mark',
        keywords: 'logo badge',
        markup: safeIconMarkup,
      });
      cacheCustomAssetRecords('icons', null);
    });

    test('adds a My icons category to the picker and keeps the given name', () => {
      expect(getIconLibraryNames()).toContain('custom:brand-mark');
      const customCategory = getIconCategoryRecords().filter((record) => record.categoryId === 'custom')[0];
      expect(customCategory.categoryLabel).toBe('My icons');
      const gridMarkup = buildIconPickerGridMarkup('custom', '', '');
      expect(gridMarkup).toContain('Brand mark');
      expect(gridMarkup).toContain('M4 4h16v16H4z');
      expect(buildIconPickerGridMarkup('all', 'badge', '')).toContain('custom:brand-mark');
    });

    test('renders inside the db-icon component and reaches the exported page', () => {
      const iconMarkup = buildIconSvgMarkup({ iconName: 'custom:brand-mark', size: 32, isDecorative: true });
      expect(iconMarkup).toContain('M4 4h16v16H4z');
      expect(iconMarkup).toContain('width="32"');
      expect(iconMarkup).toContain('aria-hidden="true"');
      const labelledMarkup = buildIconSvgMarkup({
        iconName: 'custom:brand-mark',
        size: 24,
        isDecorative: false,
        accessibleLabel: 'Our badge',
      });
      expect(labelledMarkup).toContain('aria-label="Our badge"');
      const iconComponent = editor.getWrapper().append({ type: 'db-icon' })[0];
      iconComponent.addAttributes({ 'data-db-icon-name': 'custom:brand-mark' });
      expect(iconComponent.getInnerHTML()).toContain('M4 4h16v16H4z');
      expect(buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {})).toContain('M4 4h16v16H4z');
    });
  });

  describe('the custom assets window', () => {
    test('registers the command and lists both tabs', () => {
      expect(editor.Commands.has('db:open-custom-assets')).toBe(true);
      const modalElement = openCustomAssetsModal(editor, 'fonts');
      expect(modalElement).toBeTruthy();
      const tabIds = [...modalElement.querySelectorAll('[data-db-custom-tab]')].map((tabButton) =>
        tabButton.getAttribute('data-db-custom-tab'),
      );
      expect(tabIds).toEqual(['fonts', 'icons']);
      expect(modalElement.querySelector('[data-db-custom-panel="icons"]').hidden).toBe(true);
      modalElement.querySelector('[data-db-custom-tab="icons"]').dispatchEvent(new Event('click', { bubbles: true }));
      expect(modalElement.querySelector('[data-db-custom-panel="icons"]').hidden).toBe(false);
      expect(buildCustomAssetsModalMarkup('icons')).toContain('Only add a font you have the right to use');
    });

    test('uploads a font file and then lists it with a delete action', async () => {
      const modalElement = openCustomAssetsModal(editor, 'fonts');
      attachFile(
        modalElement,
        'data-db-custom-font-file',
        new File(['woff2body'], 'brand.woff2', { type: 'font/woff2' }),
      );
      setFieldValue(modalElement, 'data-db-custom-font-family', 'Brand Sans');
      setFieldValue(modalElement, 'data-db-custom-font-weight', '700');
      await handleCustomFontUpload(editor, modalElement);
      const listMarkup = modalElement.querySelector('[data-db-custom-list="fonts"]').innerHTML;
      expect(listMarkup).toContain('Brand Sans');
      expect(listMarkup).toContain('data-db-custom-delete="fonts"');
      expect(getFontLibraryRecords().filter((record) => record.family === 'Brand Sans').length).toBe(1);
      expect(String(registerCustomFontFaces(editor))).toContain('@font-face');
    });

    test('refuses an svg that carries a script with a plain message', async () => {
      const rejectedNames = [];
      editor.on('db:asset:rejected', (rejectedRecord) => rejectedNames.push(rejectedRecord.name));
      const modalElement = openCustomAssetsModal(editor, 'icons');
      attachFile(
        modalElement,
        'data-db-custom-icon-file',
        new File([scriptedIconMarkup], 'evil.svg', { type: 'image/svg+xml' }),
      );
      setFieldValue(modalElement, 'data-db-custom-icon-name', 'Evil');
      await handleCustomIconUpload(editor, modalElement);
      expect(rejectedNames).toEqual(['evil.svg']);
      expect(await createLocalCustomIconAdapter().listIcons()).toEqual([]);
    });

    test('uploads a safe svg and offers it as a custom icon', async () => {
      const modalElement = openCustomAssetsModal(editor, 'icons');
      attachFile(
        modalElement,
        'data-db-custom-icon-file',
        new File([safeIconMarkup], 'brand-mark.svg', { type: 'image/svg+xml' }),
      );
      setFieldValue(modalElement, 'data-db-custom-icon-name', 'Brand mark');
      setFieldValue(modalElement, 'data-db-custom-icon-keywords', 'logo badge');
      await handleCustomIconUpload(editor, modalElement);
      expect(modalElement.querySelector('[data-db-custom-list="icons"]').innerHTML).toContain('Brand mark');
      expect(getIconLibraryNames()).toContain('custom:brand-mark');
    });
  });
});
