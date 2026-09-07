import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyWorkspaceLayout from '../../../src/dynamic-builder/workspace/applyWorkspaceLayout';
import buildRailButtonMarkup from '../../../src/dynamic-builder/workspace/buildRailButtonMarkup';
import composeWorkspaceCss from '../../../src/dynamic-builder/workspace/composeWorkspaceCss';
import findManagerHostElement from '../../../src/dynamic-builder/workspace/findManagerHostElement';
import getInspectorGroupRecords from '../../../src/dynamic-builder/workspace/getInspectorGroupRecords';
import getManagerRelocationRecords from '../../../src/dynamic-builder/workspace/getManagerRelocationRecords';
import getSharedTraitGroupOrder from '../../../src/dynamic-builder/workspace/getSharedTraitGroupOrder';
import getViewButtonContextRecords from '../../../src/dynamic-builder/workspace/getViewButtonContextRecords';
import getWorkspaceToolRecords from '../../../src/dynamic-builder/workspace/getWorkspaceToolRecords';
import resolveComponentDisplayName from '../../../src/dynamic-builder/workspace/resolveComponentDisplayName';
import resolveWorkspaceSizeName from '../../../src/dynamic-builder/workspace/resolveWorkspaceSizeName';

describe('Dynamic builder workspace', () => {
  describe('pure helpers', () => {
    test('the rail offers one tool per zone and keeps ids unique', () => {
      const toolRecords = getWorkspaceToolRecords();
      const toolIds = toolRecords.map((toolRecord) => toolRecord.id);
      expect(new Set(toolIds).size).toBe(toolIds.length);
      expect(toolIds).toEqual(expect.arrayContaining(['blocks', 'layers', 'pages', 'templates', 'sites', 'assets']));
      expect(toolRecords.filter((toolRecord) => toolRecord.kind === 'pane').length).toBe(3);
    });

    test('rail buttons escape their labels and only panes get a pressed state', () => {
      const paneMarkup = buildRailButtonMarkup({
        id: 'blocks',
        kind: 'pane',
        label: 'Blocks & bits',
        iconName: 'blocks',
        command: 'core:open-blocks',
      });
      expect(paneMarkup).toContain('aria-pressed="false"');
      expect(paneMarkup).toContain('Blocks &amp; bits');
      expect(paneMarkup).not.toContain('Blocks & bits');
      const commandMarkup = buildRailButtonMarkup({
        id: 'sites',
        kind: 'command',
        label: 'Sites',
        iconName: 'folder',
        command: 'db:open-site-manager',
      });
      expect(commandMarkup).not.toContain('aria-pressed');
      expect(commandMarkup).toContain('data-db-tool-command="db:open-site-manager"');
    });

    test('the dock tools share one panel context while the inspector commands keep their own', () => {
      const contextRecords = getViewButtonContextRecords();
      expect(contextRecords['open-blocks']).toBe(contextRecords['open-layers']);
      expect(contextRecords['open-sm']).not.toBe(contextRecords['open-blocks']);
      expect(contextRecords['open-tm']).not.toBe(contextRecords['open-sm']);
    });

    test('shared trait groups sort below the component own settings', () => {
      const orderRecords = getSharedTraitGroupOrder();
      expect(orderRecords['db-interactions']).toBeGreaterThan(orderRecords['db-visibility']);
      expect(orderRecords['db-motion']).toBeGreaterThan(orderRecords['db-interactions']);
    });

    test('the size name follows the available width down to a phone', () => {
      expect(resolveWorkspaceSizeName(1600)).toBe('lg');
      expect(resolveWorkspaceSizeName(1120)).toBe('md');
      expect(resolveWorkspaceSizeName(1024)).toBe('sm');
      expect(resolveWorkspaceSizeName(390)).toBe('xs');
    });

    test('the inspector names the selection and falls back to the type', () => {
      expect(resolveComponentDisplayName({ getName: () => 'Heading' })).toBe('Heading');
      expect(resolveComponentDisplayName({ getName: () => '  ', get: () => 'db-text' })).toBe('db-text');
      expect(resolveComponentDisplayName(null)).toBe('');
    });

    test('a manager host is the direct child of the panel that holds the marker', () => {
      const hostDocument = document.implementation.createHTMLDocument('t');
      hostDocument.body.innerHTML = '<div id="c"><div id="host"><div><span class="gjs-layer"></span></div></div></div>';
      const containerElement = hostDocument.getElementById('c');
      expect(findManagerHostElement(containerElement, '.gjs-layer').id).toBe('host');
      expect(findManagerHostElement(containerElement, '.gjs-missing')).toBeNull();
      expect(findManagerHostElement(null, '.gjs-layer')).toBeNull();
    });

    test('every relocated manager has a zone and the css covers all three zones', () => {
      const zoneKeys = getManagerRelocationRecords().map((record) => record.zoneKey);
      expect(zoneKeys).toEqual(['blocks', 'layers', 'settings', 'style']);
      const groupIds = getInspectorGroupRecords().map((groupRecord) => groupRecord.id);
      expect(groupIds).toEqual(['settings', 'style']);
      const workspaceCss = composeWorkspaceCss();
      ['gjs-db-ws-rail', 'gjs-db-ws-dock', 'gjs-db-ws-stage', 'gjs-db-ws-inspector'].forEach((zoneClass) => {
        expect(workspaceCss).toContain(zoneClass);
      });
      expect(workspaceCss).toContain('--gjs-db-canvas-ground');
      expect(workspaceCss).toContain("data-db-size='xs'");
    });
  });

  describe('mounted workspace', () => {
    let editor;

    beforeEach(() => {
      window.Element.prototype.scrollIntoView = () => {};
      document.body.innerHTML = '<div id="db-editor"></div>';
      editor = grapesjs.init({
        container: '#db-editor',
        storageManager: { autoload: false, autosave: false, type: '' },
        plugins: [
          fixJsDom,
          (editorInstance) => {
            grapesjs.dynamicBuilder(editorInstance, { shell: { firstRunWizard: false } });
            applyWorkspaceLayout(editorInstance, {});
          },
        ],
      });
      fixJsDomIframe(editor.getModel().shallow);
      return new Promise((resolve) => editor.onReady(() => setTimeout(resolve, 5)));
    });

    afterEach(() =>
      new Promise((resolve) => setTimeout(resolve, 20)).then(() => {
        editor.destroy();
        try {
          window.localStorage.clear();
        } catch (storageError) {
          editor = null;
        }
      }),
    );

    test('the three zones mount and the canvas moves onto the stage', () => {
      const containerElement = editor.getContainer();
      const workspaceElement = containerElement.querySelector('[data-db-workspace]');
      expect(workspaceElement).toBeTruthy();
      expect(workspaceElement.querySelector('[data-db-rail]')).toBeTruthy();
      expect(workspaceElement.querySelector('[data-db-dock]')).toBeTruthy();
      expect(workspaceElement.querySelector('[data-db-inspector]')).toBeTruthy();
      const stageElement = workspaceElement.querySelector('[data-db-stage-canvas]');
      expect(stageElement.querySelector('.gjs-cv-canvas')).toBeTruthy();
      expect(workspaceElement.querySelectorAll('[data-db-tool]').length).toBe(6);
    });

    test('the dock starts on blocks and switches tool without losing the other panes', () => {
      const containerElement = editor.getContainer();
      const workspaceElement = containerElement.querySelector('[data-db-workspace]');
      expect(workspaceElement.getAttribute('data-db-active-tool')).toBe('blocks');
      workspaceElement.querySelector('[data-db-tool="pages"]').click();
      expect(workspaceElement.getAttribute('data-db-active-tool')).toBe('pages');
      const pagesPane = workspaceElement.querySelector('[data-db-dock-pane="pages"]');
      expect(pagesPane.getAttribute('data-db-pane-active')).toBe('1');
      expect(pagesPane.querySelectorAll('[data-db-page-id]').length).toBeGreaterThan(0);
      expect(workspaceElement.querySelector('[data-db-dock-pane="blocks"]')).toBeTruthy();
      workspaceElement.querySelector('[data-db-tool="blocks"]').click();
      expect(workspaceElement.getAttribute('data-db-active-tool')).toBe('blocks');
    });

    test('clicking the active tool closes the dock and the rail state follows', () => {
      const workspaceElement = editor.getContainer().querySelector('[data-db-workspace]');
      const blocksButton = workspaceElement.querySelector('[data-db-tool="blocks"]');
      expect(blocksButton.getAttribute('aria-pressed')).toBe('true');
      blocksButton.click();
      expect(workspaceElement.getAttribute('data-db-dock-open')).toBe('0');
      expect(blocksButton.getAttribute('aria-pressed')).toBe('false');
    });

    test('inspector groups collapse, remember their state and keep the managers mounted', () => {
      const workspaceElement = editor.getContainer().querySelector('[data-db-workspace]');
      const styleGroup = workspaceElement.querySelector('[data-db-inspector-group="style"]');
      expect(styleGroup.getAttribute('data-db-open')).toBe('1');
      workspaceElement.querySelector('[data-db-group-toggle="style"]').click();
      expect(styleGroup.getAttribute('data-db-open')).toBe('0');
      expect(workspaceElement.querySelector('[data-db-group-toggle="style"]').getAttribute('aria-expanded')).toBe(
        'false',
      );
      expect(workspaceElement.querySelector('[data-db-inspector-slot="style"]')).toBeTruthy();
    });

    test('selecting a component names it in the inspector header', () => {
      const workspaceElement = editor.getContainer().querySelector('[data-db-workspace]');
      const inspectorElement = workspaceElement.querySelector('[data-db-inspector]');
      expect(inspectorElement.getAttribute('data-db-has-selection')).toBe('0');
      const addedComponent = editor.getWrapper().append('<p data-gjs-name="Intro text">hi</p>')[0];
      editor.select(addedComponent);
      return new Promise((resolve) => setTimeout(resolve, 10)).then(() => {
        expect(inspectorElement.getAttribute('data-db-has-selection')).toBe('1');
        expect(workspaceElement.querySelector('[data-db-inspector-title]').textContent).toBe('Intro text');
        expect(workspaceElement.querySelector('[data-db-inspector-eyebrow]').textContent).toBe('Selected');
      });
    });

    test('the stage bar exposes devices, zoom and preview without hiding the top bar', () => {
      const workspaceElement = editor.getContainer().querySelector('[data-db-workspace]');
      expect(workspaceElement.querySelectorAll('[data-db-stage-device]').length).toBe(
        editor.Devices.getDevices().length,
      );
      expect(workspaceElement.querySelector('[data-db-zoom-reset]')).toBeTruthy();
      expect(workspaceElement.querySelector('[data-db-stage-preview]')).toBeTruthy();
      expect(editor.getContainer().querySelector('[data-db-panel="db-top"]')).toBeTruthy();
      workspaceElement.querySelector('[data-db-stage-device="mobilePortrait"]').click();
      expect(String(editor.Devices.getSelected().get('id'))).toBe('mobilePortrait');
    });
  });
});
