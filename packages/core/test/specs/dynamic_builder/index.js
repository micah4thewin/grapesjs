import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';

describe('Dynamic builder plugin', () => {
  let editor;

  const contractedComponentTypes = [
    'db-section',
    'db-container',
    'db-columns',
    'db-column',
    'db-spacer',
    'db-divider',
    'db-heading',
    'db-text',
    'db-quote',
    'db-callout',
    'db-button',
    'db-button-group',
    'db-icon',
    'db-list',
    'db-image',
    'db-gallery',
    'db-gallery-item',
    'db-carousel',
    'db-carousel-slide',
    'db-video',
    'db-map',
    'db-accordion',
    'db-accordion-item',
    'db-tabs',
    'db-tab-list',
    'db-tab-button',
    'db-tab-panel',
    'db-countdown',
    'db-navbar',
    'db-breadcrumb',
    'db-social-links',
    'db-announcement',
    'db-hero',
    'db-features',
    'db-feature-card',
    'db-card',
    'db-testimonial',
    'db-logo-cloud',
    'db-stats',
    'db-stat',
    'db-pricing',
    'db-pricing-tier',
    'db-team-member',
    'db-contact',
    'db-footer',
    'db-form',
    'db-form-field',
    'db-input',
    'db-textarea',
    'db-select',
    'db-checkbox',
    'db-radio-group',
    'db-file-input',
    'db-hidden-input',
    'db-consent-checkbox',
    'db-honeypot',
    'db-submit-button',
    'db-repeater',
    'db-repeater-item',
    'db-custom-html',
    'db-custom-css',
    'db-custom-script',
  ];

  const contractedCommandIds = [
    'db:open-command-palette',
    'db:open-shortcut-help',
    'db:open-seo-settings',
    'db:open-schema-manager',
    'db:open-export',
    'db:open-revisions',
    'db:save-revision',
    'db:open-audit-report',
    'db:run-accessibility-audit',
    'db:run-performance-audit',
    'db:run-seo-audit',
    'db:open-data-sources',
    'db:open-custom-code',
    'db:open-token-manager',
  ];

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

  test('the plugin is exposed on the grapesjs namespace', () => {
    expect(typeof grapesjs.dynamicBuilder).toBe('function');
  });

  test('every contracted component type is registered', () => {
    const missingTypes = contractedComponentTypes.filter((typeName) => !editor.DomComponents.getType(typeName));
    expect(missingTypes).toEqual([]);
  });

  test('every contracted command is registered', () => {
    const missingCommands = contractedCommandIds.filter((commandId) => !editor.Commands.has(commandId));
    expect(missingCommands).toEqual([]);
  });

  test('the block library is populated across categories', () => {
    const allBlocks = editor.BlockManager.getAll();
    expect(allBlocks.length).toBeGreaterThanOrEqual(40);
    const categoryNames = new Set(
      allBlocks.map((block) => {
        const category = block.get('category');
        return category && category.id ? category.id : category;
      }),
    );
    ['Layout', 'Typography', 'Media', 'Interactive', 'Marketing', 'Forms', 'Data', 'Embeds'].forEach((expectedName) =>
      expect([...categoryNames]).toContain(expectedName),
    );
  });

  test('responsive device presets are registered', () => {
    const deviceIds = editor.DeviceManager.getAll().map((device) => device.get('id') || device.id);
    ['desktop', 'laptop', 'tabletLandscape', 'tabletPortrait', 'mobileLandscape', 'mobilePortrait'].forEach(
      (expectedDeviceId) => expect(deviceIds).toContain(expectedDeviceId),
    );
  });

  test('the style manager exposes the governed sector set', () => {
    expect(editor.StyleManager.getSectors({ visible: false }).length).toBeGreaterThanOrEqual(8);
  });

  test('dropping a hero produces non-empty accessible defaults', () => {
    const heroComponent = editor.getWrapper().append({ type: 'db-hero' })[0];
    expect(heroComponent.get('type')).toBe('db-hero');
    expect(heroComponent.components().length).toBeGreaterThan(0);
  });

  test('the export command is runnable without throwing', () => {
    expect(() => editor.runCommand('db:run-seo-audit')).not.toThrow();
  });
});
