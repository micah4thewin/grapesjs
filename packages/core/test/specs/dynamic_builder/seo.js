import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildDefaultFaviconLinkMarkup from '../../../src/dynamic-builder/seo/buildDefaultFaviconLinkMarkup';
import buildRobotsTxtContent from '../../../src/dynamic-builder/seo/buildRobotsTxtContent';
import buildSeoHeadMarkup from '../../../src/dynamic-builder/seo/buildSeoHeadMarkup';
import buildSitemapXmlContent from '../../../src/dynamic-builder/seo/buildSitemapXmlContent';
import computeSeoHealthReport from '../../../src/dynamic-builder/seo/computeSeoHealthReport';
import getPageSeoRecord from '../../../src/dynamic-builder/seo/getPageSeoRecord';
import getSiteSeoRecord from '../../../src/dynamic-builder/seo/getSiteSeoRecord';
import listInvalidRobotsLines from '../../../src/dynamic-builder/seo/listInvalidRobotsLines';
import normalizeLanguageCode from '../../../src/dynamic-builder/seo/normalizeLanguageCode';
import resolveOpenGraphLocale from '../../../src/dynamic-builder/seo/resolveOpenGraphLocale';
import resolvePendingPagePath from '../../../src/dynamic-builder/seo/resolvePendingPagePath';
import resolveSeoPreviewValues from '../../../src/dynamic-builder/seo/resolveSeoPreviewValues';
import resolveShareImageUrls from '../../../src/dynamic-builder/seo/resolveShareImageUrls';
import truncateTextAtWordBoundary from '../../../src/dynamic-builder/seo/truncateTextAtWordBoundary';
import truncateTextToLimit from '../../../src/dynamic-builder/seo/truncateTextToLimit';
import updatePageMetaRecord from '../../../src/dynamic-builder/support/updatePageMetaRecord';
import updateSiteMetaRecord from '../../../src/dynamic-builder/support/updateSiteMetaRecord';

describe('Dynamic builder SEO', () => {
  let editor;

  const readModalRoot = () => document.querySelector('[data-db-seo-root]');
  const readField = (fieldKey) => readModalRoot().querySelector('[data-db-seo-field="' + fieldKey + '"]');
  const setFieldValue = (fieldKey, fieldValue) => {
    const fieldElement = readField(fieldKey);
    fieldElement.value = fieldValue;
    fieldElement.dispatchEvent(new Event('input', { bubbles: true }));
    fieldElement.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
  };
  const clickSave = () => readModalRoot().querySelector('[data-db-seo-save]').click();

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
  });

  describe('pure helpers', () => {
    test('og:locale maps bare language codes to a full locale and keeps regions', () => {
      expect(resolveOpenGraphLocale('en')).toBe('en_US');
      expect(resolveOpenGraphLocale('en-gb')).toBe('en_GB');
      expect(resolveOpenGraphLocale('de-AT')).toBe('de_AT');
      expect(resolveOpenGraphLocale('english')).toBe('');
      expect(resolveOpenGraphLocale('')).toBe('');
    });

    test('language codes are normalised to canonical casing', () => {
      expect(normalizeLanguageCode('EN-us')).toBe('en-US');
      expect(normalizeLanguageCode('english')).toBe('english');
    });

    test('robots lines that are not directives are reported', () => {
      expect(listInvalidRobotsLines('Disallow: /drafts\nDissalow: /x\n# note\nhello world')).toEqual([
        'Dissalow: /x',
        'hello world',
      ]);
    });

    test('share images resolve against the canonical base and fall back to the site default', () => {
      const siteSeo = { canonicalBase: 'https://www.acme.test/base/', defaultOgImage: '/images/default.png' };
      expect(resolveShareImageUrls(siteSeo, { ogImage: '/images/share.png' })).toEqual({
        ogImageUrl: 'https://www.acme.test/images/share.png',
        twitterImageUrl: 'https://www.acme.test/images/share.png',
      });
      expect(resolveShareImageUrls(siteSeo, {}).ogImageUrl).toBe('https://www.acme.test/images/default.png');
      expect(resolveShareImageUrls({}, { ogImage: '/images/share.png' }).ogImageUrl).toBe('');
      expect(resolveShareImageUrls({}, { ogImage: 'data:image/png;base64,AAAA' }).ogImageUrl).toBe('');
    });

    test('truncation helpers keep text readable', () => {
      expect(truncateTextToLimit('abcdef', 4)).toBe('abc…');
      expect(truncateTextToLimit('abc', 4)).toBe('abc');
      expect(truncateTextAtWordBoundary('First sentence here. Second one is long enough to be cut.', 40)).toBe(
        'First sentence here.',
      );
    });
  });

  describe('exported head', () => {
    test('og:title uses the bare page title while <title> keeps the site name', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Acme Studio', canonicalBase: 'https://www.acme.test' } });
      updatePageMetaRecord(editor, { seo: { title: 'About Acme' } });
      const headMarkup = buildSeoHeadMarkup(editor, editor.Pages.getSelected());
      expect(headMarkup).toContain('<title>About Acme | Acme Studio</title>');
      expect(headMarkup).toContain('<meta property="og:title" content="About Acme">');
      expect(headMarkup).toContain('<meta name="twitter:title" content="About Acme">');
      expect(headMarkup).toContain('<meta property="og:site_name" content="Acme Studio">');
    });

    test('relative share images become absolute and bare language codes become a full og:locale', () => {
      updateSiteMetaRecord(editor, { seo: { canonicalBase: 'https://www.acme.test', language: 'en' } });
      updatePageMetaRecord(editor, { seo: { ogImage: '/images/share.png' } });
      const headMarkup = buildSeoHeadMarkup(editor, editor.Pages.getSelected());
      expect(headMarkup).toContain('<meta property="og:image" content="https://www.acme.test/images/share.png">');
      expect(headMarkup).toContain('<meta name="twitter:image" content="https://www.acme.test/images/share.png">');
      expect(headMarkup).toContain('<meta property="og:locale" content="en_US">');
    });

    test('the placeholder favicon uses the site initial and honours the defaultFavicon option', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'zeta works' } });
      const linkMarkup = buildDefaultFaviconLinkMarkup(editor);
      expect(linkMarkup).toContain('data:image/svg+xml,');
      expect(decodeURIComponent(linkMarkup)).toContain('>Z</text>');
      editor.getModel().set('dbSeoOptions', { defaultFavicon: false });
      expect(buildDefaultFaviconLinkMarkup(editor)).toBe('');
      editor.getModel().set('dbSeoOptions', { defaultFavicon: '/icon.png' });
      expect(buildDefaultFaviconLinkMarkup(editor)).toBe('<link rel="icon" href="/icon.png">');
    });

    test('robots.txt drops lines that are not directives', () => {
      updateSiteMetaRecord(editor, { seo: { robotsExtra: ['Disallow: /drafts', 'hello world'] } });
      const robotsText = buildRobotsTxtContent(editor);
      expect(robotsText).toContain('Disallow: /drafts');
      expect(robotsText).not.toContain('hello world');
    });

    test('sitemap entries carry lastmod when the page has an updatedAt stamp', () => {
      updateSiteMetaRecord(editor, { seo: { canonicalBase: 'https://www.acme.test' } });
      updatePageMetaRecord(editor, { updatedAt: '2026-09-06T10:20:30.000Z' });
      expect(buildSitemapXmlContent(editor)).toContain(
        '<url><loc>https://www.acme.test/</loc><lastmod>2026-09-06</lastmod></url>',
      );
    });
  });

  describe('preview values', () => {
    test('the home page previews the site root regardless of its slug', () => {
      const siteValues = { canonicalBase: 'https://www.acme.test', siteName: 'Acme' };
      const previewValues = resolveSeoPreviewValues(editor, siteValues, { slug: 'welcome' });
      expect(previewValues.urlText).toBe('https://www.acme.test/');
      expect(previewValues.domainText).toBe('www.acme.test');
    });

    test('other pages preview the derived path with de-duplication and resolved canonical overrides', () => {
      updateSiteMetaRecord(editor, { seo: { canonicalBase: 'https://www.acme.test' } });
      const aboutPage = editor.Pages.add({ name: 'About Us' });
      const secondAbout = editor.Pages.add({ name: 'Team' });
      expect(resolvePendingPagePath(editor, secondAbout, 'about-us')).toBe('about-us-2');
      expect(resolvePendingPagePath(editor, aboutPage, '')).toBe('about-us');
      const previewValues = resolveSeoPreviewValues(
        editor,
        { canonicalBase: 'https://www.acme.test/base' },
        { canonical: 'about' },
        aboutPage,
      );
      expect(previewValues.urlText).toBe('https://www.acme.test/base/about');
    });
  });

  describe('settings modal', () => {
    test('opens on the page tab with the page name and one save button for both tabs', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Acme', canonicalBase: 'https://www.acme.test' } });
      editor.runCommand('db:open-seo-settings');
      const rootElement = readModalRoot();
      expect(rootElement).toBeTruthy();
      expect(rootElement.querySelector('[data-db-seo-tab="page"]').textContent).toContain('This page:');
      expect(rootElement.querySelector('[data-db-seo-tab="page"]').getAttribute('aria-selected')).toBe('true');
      expect(rootElement.querySelectorAll('[data-db-seo-save]').length).toBe(1);
      expect(readField('slug').disabled).toBe(true);
      expect(readField('sitemapExclude').type).toBe('checkbox');
      expect(readField('language').tagName).toBe('SELECT');
      expect(readField('title').getAttribute('aria-describedby')).toContain('gjs-db-seo-help-title');
      expect(rootElement.querySelector('#gjs-db-seo-help-title')).toBeTruthy();
      expect(rootElement.querySelectorAll('[data-db-seo-pick-image]').length).toBeGreaterThanOrEqual(4);
    });

    test('saves both tabs at once, normalises values and closes the modal', () => {
      editor.runCommand('db:open-seo-settings');
      setFieldValue('siteName', 'Acme Studio');
      setFieldValue('canonicalBase', 'https://www.acme.test/base/?x=1#frag');
      setFieldValue('twitterHandle', 'acme');
      setFieldValue('title', 'About Acme');
      readField('sitemapExclude').checked = true;
      clickSave();
      expect(getSiteSeoRecord(editor).canonicalBase).toBe('https://www.acme.test/base');
      expect(getSiteSeoRecord(editor).twitterHandle).toBe('@acme');
      expect(getSiteSeoRecord(editor).siteName).toBe('Acme Studio');
      expect(getPageSeoRecord(editor).title).toBe('About Acme');
      expect(getPageSeoRecord(editor).sitemapExclude).toBe(true);
      expect(editor.Modal.isOpen()).toBe(false);
    });

    test('blocks saving on invalid input and shows an accessible error', () => {
      editor.runCommand('db:open-seo-settings');
      setFieldValue('twitterHandle', 'acme studio');
      setFieldValue('titleTemplate', 'Acme pages');
      clickSave();
      const handleField = readField('twitterHandle');
      expect(handleField.getAttribute('aria-invalid')).toBe('true');
      const errorElement = readModalRoot().querySelector('[data-db-seo-error="twitterHandle"]');
      expect(errorElement.hidden).toBe(false);
      expect(errorElement.textContent).toContain('1 to 15');
      expect(readModalRoot().querySelector('[data-db-seo-error="titleTemplate"]').textContent).toContain('%s');
      expect(getSiteSeoRecord(editor).twitterHandle).toBeUndefined();
      expect(editor.Modal.isOpen()).toBe(true);
    });

    test('closing with unsaved edits prompts instead of discarding silently', () => {
      editor.runCommand('db:open-seo-settings');
      setFieldValue('title', 'Changed title');
      editor.Modal.close();
      return new Promise((resolvePromise) => setTimeout(resolvePromise, 10)).then(() => {
        const promptElement = document.querySelector('.gjs-db-seo-unsaved');
        expect(promptElement).toBeTruthy();
        promptElement.querySelector('[data-db-seo-unsaved-save]').click();
        expect(getPageSeoRecord(editor).title).toBe('Changed title');
        expect(editor.Modal.isOpen()).toBe(false);
      });
    });

    test('the title counter measures the rendered title and warns when short', () => {
      updateSiteMetaRecord(editor, { seo: { siteName: 'Acme' } });
      editor.runCommand('db:open-seo-settings');
      setFieldValue('title', 'Hi');
      const badgeElement = readModalRoot().querySelector('[data-db-seo-counter="title"]');
      expect(badgeElement.textContent).toContain('9 / 60');
      expect(badgeElement.classList.contains('gjs-db-badge-warning')).toBe(true);
      expect(badgeElement.getAttribute('aria-live')).toBeNull();
    });
  });

  describe('health score', () => {
    test('scores the basics and improves as settings are filled', () => {
      const emptyReport = computeSeoHealthReport(editor, null);
      expect(emptyReport.level).toBe('poor');
      expect(emptyReport.findings.map((findingRecord) => findingRecord.checkId)).toContain('description');
      updateSiteMetaRecord(editor, {
        seo: {
          siteName: 'Acme',
          canonicalBase: 'https://www.acme.test',
          language: 'en',
          defaultOgImage: '/share.png',
          favicon: '/icon.png',
        },
      });
      updatePageMetaRecord(editor, {
        seo: { title: 'About Acme', description: 'A description that is comfortably longer than fifty characters.' },
      });
      const filledReport = computeSeoHealthReport(editor, null);
      expect(filledReport.score).toBe(100);
      expect(editor.runCommand('db:seo-health').score).toBe(100);
    });
  });
});
