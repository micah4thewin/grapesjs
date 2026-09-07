import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import appendAccordionItem from '../../../src/dynamic-builder/interactiveComponents/appendAccordionItem';
import appendSocialProfileFromUrl from '../../../src/dynamic-builder/interactiveComponents/appendSocialProfileFromUrl';
import appendTabPair from '../../../src/dynamic-builder/interactiveComponents/appendTabPair';
import applyDefaultTabSelection from '../../../src/dynamic-builder/interactiveComponents/applyDefaultTabSelection';
import applySocialProfileUrl from '../../../src/dynamic-builder/interactiveComponents/applySocialProfileUrl';
import buildBreadcrumbFromPages from '../../../src/dynamic-builder/interactiveComponents/buildBreadcrumbFromPages';
import buildInteractiveBaseCss from '../../../src/dynamic-builder/interactiveComponents/buildInteractiveBaseCss';
import buildNavbarLinksFromPages from '../../../src/dynamic-builder/interactiveComponents/buildNavbarLinksFromPages';
import buildMenuItemRowsMarkup from '../../../src/dynamic-builder/traits/buildMenuItemRowsMarkup';
import detectSocialNetworkFromUrl from '../../../src/dynamic-builder/interactiveComponents/detectSocialNetworkFromUrl';
import getTimeZoneOffsetOptions from '../../../src/dynamic-builder/interactiveComponents/getTimeZoneOffsetOptions';
import insertBreadcrumbStep from '../../../src/dynamic-builder/interactiveComponents/insertBreadcrumbStep';
import readAccordionItemRecords from '../../../src/dynamic-builder/interactiveComponents/readAccordionItemRecords';
import readBreadcrumbStepRecords from '../../../src/dynamic-builder/interactiveComponents/readBreadcrumbStepRecords';
import readTabPairRecords from '../../../src/dynamic-builder/interactiveComponents/readTabPairRecords';
import removeBreadcrumbStepAt from '../../../src/dynamic-builder/interactiveComponents/removeBreadcrumbStepAt';
import removeTabPairAt from '../../../src/dynamic-builder/interactiveComponents/removeTabPairAt';
import resyncAutoNavigation from '../../../src/dynamic-builder/interactiveComponents/resyncAutoNavigation';
import revealAccordionItemInCanvas from '../../../src/dynamic-builder/interactiveComponents/revealAccordionItemInCanvas';
import revealTabPanelInCanvas from '../../../src/dynamic-builder/interactiveComponents/revealTabPanelInCanvas';
import syncAnnouncementLink from '../../../src/dynamic-builder/interactiveComponents/syncAnnouncementLink';
import syncNavbarLogo from '../../../src/dynamic-builder/interactiveComponents/syncNavbarLogo';
import writeComponentTextContent from '../../../src/dynamic-builder/interactiveComponents/writeComponentTextContent';

describe('Dynamic builder interactive components', () => {
  let editor;

  const namesOf = (component) => {
    const collected = [];
    component.onAll((child) => collected.push(child.getName()));
    return collected;
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
  });

  describe('navbar', () => {
    test('structural inner parts are locked and named', () => {
      const navbar = editor.getWrapper().append({ type: 'db-navbar' })[0];
      const names = namesOf(navbar);
      expect(names).toContain('Menu button');
      expect(names).toContain('Menu backdrop');
      expect(names).toContain('Menu panel');
      expect(names).toContain('Close menu button');
      const burger = navbar
        .components()
        .at(0)
        .components()
        .find((child) => child.getName() === 'Menu button');
      expect(burger.get('selectable')).toBe(false);
      expect(burger.get('removable')).toBe(false);
      expect(burger.components().at(0).get('selectable')).toBe(false);
    });

    test('ships a close button and the CTA label from text defaults', () => {
      const navbar = editor.getWrapper().append({ type: 'db-navbar' })[0];
      const markup = navbar.toHTML();
      expect(markup).toContain('data-db-navbar-close');
      expect(markup).toContain('Get in touch');
      expect(markup).toContain('db-navbar-brand-text');
    });

    test('sticky rule no longer creates a containing block with backdrop-filter', () => {
      expect(buildInteractiveBaseCss()).not.toContain('backdrop-filter');
      expect(buildInteractiveBaseCss()).toContain('.db-navbar-cta:focus-visible');
    });

    test('a navbar dropped on a multi page site follows the pages and keeps following renames', () => {
      editor.Pages.add({ name: 'About' });
      const navbar = editor.getWrapper().append({ type: 'db-navbar' })[0];
      const hrefs = navbar.find ? [] : [];
      navbar.onAll(
        (child) => child.getClasses().indexOf('db-navbar-link') >= 0 && hrefs.push(child.getAttributes().href),
      );
      expect(hrefs).toEqual(['index.html', 'about.html']);
      expect(navbar.getAttributes()['data-db-menu-auto']).toBe('true');
      editor.Pages.getAll()[1].set('name', 'Team');
      resyncAutoNavigation(editor);
      const labels = [];
      navbar.onAll((child) => child.getClasses().indexOf('db-navbar-link') >= 0 && labels.push(child.getInnerHTML()));
      expect(labels).toEqual(['Home', 'Team']);
    });

    test('build menu from pages rewrites the list and locks the new items', () => {
      const navbar = editor.getWrapper().append({ type: 'db-navbar' })[0];
      editor.Pages.add({ name: 'Pricing' });
      expect(buildNavbarLinksFromPages(editor, navbar)).toBe(2);
      const items = [];
      navbar.onAll((child) => child.getClasses().indexOf('db-navbar-item') >= 0 && items.push(child));
      expect(items.length).toBe(2);
      expect(items[1].getName()).toBe('Menu item');
      expect(items[1].get('draggable')).toBe('[data-db-navbar-menu]');
    });

    test('menu rows decode entities and offer a page picker', () => {
      const navbar = editor.getWrapper().append({ type: 'db-navbar' })[0];
      const firstLink = [];
      navbar.onAll((child) => child.getClasses().indexOf('db-navbar-link') >= 0 && firstLink.push(child));
      writeComponentTextContent(firstLink[0], 'Tips & Tricks');
      const menuTrait = navbar.getTraits().filter((trait) => trait.get('type') === 'db-menu-items')[0];
      expect(menuTrait.get('listSelector')).toBe('[data-db-navbar-menu]');
      const rowsMarkup = buildMenuItemRowsMarkup(editor, navbar, menuTrait.get('listSelector'), 'empty');
      expect(rowsMarkup).toContain('value="Tips &amp; Tricks"');
      expect(rowsMarkup).not.toContain('&amp;amp;');
      expect(rowsMarkup).toContain('data-db-menu-field="pageLink"');
    });

    test('the logo attribute inserts and removes an image inside the brand link', () => {
      const navbar = editor.getWrapper().append({ type: 'db-navbar' })[0];
      navbar.addAttributes({ 'data-db-logo': 'https://example.com/logo.png' });
      syncNavbarLogo(navbar);
      expect(navbar.toHTML()).toContain('class="db-navbar-logo"');
      navbar.addAttributes({ 'data-db-logo': '' });
      syncNavbarLogo(navbar);
      expect(navbar.toHTML()).not.toContain('db-navbar-logo');
    });
  });

  describe('accordion', () => {
    test('lists questions and appends new ones with the chosen heading level', () => {
      const accordion = editor.getWrapper().append({ type: 'db-accordion' })[0];
      expect(readAccordionItemRecords(accordion).map((record) => record.isOpen)).toEqual([true, false, false]);
      accordion.addAttributes({ 'data-db-heading-level': '2' });
      const added = appendAccordionItem(accordion, { accordionItemTitle: 'Q4', accordionPanelText: 'A4' });
      expect(added.toHTML()).toContain('<h2 class="db-accordion-header">');
      expect(accordion.toHTML()).not.toContain('<h3');
      expect(readAccordionItemRecords(accordion).length).toBe(4);
      expect(namesOf(added)).toContain('Chevron');
    });

    test('selecting inside a closed item reveals it in the canvas without touching the model', () => {
      const accordion = editor.getWrapper().append({ type: 'db-accordion' })[0];
      const secondItem = accordion.components().at(1);
      const secondElement = secondItem.getEl();
      revealAccordionItemInCanvas(secondElement.querySelector('.db-accordion-title'));
      expect(secondElement.querySelector('[data-db-accordion-panel]').hasAttribute('hidden')).toBe(false);
      expect(secondElement.querySelector('[data-db-accordion-trigger]').getAttribute('aria-expanded')).toBe('true');
      expect(secondItem.getAttributes()['data-db-open']).toBe('false');
    });
  });

  describe('tabs', () => {
    test('tab buttons cannot be cloned or removed on their own', () => {
      const tabs = editor.getWrapper().append({ type: 'db-tabs' })[0];
      const firstButton = readTabPairRecords(tabs)[0].buttonComponent;
      expect(firstButton.get('copyable')).toBe(false);
      expect(firstButton.get('removable')).toBe(false);
    });

    test('pairs are added, removed and re-selected together', () => {
      const tabs = editor.getWrapper().append({ type: 'db-tabs' })[0];
      appendTabPair(tabs, { tabLabel: 'Extra', tabPanelText: 'Body' });
      expect(readTabPairRecords(tabs).length).toBe(4);
      expect(readTabPairRecords(tabs)[3].panelComponent).toBeTruthy();
      removeTabPairAt(tabs, 0);
      const records = readTabPairRecords(tabs);
      expect(records.length).toBe(3);
      expect(records[0].isSelected).toBe(true);
      expect(records[0].panelComponent.getAttributes().hidden).toBeUndefined();
    });

    test('shown first writes the selection into the model for export', () => {
      const tabs = editor.getWrapper().append({ type: 'db-tabs' })[0];
      const records = readTabPairRecords(tabs);
      applyDefaultTabSelection(records[2].buttonComponent);
      expect(readTabPairRecords(tabs).map((record) => record.isSelected)).toEqual([false, false, true]);
      expect(records[0].panelComponent.getAttributes().hidden).toBe('hidden');
      expect(editor.getHtml()).toContain('aria-selected="true" tabindex="0"');
    });

    test('selecting a panel reveals it in the canvas', () => {
      const tabs = editor.getWrapper().append({ type: 'db-tabs' })[0];
      const thirdPanel = readTabPairRecords(tabs)[2].panelComponent.getEl();
      revealTabPanelInCanvas(thirdPanel.firstElementChild);
      expect(thirdPanel.hasAttribute('hidden')).toBe(false);
      expect(tabs.getEl().querySelectorAll('[role="tab"]')[2].getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('countdown', () => {
    test('digits are not editable text and time zone options include local and UTC', () => {
      const countdown = editor.getWrapper().append({ type: 'db-countdown' })[0];
      const valueTypes = [];
      countdown.onAll(
        (child) => child.getClasses().indexOf('db-countdown-value') >= 0 && valueTypes.push(child.get('type')),
      );
      expect(valueTypes).toEqual(['default', 'default', 'default', 'default']);
      const traitTypes = countdown.getTraits().map((trait) => trait.get('type'));
      expect(traitTypes).toContain('db-time');
      const options = getTimeZoneOffsetOptions();
      expect(options[0].id).toBe('');
      expect(options[1].id).toBe('Z');
      expect(options.some((option) => option.id === '+05:30')).toBe(true);
    });
  });

  describe('announcement', () => {
    test('every bar gets its own storage key', () => {
      const first = editor.getWrapper().append({ type: 'db-announcement' })[0];
      const second = editor.getWrapper().append({ type: 'db-announcement' })[0];
      const firstKey = first.getAttributes()['data-db-storage-key'];
      expect(firstKey).toMatch(/^db-announcement-/);
      expect(firstKey).not.toBe('db-announcement-default');
      expect(second.getAttributes()['data-db-storage-key']).not.toBe(firstKey);
    });

    test('link traits insert and remove a safe link', () => {
      const bar = editor.getWrapper().append({ type: 'db-announcement' })[0];
      bar.addAttributes({ 'data-db-link-text': 'Shop now', 'data-db-link-href': 'sale.html' });
      syncAnnouncementLink(bar);
      expect(bar.toHTML()).toContain('<a href="sale.html" class="db-announcement-link">Shop now</a>');
      bar.addAttributes({ 'data-db-link-href': 'javascript:alert(1)' });
      syncAnnouncementLink(bar);
      expect(bar.toHTML()).not.toContain('db-announcement-link');
    });
  });

  describe('breadcrumb', () => {
    test('a new breadcrumb follows the site pages', () => {
      editor.Pages.add({ name: 'Docs' });
      editor.Pages.select(editor.Pages.getAll()[1]);
      const breadcrumb = editor.getWrapper().append({ type: 'db-breadcrumb' })[0];
      const records = readBreadcrumbStepRecords(breadcrumb);
      expect(records.map((record) => record.labelText)).toEqual(['Home', 'Docs']);
      expect(records[0].linkHref).toBe('index.html');
      expect(records[1].isCurrent).toBe(true);
    });

    test('steps are inserted before the current page and removal keeps the last item current', () => {
      const breadcrumb = editor.getWrapper().append({ type: 'db-breadcrumb' })[0];
      breadcrumb.addAttributes({ 'data-db-auto': 'false' });
      insertBreadcrumbStep(breadcrumb, 'Library', '#library');
      let records = readBreadcrumbStepRecords(breadcrumb);
      expect(records.map((record) => record.labelText)).toEqual(['Home', 'Library', 'Home']);
      expect(records[2].isCurrent).toBe(true);
      expect(records[2].itemComponent.getAttributes()['aria-current']).toBe('page');
      removeBreadcrumbStepAt(breadcrumb, 2);
      records = readBreadcrumbStepRecords(breadcrumb);
      expect(records.length).toBe(2);
      expect(records[1].linkComponent).toBeNull();
      expect(records[1].itemComponent.getAttributes()['aria-current']).toBe('page');
      expect(breadcrumb.toHTML()).not.toContain('href="#library"></li>');
    });

    test('build from pages on the home page yields a single current step', () => {
      const breadcrumb = editor.getWrapper().append({ type: 'db-breadcrumb' })[0];
      expect(buildBreadcrumbFromPages(editor, breadcrumb, editor.Pages.getMain())).toBe(1);
      expect(breadcrumb.toHTML()).toContain('<li aria-current="page">Home</li>');
    });
  });

  describe('social links', () => {
    test('defaults ship without placeholder profile URLs', () => {
      const social = editor.getWrapper().append({ type: 'db-social-links' })[0];
      expect(social.toHTML()).not.toContain('https://x.com/');
      expect(social.toHTML()).not.toContain('href=');
    });

    test('profile URLs are detected, sanitised and appended as first class items', () => {
      const social = editor.getWrapper().append({ type: 'db-social-links' })[0];
      expect(detectSocialNetworkFromUrl('https://www.instagram.com/acme')).toBe('instagram');
      expect(detectSocialNetworkFromUrl('wa.me/123')).toBe('whatsapp');
      expect(detectSocialNetworkFromUrl('mailto:hi@example.com')).toBe('email');
      expect(detectSocialNetworkFromUrl('https://acme.example')).toBe('website');
      expect(applySocialProfileUrl(social, 0, 'javascript:alert(1)')).toBe(false);
      expect(applySocialProfileUrl(social, 0, 'https://tiktok.com/@acme')).toBe(true);
      const firstLink = social.components().at(0).components().at(0);
      expect(firstLink.getAttributes()['data-db-network']).toBe('tiktok');
      expect(firstLink.getAttributes().href).toBe('https://tiktok.com/@acme');
      const added = appendSocialProfileFromUrl(social, 'https://github.com/acme');
      expect(added.get('draggable')).toBe('[data-db-type=social-links]');
      const addedLink = added.components().at(0);
      expect(addedLink.getAttributes()['data-db-network']).toBe('github');
      expect(addedLink.getTraits().map((trait) => trait.get('name'))).toEqual(['href', 'aria-label']);
    });

    test('typing a profile address swaps the icon to the matching network', () => {
      const social = editor.getWrapper().append({ type: 'db-social-links' })[0];
      const firstLink = social.components().at(0).components().at(0);
      expect(firstLink.getAttributes()['data-db-network']).toBe('x');
      firstLink.addAttributes({ href: 'https://www.linkedin.com/in/acme' });
      expect(firstLink.getAttributes()['data-db-network']).toBe('linkedin');
      expect(firstLink.getName()).toBe('LinkedIn link');
    });
  });

  describe('editor canvas marker', () => {
    test('the canvas body is marked so behaviour scripts can stay inert', () => {
      const canvasBody = editor.Canvas.getDocument().body;
      expect(canvasBody.getAttribute('data-db-editor-canvas')).toBe('true');
    });
  });
});
