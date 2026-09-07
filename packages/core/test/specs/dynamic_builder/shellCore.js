import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildTopBarMarkup from '../../../src/dynamic-builder/shell/buildTopBarMarkup';
import deleteSitePage from '../../../src/dynamic-builder/shell/deleteSitePage';
import duplicateSitePage from '../../../src/dynamic-builder/shell/duplicateSitePage';
import ensureMainPageName from '../../../src/dynamic-builder/shell/ensureMainPageName';
import formatStatusTimeText from '../../../src/dynamic-builder/shell/formatStatusTimeText';
import getNewPageStarterComponents from '../../../src/dynamic-builder/shell/getNewPageStarterComponents';
import getSaveStatusTexts from '../../../src/dynamic-builder/shell/getSaveStatusTexts';
import matchesPageFileHref from '../../../src/dynamic-builder/shell/matchesPageFileHref';
import resolvePageFileName from '../../../src/dynamic-builder/support/resolvePageFileName';
import rewritePageLinkHrefs from '../../../src/dynamic-builder/shell/rewritePageLinkHrefs';
import setSitePageAsHome from '../../../src/dynamic-builder/shell/setSitePageAsHome';
import showActionToastNotice from '../../../src/dynamic-builder/support/showActionToastNotice';
import splitHomeSymbolChildren from '../../../src/dynamic-builder/shell/splitHomeSymbolChildren';
import toggleEditorThemeMode from '../../../src/dynamic-builder/shell/toggleEditorThemeMode';
import validatePageName from '../../../src/dynamic-builder/shell/validatePageName';

describe('Dynamic builder shell core', () => {
  describe('pure helpers', () => {
    test('matchesPageFileHref recognises page file links with prefixes and fragments', () => {
      expect(matchesPageFileHref('about.html', 'about')).toBe(true);
      expect(matchesPageFileHref('./about.html#team', 'about')).toBe(true);
      expect(matchesPageFileHref('/about.html?ref=nav', 'about')).toBe(true);
      expect(matchesPageFileHref('about-us.html', 'about')).toBe(false);
      expect(matchesPageFileHref('#about', 'about')).toBe(false);
    });

    test('formatStatusTimeText is relative and unambiguous across days', () => {
      const nowTime = new Date(2026, 8, 7, 10, 30, 0);
      expect(formatStatusTimeText(new Date(2026, 8, 7, 10, 29, 30).toISOString(), nowTime)).toBe('just now');
      expect(formatStatusTimeText(new Date(2026, 8, 7, 9, 5, 0).toISOString(), nowTime)).toBe('at 09:05');
      expect(formatStatusTimeText(new Date(2026, 8, 6, 23, 59, 0).toISOString(), nowTime)).toBe('yesterday at 23:59');
      expect(formatStatusTimeText(new Date(2026, 7, 30, 8, 0, 0).toISOString(), nowTime)).toBe('30 Aug at 08:00');
      expect(formatStatusTimeText('not a date')).toBe('');
    });

    test('getSaveStatusTexts covers the dirty and error states in plain language', () => {
      expect(getSaveStatusTexts('dirty', '', '').label).toBe('Unsaved changes');
      expect(getSaveStatusTexts('error', '', 'Storage is full').label).toBe('Not saved');
      expect(getSaveStatusTexts('error', '', 'Storage is full').title).toContain('Storage is full');
      expect(getSaveStatusTexts('idle', '', '').title).toContain('Autosaved in this browser');
    });

    test('new pages start with a level one heading', () => {
      const headingRecord = getNewPageStarterComponents('About us')[0].components[0].components[0];
      expect(headingRecord.tagName).toBe('h1');
      expect(headingRecord.attributes['data-db-level']).toBe('1');
    });

    test('splitHomeSymbolChildren separates leading and trailing reusable components', () => {
      const buildChild = (typeName, symbolId) => ({
        get: (keyName) => (keyName === 'type' ? typeName : ''),
        getAttributes: () => ({ 'data-db-symbol': symbolId || '' }),
      });
      const fakePage = {
        getMainComponent: () => ({
          components: () => ({
            models: [
              buildChild('db-symbol', 'nav'),
              buildChild('db-section', ''),
              buildChild('db-symbol', 'mid'),
              buildChild('db-section', ''),
              buildChild('db-symbol', 'footer'),
            ],
          }),
        }),
      };
      expect(splitHomeSymbolChildren(fakePage)).toEqual({ topSymbolIds: ['nav'], bottomSymbolIds: ['footer'] });
    });
  });

  describe('with an editor', () => {
    let editor;

    beforeEach(() => {
      document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
      editor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [
          fixJsDom,
          (editorInstance) => grapesjs.dynamicBuilder(editorInstance, { shell: { firstRunWizard: false } }),
        ],
      });
      fixJsDomIframe(editor.getModel().shallow);
    });

    afterEach(() => {
      editor.destroy();
      try {
        window.localStorage.clear();
      } catch (storageError) {
        editor = null;
      }
    });

    test('the main page is named Home so a second Home page is rejected', () => {
      ensureMainPageName(editor);
      expect(editor.Pages.getMain().getName()).toBe('Home');
      expect(validatePageName(editor, 'Home', '').isValid).toBe(false);
      expect(validatePageName(editor, 'home', '').isValid).toBe(false);
      expect(validatePageName(editor, 'index', '').isValid).toBe(false);
      expect(validatePageName(editor, 'About', '').isValid).toBe(true);
      expect(validatePageName(editor, 'Welcome', String(editor.Pages.getMain().getId())).isValid).toBe(true);
    });

    test('renaming a page rewrites links that pointed at its old file name', () => {
      const aboutPage = editor.Pages.add({ name: 'About', component: '<p>about</p>' });
      editor.getWrapper().append('<a class="probe-link" href="about.html#team">About</a>');
      expect(resolvePageFileName(editor, aboutPage)).toBe('about');
      aboutPage.setName('Our team');
      const rewrittenCount = rewritePageLinkHrefs(editor, 'about', resolvePageFileName(editor, aboutPage));
      expect(rewrittenCount).toBe(1);
      expect(editor.getWrapper().components().last().getAttributes().href).toBe('our-team.html#team');
    });

    test('the home page cannot be deleted', () => {
      editor.Pages.add({ name: 'About', component: '<p>about</p>' });
      deleteSitePage(editor, editor.Pages.getMain().getId());
      expect(editor.Pages.getAll().length).toBe(2);
    });

    test('setting another page as home swaps index.html and follows the links', () => {
      ensureMainPageName(editor);
      const aboutPage = editor.Pages.add({
        name: 'About',
        component: '<a class="home-link" href="index.html">Home</a>',
      });
      editor.getWrapper().append('<a class="about-link" href="about.html">About</a>');
      expect(setSitePageAsHome(editor, aboutPage.getId())).toBe(true);
      expect(editor.Pages.getMain()).toBe(aboutPage);
      expect(resolvePageFileName(editor, aboutPage)).toBe('index');
      expect(editor.Pages.getAll()[0]).toBe(aboutPage);
      const previousHome = editor.Pages.getAll()[1];
      expect(previousHome.getMainComponent().components().last().getAttributes().href).toBe('index.html');
      expect(aboutPage.getMainComponent().components().first().getAttributes().href).toBe('home.html');
    });

    test('duplicating a page copies its content under a unique name', () => {
      const aboutPage = editor.Pages.add({ name: 'About', component: '<p class="about-copy">about</p>' });
      const copiedPage = duplicateSitePage(editor, aboutPage.getId());
      expect(copiedPage.getName()).toBe('About copy');
      expect(copiedPage.getMainComponent().toHTML()).toContain('about-copy');
      expect(duplicateSitePage(editor, aboutPage.getId()).getName()).toBe('About copy 2');
    });

    test('the top bar honours brand and sound options and names the pages trigger', () => {
      ensureMainPageName(editor);
      const defaultMarkup = buildTopBarMarkup(editor, {}, {});
      expect(defaultMarkup).toContain('Dynamic Builder toolbar');
      expect(defaultMarkup).toContain('data-db-sound-toggle');
      expect(defaultMarkup).toContain('aria-label="Pages: Home"');
      expect(defaultMarkup).toContain('Save a snapshot');
      const quietMarkup = buildTopBarMarkup(editor, { brandLabel: '' }, { sound: false });
      expect(quietMarkup).not.toContain('gjs-db-shell-brand-group');
      expect(quietMarkup).not.toContain('data-db-sound-toggle');
      expect(quietMarkup).toContain('aria-label="Editor toolbar"');
    });

    test('the theme toggle stores a scoped preference and returns to system on the way back', () => {
      const pluginOptions = { persistence: { storageKey: 'db-project:probe' }, theme: {} };
      const containerElement = editor.getContainer();
      expect(toggleEditorThemeMode(editor, pluginOptions)).toBe('dark');
      expect(containerElement.getAttribute('data-theme')).toBe('dark');
      expect(window.localStorage.getItem('db-editor:db-project:probe:theme')).toBe('dark');
      expect(toggleEditorThemeMode(editor, pluginOptions)).toBe('light');
      expect(containerElement.getAttribute('data-theme')).toBeNull();
      expect(window.localStorage.getItem('db-editor:db-project:probe:theme')).toBeNull();
      expect(window.localStorage.getItem('db-editor-theme')).toBeNull();
    });

    test('action toasts expose an undo button, a dismiss control and an alert role for errors', () => {
      const actionCalls = [];
      const toastHandle = showActionToastNotice(editor, 'Deleted "About"', {
        kind: 'error',
        actionLabel: 'Undo',
        onAction: () => actionCalls.push('undo'),
      });
      const toastElement = toastHandle.toastElement;
      expect(toastElement.getAttribute('role')).toBe('alert');
      expect(toastElement.querySelector('[data-db-toast-close]')).not.toBeNull();
      expect(window.getComputedStyle(toastElement).pointerEvents).not.toBe('none');
      toastElement.querySelector('[data-db-toast-action]').click();
      expect(actionCalls).toEqual(['undo']);
      expect(toastElement.classList.contains('gjs-db-toast-visible')).toBe(false);
    });

    test('page actions are registered as commands so the palette can reach them', () => {
      ['db:rename-page', 'db:duplicate-page', 'db:delete-page', 'db:open-page-settings', 'db:open-site-wizard'].forEach(
        (commandId) => expect(editor.Commands.has(commandId)).toBe(true),
      );
    });
  });
});
