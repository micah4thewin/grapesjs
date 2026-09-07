import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyBindingPreviewInElement from '../../../src/dynamic-builder/dataBinding/applyBindingPreviewInElement';
import buildDefaultDataSources from '../../../src/dynamic-builder/dataBinding/buildDefaultDataSources';
import buildRepeaterTraitDefinitions from '../../../src/dynamic-builder/dataBinding/buildRepeaterTraitDefinitions';
import buildSourceOptionRecords from '../../../src/dynamic-builder/dataBinding/buildSourceOptionRecords';
import collectUnresolvedBindingTokens from '../../../src/dynamic-builder/dataBinding/collectUnresolvedBindingTokens';
import convertRowsToRecords from '../../../src/dynamic-builder/dataBinding/convertRowsToRecords';
import expandRepeaterElement from '../../../src/dynamic-builder/dataBinding/expandRepeaterElement';
import getDataSourceRegistry from '../../../src/dynamic-builder/dataBinding/getDataSourceRegistry';
import mergeDataSourceRecords from '../../../src/dynamic-builder/dataBinding/mergeDataSourceRecords';
import openDataSourcesModal from '../../../src/dynamic-builder/dataBinding/openDataSourcesModal';
import parseCellTextByKind from '../../../src/dynamic-builder/dataBinding/parseCellTextByKind';
import parseDelimitedText from '../../../src/dynamic-builder/dataBinding/parseDelimitedText';
import replaceBindingTokensInText from '../../../src/dynamic-builder/dataBinding/replaceBindingTokensInText';
import resolveBindingTokensInMarkup from '../../../src/dynamic-builder/dataBinding/resolveBindingTokensInMarkup';
import resolveRepeaterItems from '../../../src/dynamic-builder/dataBinding/resolveRepeaterItems';
import resolveRepeaterSettings from '../../../src/dynamic-builder/dataBinding/resolveRepeaterSettings';
import restoreBindingPreviewInElement from '../../../src/dynamic-builder/dataBinding/restoreBindingPreviewInElement';
import toCamelCaseName from '../../../src/dynamic-builder/dataBinding/toCamelCaseName';
import updateDataSourceRegistry from '../../../src/dynamic-builder/dataBinding/updateDataSourceRegistry';

const registry = buildDefaultDataSources();

const buildElement = (markup) => {
  const hostElement = document.createElement('div');
  hostElement.innerHTML = markup;
  return hostElement.firstElementChild;
};

const buildRepeaterMarkup = (attributes, templateMarkup) =>
  `<div data-db-type="repeater" data-db-repeater="true" class="db-repeater" ${attributes}>` +
  `<div data-db-type="repeater-item" data-db-repeater-item="true" class="db-repeater-item">${templateMarkup}</div></div>`;

describe('Dynamic builder data binding', () => {
  describe('default sources and block keys', () => {
    test('exposes the keys the data blocks bind to', () => {
      expect(Array.isArray(registry.faqs)).toBe(true);
      expect(registry.faqs[0].question).toBeTruthy();
      expect(registry.testimonials[0].company).toBeTruthy();
      expect(registry.teamMembers[0].role).toBeTruthy();
    });
  });

  describe('mergeDataSourceRecords', () => {
    test('replaces a source as a whole so removed fields stay removed', () => {
      const merged = mergeDataSourceRecords(registry, { siteInfo: { name: 'Acme' } });
      expect(merged.siteInfo).toEqual({ name: 'Acme' });
      expect(merged.products.length).toBe(3);
    });

    test('a null value deletes a seeded source', () => {
      const merged = mergeDataSourceRecords(registry, { products: null });
      expect(merged.products).toBeUndefined();
      expect(merged.faqs).toBeTruthy();
    });
  });

  describe('binding tokens', () => {
    test('accepts whitespace inside the braces and applies filters', () => {
      const result = replaceBindingTokensInText(
        { siteInfo: { name: 'Acme' } },
        'A {{ db:siteInfo.name }} B {{db:siteInfo.name|upper}}',
      );
      expect(result).toBe('A Acme B ACME');
    });

    test('the html filter keeps sanitized markup while plain tokens stay escaped', () => {
      const result = replaceBindingTokensInText({ bio: '<b onclick="x()">bold</b>' }, '{{db:bio|html}} {{db:bio}}');
      expect(result).toContain('<b>bold</b>');
      expect(result).not.toContain('<b onclick');
      expect(result).toContain('&lt;b onclick=&quot;x()&quot;&gt;bold&lt;/b&gt;');
    });
  });

  describe('repeater settings and items', () => {
    test('reads sort, filter, limit and alias settings from attributes', () => {
      const settings = resolveRepeaterSettings({
        'data-db-source': 'teamMembers',
        'data-db-limit': '2',
        'data-db-sort-field': 'name',
        'data-db-sort-direction': 'desc',
        'data-db-filter-field': 'role',
        'data-db-filter-value': 'Lead Engineer',
        'data-db-item-as': 'member',
      });
      expect(settings.limitValue).toBe(2);
      expect(settings.sortDirection).toBe('desc');
      expect(settings.itemAlias).toBe('member');
      expect(resolveRepeaterItems(registry, settings).map((item) => item.name)).toEqual(['Jordan Blake']);
    });

    test('sorts items by a field in both directions', () => {
      const ascending = resolveRepeaterItems(
        registry,
        resolveRepeaterSettings({ 'data-db-source': 'teamMembers', 'data-db-sort-field': 'name' }),
      );
      expect(ascending[0].name).toBe('Avery Collins');
      const descending = resolveRepeaterItems(
        registry,
        resolveRepeaterSettings({
          'data-db-source': 'teamMembers',
          'data-db-sort-field': 'name',
          'data-db-sort-direction': 'desc',
        }),
      );
      expect(descending[0].name).toBe('Riley Chen');
    });
  });

  describe('expandRepeaterElement', () => {
    test('clones the template per item, strips ids and editor attributes', () => {
      const repeaterElement = buildElement(
        buildRepeaterMarkup(
          'data-db-source="products" data-db-limit="2"',
          '<h4 id="head">{{db:item.name}} #{{db:index}}/{{db:count}}</h4>',
        ),
      );
      expandRepeaterElement(registry, repeaterElement);
      expect(repeaterElement.children.length).toBe(2);
      expect(repeaterElement.querySelectorAll('[id]').length).toBe(0);
      expect(repeaterElement.querySelectorAll('[data-db-repeater-item]').length).toBe(0);
      expect(repeaterElement.hasAttribute('data-db-limit')).toBe(false);
      expect(repeaterElement.hasAttribute('data-db-repeater')).toBe(false);
      expect(repeaterElement.children[0].textContent).toBe('Starter Site #1/2');
    });

    test('expands nested repeaters against their own source and exposes the outer alias', () => {
      const innerMarkup = buildRepeaterMarkup(
        'data-db-source="teamMembers"',
        '<span>{{db:item.name}} for {{db:product.name}}</span>',
      );
      const outerElement = buildElement(
        buildRepeaterMarkup(
          'data-db-source="products" data-db-item-as="product"',
          `<h4>{{db:product.name}}</h4>${innerMarkup}`,
        ),
      );
      expandRepeaterElement(registry, outerElement);
      expect(outerElement.children.length).toBe(3);
      const firstCard = outerElement.children[0];
      expect(firstCard.querySelector('h4').textContent).toBe('Starter Site');
      expect(firstCard.querySelectorAll('span').length).toBe(3);
      expect(firstCard.querySelector('span').textContent).toBe('Avery Collins for Starter Site');
      expect(outerElement.querySelectorAll('[data-db-repeater-item]').length).toBe(0);
      expect(outerElement.querySelectorAll('[data-db-repeater]').length).toBe(0);
    });

    test('evaluates conditions against the current item', () => {
      const condition = JSON.stringify({ kind: 'fieldEquals', field: 'item.role', value: 'Lead Engineer' });
      const repeaterElement = buildElement(
        buildRepeaterMarkup(
          'data-db-source="teamMembers"',
          `<em data-db-condition='${condition}'>LEAD</em><b>{{db:item.name}}</b>`,
        ),
      );
      expandRepeaterElement(registry, repeaterElement);
      expect(repeaterElement.querySelectorAll('em').length).toBe(1);
      expect(repeaterElement.querySelectorAll('[data-db-condition]').length).toBe(0);
    });

    test('renders the empty message or drops the repeater when there are no items', () => {
      const withMessage = buildElement(
        buildRepeaterMarkup('data-db-source="missing" data-db-empty-text="Coming soon"', '<b>x</b>'),
      );
      const hostElement = document.createElement('div');
      hostElement.appendChild(withMessage);
      expandRepeaterElement(registry, withMessage);
      expect(hostElement.querySelector('.db-repeater-empty').textContent).toBe('Coming soon');
      const withoutMessage = buildElement(buildRepeaterMarkup('data-db-source="missing"', '<b>x</b>'));
      const otherHost = document.createElement('div');
      otherHost.appendChild(withoutMessage);
      expandRepeaterElement(registry, withoutMessage);
      expect(otherHost.children.length).toBe(0);
    });
  });

  describe('editor preview of tokens', () => {
    test('resolves text and attributes in the DOM and restores the raw tokens', () => {
      const editorStub = { getModel: () => ({ get: () => registry }) };
      const rootElement = buildElement(
        '<div><a href="mailto:{{db:siteInfo.email}}">Email {{db:siteInfo.name}}</a></div>',
      );
      applyBindingPreviewInElement(editorStub, rootElement);
      const linkElement = rootElement.querySelector('a');
      expect(linkElement.textContent).toBe('Email Northwind Studio');
      expect(linkElement.getAttribute('href')).toBe('mailto:hello@northwind.studio');
      expect(linkElement.hasAttribute('data-db-bound-preview')).toBe(true);
      restoreBindingPreviewInElement(rootElement);
      expect(linkElement.textContent).toBe('Email {{db:siteInfo.name}}');
      expect(linkElement.getAttribute('href')).toBe('mailto:{{db:siteInfo.email}}');
      expect(linkElement.hasAttribute('data-db-bound-preview')).toBe(false);
    });

    test('resolves template tokens against the first item of the owning repeater', () => {
      const editorStub = { getModel: () => ({ get: () => registry }) };
      const rootElement = buildElement(
        buildRepeaterMarkup('data-db-source="teamMembers"', '<h4>{{db:item.name}}</h4>'),
      );
      applyBindingPreviewInElement(editorStub, rootElement);
      expect(rootElement.querySelector('h4').textContent).toBe('Avery Collins');
    });
  });

  describe('grid editor helpers', () => {
    test('camel cases source names', () => {
      expect(toCamelCaseName('My Partners')).toBe('myPartners');
      expect(toCamelCaseName('  2024 events ')).toBe('source2024Events');
      expect(toCamelCaseName('***')).toBe('');
    });

    test('parses pasted spreadsheet rows into records', () => {
      const records = convertRowsToRecords(parseDelimitedText('name\trole\nAda\t"Engineer, lead"\nGrace\tAdmiral'));
      expect(records).toEqual([
        { name: 'Ada', role: 'Engineer, lead' },
        { name: 'Grace', role: 'Admiral' },
      ]);
      expect(parseDelimitedText('a,b\n1,"x""y"')).toEqual([
        ['a', 'b'],
        ['1', 'x"y'],
      ]);
    });

    test('keeps cell types when editing', () => {
      expect(parseCellTextByKind('42', 'number')).toBe(42);
      expect(parseCellTextByKind('yes', 'boolean')).toBe(true);
      expect(parseCellTextByKind('{"a":1}', 'json')).toEqual({ a: 1 });
      expect(parseCellTextByKind('42', 'string')).toBe('42');
    });

    test('marks a missing source in the trait options', () => {
      const options = buildSourceOptionRecords(['faqs', 'products'], 'partners');
      expect(options[0]).toEqual({ id: 'partners', label: 'partners (missing)' });
      const traits = buildRepeaterTraitDefinitions(['faqs'], 'faqs');
      expect(traits.every((trait) => trait.category && trait.category.id === 'db-repeater')).toBe(true);
      expect(traits.find((trait) => trait.name === 'data-db-limit').label).toBe('Show at most');
    });
  });

  describe('with an editor', () => {
    let editor;

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

    test('removing a field from an object source survives the save', () => {
      updateDataSourceRegistry(editor, { siteInfo: { name: 'Acme', email: 'a@b.c' } });
      expect(getDataSourceRegistry(editor).siteInfo.phone).toBeUndefined();
      expect(getDataSourceRegistry(editor).siteInfo.name).toBe('Acme');
      updateDataSourceRegistry(editor, { products: null });
      expect(getDataSourceRegistry(editor).products).toBeUndefined();
    });

    test('existing repeaters see new sources in their dropdown', () => {
      const repeaterComponent = editor.getWrapper().append({ type: 'db-repeater' })[0];
      updateDataSourceRegistry(editor, { partners: [{ name: 'Acme' }] });
      const optionIds = repeaterComponent
        .getTrait('data-db-source')
        .get('options')
        .map((option) => option.id);
      expect(optionIds).toContain('partners');
    });

    test('export expands repeaters and never ships preview or editor attributes', () => {
      editor.getWrapper().append({ type: 'db-repeater' });
      editor.getWrapper().append('<p>Hi {{ db:siteInfo.name }}</p>');
      const exportedMarkup = resolveBindingTokensInMarkup(editor, editor.getHtml());
      expect(exportedMarkup).toContain('Starter Site');
      expect(exportedMarkup).toContain('Hi Northwind Studio');
      expect(exportedMarkup).not.toContain('{{db:');
      expect(exportedMarkup).not.toContain('data-db-repeater-item');
      expect(exportedMarkup).not.toContain('data-db-repeater-preview');
      expect(exportedMarkup).not.toContain('data-db-limit');
    });

    test('dropping a repeater does not fill the undo stack with preview steps', () => {
      editor.UndoManager.clear();
      editor.getWrapper().append({ type: 'db-repeater' });
      expect(editor.UndoManager.getStack().length).toBeLessThanOrEqual(2);
      expect(JSON.stringify(editor.getProjectData())).not.toContain('data-db-repeater-preview');
    });

    test('lists tokens that resolve to nothing', () => {
      editor.getWrapper().append('<p>{{db:siteInfo.nope}} {{db:siteInfo.name}}</p>');
      const unresolved = collectUnresolvedBindingTokens(editor);
      expect(unresolved.map((entry) => entry.token)).toEqual(['{{db:siteInfo.nope}}']);
    });

    test('the data sources modal is a grid editor with cancel, add and two-step delete', () => {
      const editorState = openDataSourcesModal(editor);
      const formElement = document.querySelector('.gjs-db-data-sources');
      expect(formElement).toBeTruthy();
      const nameElements = formElement.querySelectorAll('.gjs-db-source-name');
      expect(Array.from(nameElements).map((element) => element.textContent)).toEqual([
        'faqs',
        'products',
        'siteInfo',
        'teamMembers',
        'testimonials',
      ]);
      expect(formElement.querySelectorAll('[data-db-source-entry="products"] [data-db-cell-row="0"]').length).toBe(3);
      expect(formElement.querySelector('[data-db-source-cancel]')).toBeTruthy();
      const nameInput = formElement.querySelector('[data-db-source-add-name]');
      nameInput.value = 'My Partners';
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      expect(formElement.querySelector('[data-db-source-add-hint]').textContent).toContain('myPartners');
      nameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(formElement.querySelector('[data-db-source-entry="myPartners"]')).toBeTruthy();
      const deleteButton = formElement.querySelector('[data-db-source-entry="faqs"] [data-db-source-delete]');
      deleteButton.click();
      expect(formElement.querySelector('[data-db-source-entry="faqs"]')).toBeTruthy();
      expect(deleteButton.textContent).toBe('Really delete?');
      deleteButton.click();
      expect(formElement.querySelector('[data-db-source-entry="faqs"]')).toBeNull();
      expect(editorState.dirty).toBe(true);
    });

    test('grid edits are saved with their original types and json errors are shown inline', () => {
      openDataSourcesModal(editor);
      const formElement = document.querySelector('.gjs-db-data-sources');
      const cellInput = formElement.querySelector(
        '[data-db-source-entry="products"] [data-db-cell-row="0"][data-db-cell-field="name"]',
      );
      cellInput.value = 'Launch Site';
      cellInput.dispatchEvent(new Event('input', { bubbles: true }));
      formElement.querySelector('[data-db-source-entry="siteInfo"] [data-db-source-mode="json"]').click();
      const jsonArea = formElement.querySelector('[data-db-source-json="siteInfo"]');
      jsonArea.value = '{ broken';
      jsonArea.dispatchEvent(new Event('input', { bubbles: true }));
      expect(jsonArea.getAttribute('aria-invalid')).toBe('true');
      expect(formElement.querySelector('[data-db-json-error]').hidden).toBe(false);
      formElement.querySelector('[data-db-source-save]').click();
      expect(document.querySelector('.gjs-db-data-sources')).toBeTruthy();
      jsonArea.value = '{"name":"Acme","email":"a@b.c"}';
      jsonArea.dispatchEvent(new Event('input', { bubbles: true }));
      formElement.querySelector('[data-db-source-save]').click();
      const savedRegistry = getDataSourceRegistry(editor);
      expect(savedRegistry.products[0].name).toBe('Launch Site');
      expect(savedRegistry.siteInfo).toEqual({ name: 'Acme', email: 'a@b.c' });
      expect(document.querySelector('.gjs-db-toast')).toBeTruthy();
    });
  });
});
