import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildToolsMenuMarkup from '../../../src/dynamic-builder/shell/buildToolsMenuMarkup';
import collectPaletteActions from '../../../src/dynamic-builder/shell/collectPaletteActions';
import filterPaletteActions from '../../../src/dynamic-builder/shell/filterPaletteActions';
import formatKeysText from '../../../src/dynamic-builder/shell/formatKeysText';
import getEditorInstanceSuffix from '../../../src/dynamic-builder/shell/getEditorInstanceSuffix';
import getShellShortcutDefinitions from '../../../src/dynamic-builder/shell/getShellShortcutDefinitions';
import getToolsMenuCommandIds from '../../../src/dynamic-builder/shell/getToolsMenuCommandIds';
import matchShellShortcut from '../../../src/dynamic-builder/shell/matchShellShortcut';
import openConfirmModal from '../../../src/dynamic-builder/shell/openConfirmModal';
import openThemedModal from '../../../src/dynamic-builder/support/openThemedModal';

const buildActionRecords = () => [
  {
    actionId: 'a',
    groupTitle: 'Design',
    label: 'Design kits',
    keywords: 'fonts palette theme style',
    runAction: () => {},
  },
  {
    actionId: 'b',
    groupTitle: 'Design',
    label: 'Design tokens',
    keywords: 'colors spacing variables',
    runAction: () => {},
  },
  { actionId: 'c', groupTitle: 'Pages', label: 'Switch page: About', keywords: 'page navigate', runAction: () => {} },
  {
    actionId: 'd',
    groupTitle: 'Site',
    label: 'SEO settings',
    keywords: 'meta title description search',
    runAction: () => {},
  },
];

describe('Dynamic builder shell input', () => {
  describe('shortcut formatting', () => {
    test('picks the platform variant and readable key names', () => {
      expect(formatKeysText('⌘+k, ctrl+k', { isApple: false })).toBe('Ctrl+K');
      expect(formatKeysText('⌘+k, ctrl+k', { isApple: true })).toBe('⌘+K');
      expect(formatKeysText('⌘+/, ctrl+/', { isApple: false })).toBe('Ctrl+/');
      expect(formatKeysText('⌘+shift+s, ctrl+shift+s', { isApple: true })).toBe('⌘+⇧+S');
      expect(formatKeysText('backspace, delete', { isApple: false })).toBe('Backspace or Delete');
    });

    test('matches shell chords by key name and modifier state', () => {
      const definitions = getShellShortcutDefinitions();
      expect(matchShellShortcut(definitions, { key: 'k', ctrlKey: true }).commandId).toBe('db:open-command-palette');
      expect(matchShellShortcut(definitions, { key: 'K', metaKey: true }).commandId).toBe('db:open-command-palette');
      expect(matchShellShortcut(definitions, { key: '/', ctrlKey: true }).commandId).toBe('db:open-shortcut-help');
      expect(matchShellShortcut(definitions, { key: '?', ctrlKey: true, shiftKey: true }).commandId).toBe(
        'db:open-shortcut-help',
      );
      expect(matchShellShortcut(definitions, { key: 's', ctrlKey: true })).toBeNull();
      expect(matchShellShortcut(definitions, { key: 's', ctrlKey: true, shiftKey: true }).commandId).toBe(
        'db:save-revision',
      );
      expect(matchShellShortcut(definitions, { key: 'k', ctrlKey: true, altKey: true })).toBeNull();
      expect(matchShellShortcut(definitions, { key: 'k' })).toBeNull();
    });

    test('keymap strings only use keys keymaster understands', () => {
      getShellShortcutDefinitions().forEach((definition) => {
        expect(definition.keys).not.toMatch(/slash/);
      });
    });
  });

  describe('palette ranking', () => {
    test('fuzzy ranking prefers label matches and word starts', () => {
      const records = buildActionRecords();
      expect(filterPaletteActions(records, 'dk')[0].label).toBe('Design kits');
      expect(filterPaletteActions(records, 'seo')[0].label).toBe('SEO settings');
      expect(filterPaletteActions(records, 'zzz')).toEqual([]);
      expect(filterPaletteActions(records, '')).toHaveLength(4);
    });

    test('prefixes scope the results to pages or devices', () => {
      const records = buildActionRecords();
      expect(filterPaletteActions(records, '>').map((record) => record.actionId)).toEqual(['c']);
      expect(filterPaletteActions(records, '> abo')[0].label).toBe('Switch page: About');
      expect(filterPaletteActions(records, '@')).toEqual([]);
    });
  });

  describe('tools menu', () => {
    test('groups commands into labelled sections and includes publish', () => {
      const commandIds = getToolsMenuCommandIds();
      expect(commandIds[0]).toBe('db:open-command-palette');
      expect(commandIds).toContain('db:publish-site');
      expect(new Set(commandIds).size).toBe(commandIds.length);
      const markup = buildToolsMenuMarkup();
      expect(markup.match(/role="separator"/g).length).toBeGreaterThanOrEqual(5);
      expect(markup).toContain('aria-label="Design"');
      expect(markup).toContain('aria-label="Publish"');
    });
  });

  describe('with an editor', () => {
    let editor;
    const pressKey = (targetElement, keyInit) =>
      targetElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...keyInit }));
    const getDialog = () => editor.getContainer().querySelector('.gjs-mdl-dialog');

    beforeEach(() => {
      document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div><input id="host-input" /></div>';
      editor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [fixJsDom, grapesjs.dynamicBuilder],
      });
      fixJsDomIframe(editor.getModel().shallow);
      return new Promise((resolve) => editor.onReady(() => resolve()));
    });

    afterEach(() => {
      editor.destroy();
    });

    test('themed modals are real dialogs that manage focus', () => {
      const openerButton = document.createElement('button');
      document.getElementById('fixtures').appendChild(openerButton);
      openerButton.focus();
      const contentElement = document.createElement('div');
      contentElement.innerHTML = '<input class="gjs-db-field-input" /><button type="button">Ok</button>';
      openThemedModal(editor, 'Probe dialog', contentElement, { className: 'gjs-db-probe-modal' });
      const dialogElement = getDialog();
      expect(dialogElement.getAttribute('role')).toBe('dialog');
      expect(dialogElement.getAttribute('aria-modal')).toBe('true');
      const titleElement = dialogElement.querySelector('.gjs-mdl-title');
      expect(dialogElement.getAttribute('aria-labelledby')).toBe(titleElement.id);
      expect(titleElement.textContent).toBe('Probe dialog');
      const closeButton = dialogElement.querySelector('[data-close-modal]');
      expect(closeButton.tagName).toBe('BUTTON');
      expect(closeButton.getAttribute('aria-label')).toBe('Close dialog');
      expect(document.activeElement).toBe(contentElement.querySelector('input'));
      pressKey(document.activeElement, { key: 'Escape' });
      expect(editor.Modal.isOpen()).toBe(false);
      expect(document.activeElement).toBe(openerButton);
    });

    test('tab is trapped inside the dialog', () => {
      const contentElement = document.createElement('div');
      contentElement.innerHTML = '<input class="gjs-db-field-input" /><button type="button">Ok</button>';
      openThemedModal(editor, 'Trap', contentElement);
      const okButton = contentElement.querySelector('button');
      okButton.focus();
      pressKey(okButton, { key: 'Tab' });
      expect(document.activeElement).toBe(getDialog().querySelector('[data-close-modal]'));
      pressKey(document.activeElement, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(okButton);
    });

    test('reopening modals does not leak content wrappers and reports closes', () => {
      const onClose = jest.fn();
      openThemedModal(editor, 'One', document.createElement('div'), { onClose });
      openThemedModal(editor, 'Two', document.createElement('div'));
      expect(onClose).toHaveBeenCalledTimes(1);
      editor.Modal.close();
      openThemedModal(editor, 'Three', document.createElement('div'));
      expect(document.querySelectorAll('.gjs-db-modal-shell').length).toBe(1);
      editor.Modal.close();
      expect(document.querySelectorAll('.gjs-db-modal-shell').length).toBe(0);
    });

    test('the confirm dialog focuses cancel and closes on escape', () => {
      const onConfirm = jest.fn();
      openConfirmModal(editor, 'Delete page', 'Delete it?', 'Delete', onConfirm);
      expect(document.activeElement.hasAttribute('data-db-confirm-cancel')).toBe(true);
      pressKey(document.activeElement, { key: 'Escape' });
      expect(editor.Modal.isOpen()).toBe(false);
      expect(onConfirm).not.toHaveBeenCalled();
    });

    test('shortcuts stay scoped to the editor and toggle their own modal', () => {
      const hostInput = document.getElementById('host-input');
      hostInput.focus();
      pressKey(hostInput, { key: 'k', ctrlKey: true });
      expect(editor.Modal.isOpen()).toBe(false);
      pressKey(editor.getContainer(), { key: 'k', ctrlKey: true });
      expect(editor.Modal.isOpen()).toBe(true);
      expect(editor.getContainer().querySelector('[data-db-palette]')).toBeTruthy();
      pressKey(document.activeElement, { key: 'k', ctrlKey: true });
      expect(editor.Modal.isOpen()).toBe(false);
      pressKey(document.body, { key: '/', ctrlKey: true });
      expect(editor.Modal.getTitle()).toBe('Keyboard shortcuts');
      expect(editor.getContainer().querySelector('[data-db-shortcut-help] kbd')).toBeTruthy();
      editor.Modal.close();
    });

    test('shortcuts never replace a form modal that may hold unsaved edits', () => {
      const formElement = document.createElement('div');
      formElement.innerHTML = '<input class="gjs-db-field-input" value="typed" />';
      openThemedModal(editor, 'Site settings', formElement, { className: 'gjs-db-site-settings-modal' });
      pressKey(document.activeElement, { key: 'k', ctrlKey: true });
      expect(editor.Modal.getTitle()).toBe('Site settings');
      expect(editor.Modal.isOpen()).toBe(true);
      editor.Modal.close();
    });

    test('instance suffix is stable and palette ids do not drift', () => {
      expect(getEditorInstanceSuffix(editor)).toBe('');
      expect(getEditorInstanceSuffix(editor)).toBe('');
      editor.runCommand('db:open-command-palette');
      expect(editor.getContainer().querySelector('#db-palette-listbox')).toBeTruthy();
      editor.Modal.close();
      editor.runCommand('db:open-command-palette');
      expect(editor.getContainer().querySelectorAll('#db-palette-listbox').length).toBe(1);
      editor.Modal.close();
    });

    test('palette hover syncs the active item and shows shortcut hints', () => {
      editor.runCommand('db:open-command-palette');
      const listElement = editor.getContainer().querySelector('[data-db-palette-list]');
      const itemElements = listElement.querySelectorAll('[data-db-palette-index]');
      expect(itemElements.length).toBeGreaterThan(3);
      expect(itemElements[0].getAttribute('aria-selected')).toBe('true');
      itemElements[2].dispatchEvent(new Event('pointermove', { bubbles: true }));
      expect(itemElements[2].getAttribute('aria-selected')).toBe('true');
      expect(itemElements[0].getAttribute('aria-selected')).toBe('false');
      const inputElement = editor.getContainer().querySelector('[data-db-palette-input]');
      expect(inputElement.getAttribute('aria-activedescendant')).toBe(itemElements[2].id);
      expect(listElement.querySelectorAll('.gjs-db-palette-group').length).toBeGreaterThan(2);
      inputElement.value = 'undo';
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      const firstResult = listElement.querySelector('[data-db-palette-index="0"]');
      expect(firstResult.textContent).toContain('Undo');
      expect(firstResult.querySelector('kbd')).toBeTruthy();
      editor.Modal.close();
    });

    test('selection-only actions hide when nothing is selected', () => {
      const idsWithoutSelection = collectPaletteActions(editor).map((record) => record.actionId);
      expect(idsWithoutSelection).not.toContain('db:create-symbol');
      expect(idsWithoutSelection).not.toContain('db:toggle-grid-overlay');
      expect(idsWithoutSelection).toContain('shell:toggle-theme');
      const textComponent = editor.getWrapper().append({ tagName: 'p', type: 'text', content: 'Probe' })[0];
      editor.select(textComponent);
      const idsWithSelection = collectPaletteActions(editor).map((record) => record.actionId);
      expect(idsWithSelection).toContain('db:create-symbol');
    });
  });
});
