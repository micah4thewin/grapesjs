import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildButtonContentCss from '../../../src/dynamic-builder/contentComponents/buildButtonContentCss';
import buildButtonVariantCss from '../../../src/dynamic-builder/contentComponents/buildButtonVariantCss';
import buildSectionLayoutCss from '../../../src/dynamic-builder/layoutComponents/buildSectionLayoutCss';
import buildColumnsLayoutCss from '../../../src/dynamic-builder/layoutComponents/buildColumnsLayoutCss';
import buildGoogleFontImportUrl from '../../../src/dynamic-builder/typography/buildGoogleFontImportUrl';
import isPlaceholderCopyText from '../../../src/dynamic-builder/contentComponents/isPlaceholderCopyText';
import readComponentPlainText from '../../../src/dynamic-builder/support/readComponentPlainText';
import unwrapTagsInsideSelection from '../../../src/dynamic-builder/typography/unwrapTagsInsideSelection';
import wrapSelectionWithTag from '../../../src/dynamic-builder/typography/wrapSelectionWithTag';

describe('Dynamic builder content and layout components', () => {
  let editor;

  const appendSection = (attributes = {}) => editor.getWrapper().append({ type: 'db-section', attributes })[0];
  const appendColumns = (presetKey) => {
    const sectionComponent = appendSection();
    const containerComponent = sectionComponent.components().at(0);
    containerComponent.components().reset();
    const [columnsComponent] = containerComponent.append({
      type: 'db-columns',
      attributes: { 'data-db-columns': presetKey },
    });
    return columnsComponent;
  };
  const toolbarTitles = (component) =>
    (component.get('toolbar') || []).map((item) => (item.attributes && item.attributes.title) || '');

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

  describe('sections', () => {
    test('clearing or rejecting a background image is safe and leaves no stale attributes', () => {
      const sectionComponent = appendSection();
      editor.select(sectionComponent);
      sectionComponent.getTrait('data-db-bg-image').setValue('https://example.com/bg.jpg');
      expect(sectionComponent.getAttributes()['data-db-has-bg']).toBe('true');
      sectionComponent.getTrait('data-db-bg-image').setValue('');
      expect(sectionComponent.getAttributes()['data-db-has-bg']).toBeUndefined();
      expect(sectionComponent.getClasses()).toContain('db-section');
      sectionComponent.getTrait('data-db-bg-image').setValue('javascript:alert(1)');
      expect(sectionComponent.getAttributes()['data-db-bg-image']).toBeUndefined();
      expect(sectionComponent.getAttributes()['data-db-has-bg']).toBeUndefined();
    });

    test('a fresh section exports no overlay attribute and no exported placeholder class', () => {
      const html = appendSection().toHTML();
      expect(html).not.toContain('data-db-overlay');
      expect(html).not.toContain('db-layout-placeholder');
      expect(html).toContain('data-db-placeholder="true"');
    });

    test('theme rules re-scope the text tokens so every child stays readable', () => {
      const css = buildSectionLayoutCss();
      expect(css).toMatch(/\.db-section\[data-db-theme=dark\][^{]*\{[^}]*--db-color-text:/);
      expect(css).toMatch(/\.db-section\[data-db-overlay=true\][^{]*\{[^}]*--db-color-text-muted:/);
      expect(css).toMatch(/\.db-section\[data-db-theme=brand\][^{]*\{[^}]*--db-color-brand-contrast:/);
      expect(css).not.toMatch(/background-color: var\(--db-color-text/);
    });

    test('the anchor trait slugifies into the id and clearing it removes the id', () => {
      const sectionComponent = appendSection();
      sectionComponent.set({ dbAnchor: 'My Section' });
      expect(sectionComponent.getAttributes().id).toBe('my-section');
      sectionComponent.set({ dbAnchor: '' });
      expect(sectionComponent.get('attributes').id).toBeUndefined();
    });

    test('the add-section toolbar button is not persisted and comes back after a reload', () => {
      const sectionComponent = appendSection();
      editor.select(sectionComponent);
      expect(toolbarTitles(sectionComponent)).toContain('Add section below');
      const projectJson = JSON.stringify(editor.getProjectData());
      expect(projectJson).not.toContain('dbAddSectionWired');
      editor.loadProjectData(JSON.parse(projectJson));
      const reloadedSection = editor.getWrapper().find('[data-db-type=section]')[0];
      editor.select(reloadedSection);
      expect(toolbarTitles(reloadedSection)).toContain('Add section below');
      editor.select(reloadedSection.components().at(0));
      editor.select(reloadedSection);
      expect(toolbarTitles(reloadedSection).filter((title) => title === 'Add section below').length).toBe(1);
    });

    test('section content gets an add-below toolbar button', () => {
      const headingComponent = appendSection().components().at(0).components().at(0);
      editor.select(headingComponent);
      expect(toolbarTitles(headingComponent)).toContain('Add block below');
    });
  });

  describe('placeholders', () => {
    test('seeded copy is marked and named, and editing the copy removes the marker', () => {
      const containerComponent = appendSection().components().at(0);
      const headlineComponent = containerComponent.components().at(0);
      expect(headlineComponent.get('type')).toBe('db-heading');
      expect(headlineComponent.getName()).toBe('Section headline');
      expect(headlineComponent.getAttributes()['data-db-placeholder']).toBe('true');
      headlineComponent.components('Our real headline');
      expect(headlineComponent.getAttributes()['data-db-placeholder']).toBeUndefined();
    });

    test('default text blocks are marked as sample copy and legacy classes migrate', () => {
      const [textComponent] = editor.getWrapper().append({ type: 'db-text' });
      expect(textComponent.getAttributes()['data-db-placeholder']).toBe('true');
      const [legacyComponent] = editor.getWrapper().append({
        type: 'text',
        tagName: 'p',
        classes: ['db-layout-placeholder'],
        content: 'Column content. Drop blocks here or edit this text.',
      });
      expect(legacyComponent.getClasses()).not.toContain('db-layout-placeholder');
      expect(legacyComponent.getAttributes()['data-db-placeholder']).toBe('true');
    });

    test('placeholder detection ignores whitespace and case', () => {
      expect(isPlaceholderCopyText('  a clear HEADLINE for this section ', {})).toBe(true);
      expect(isPlaceholderCopyText('Our launch is coming', {})).toBe(false);
      const [headingComponent] = editor.getWrapper().append({ type: 'db-heading', components: 'Hello <b>there</b>' });
      expect(readComponentPlainText(headingComponent)).toBe('Hello there');
    });
  });

  describe('columns', () => {
    test('shrinking the preset keeps edited content by moving it into the last column', () => {
      const columnsComponent = appendColumns('three');
      columnsComponent.append({ type: 'db-column' });
      const thirdColumn = columnsComponent.components().at(2);
      thirdColumn.components().at(0).components('My real edited content');
      columnsComponent.addAttributes({ 'data-db-columns': 'two' });
      expect(columnsComponent.components().length).toBe(2);
      const secondColumn = columnsComponent.components().at(1);
      expect(readComponentPlainText(secondColumn)).toBe('My real edited content');
    });

    test('shrinking the preset drops untouched placeholder columns', () => {
      const columnsComponent = appendColumns('three');
      columnsComponent.append({ type: 'db-column' });
      columnsComponent.addAttributes({ 'data-db-columns': 'two' });
      expect(columnsComponent.components().length).toBe(2);
      expect(readComponentPlainText(columnsComponent.components().at(1))).toContain('Column content');
    });

    test('deleting a column re-syncs the layout preset', () => {
      const columnsComponent = appendColumns('three');
      columnsComponent.append({ type: 'db-column' });
      columnsComponent.components().at(2).remove();
      expect(columnsComponent.getAttributes()['data-db-columns']).toBe('two');
      columnsComponent.components().at(1).remove();
      expect(columnsComponent.getAttributes()['data-db-columns']).toBe('custom');
      expect(columnsComponent.getStyle()['--db-col-template']).toBe('minmax(0, 1fr)');
    });

    test('legacy mobile attributes migrate to the single mobile setting', () => {
      const [columnsComponent] = editor.getWrapper().append({
        type: 'db-columns',
        classes: ['db-columns', 'db-stack-mobile'],
        attributes: { 'data-db-stack-mobile': 'true', 'data-db-reverse-mobile': 'true' },
      });
      const attributeRecord = columnsComponent.getAttributes();
      expect(attributeRecord['data-db-mobile']).toBe('stack-reverse');
      expect(attributeRecord['data-db-stack-mobile']).toBeUndefined();
      expect(columnsComponent.getClasses()).not.toContain('db-stack-mobile');
      expect(buildColumnsLayoutCss()).toContain('[data-db-mobile=side-by-side]');
    });

    test('columns dropped on the page get wrapped in a section', () => {
      const [columnsComponent] = editor.getWrapper().append({ type: 'db-columns' });
      editor.trigger('block:drag:stop', columnsComponent);
      const parentComponent = columnsComponent.parent();
      expect(parentComponent.get('type')).toBe('db-container');
      expect(parentComponent.parent().get('type')).toBe('db-section');
      expect(editor.getWrapper().components().length).toBe(1);
    });

    test('containers may be dropped into columns', () => {
      const columnsComponent = appendColumns('two');
      const columnComponent = columnsComponent.components().at(0);
      expect(editor.Components.canMove(columnComponent, { type: 'db-container' }).result).toBe(true);
      expect(editor.Components.canMove(columnComponent, { type: 'db-columns' }).result).toBe(false);
    });
  });

  describe('spacer', () => {
    test('dragging the handle writes the custom height token instead of a fixed height', () => {
      const [spacerComponent] = editor.getWrapper().append({ type: 'db-spacer' });
      let appliedStyle = null;
      editor.trigger('component:resize:update', {
        component: spacerComponent,
        style: { height: '100px' },
        updateStyle: (styleRecord) => {
          appliedStyle = styleRecord;
          spacerComponent.addStyle(styleRecord);
        },
      });
      editor.trigger('component:resize:end', { component: spacerComponent });
      expect(appliedStyle).toEqual({ '--db-spacer-height': '100px' });
      expect(spacerComponent.getAttributes()['data-db-spacer']).toBe('custom');
      spacerComponent.addAttributes({ 'data-db-spacer': 'xl' });
      expect(spacerComponent.getStyle()['--db-spacer-height']).toBeUndefined();
    });
  });

  describe('content components', () => {
    test('buttons default to a descriptive label with no dead link and use the shared classes', () => {
      const [buttonComponent] = editor.getWrapper().append({ type: 'db-button' });
      expect(buttonComponent.getAttributes().href).toBeUndefined();
      expect(readComponentPlainText(buttonComponent)).toBe('Get started');
      const buttonCss = buildButtonContentCss() + buildButtonVariantCss();
      ['primary', 'secondary', 'outline', 'ghost', 'link', 'danger'].forEach((variantName) => {
        expect(buttonCss).toContain(`.db-button-${variantName}`);
        expect(buttonCss).toContain(`.db-button[data-db-variant='${variantName}']`);
      });
      expect(buttonCss).toContain('.db-button-full-mobile');
      expect(buttonCss).toContain('min-height: 44px');
    });

    test('text variants are keyed on the attribute and legacy eyebrow markup migrates', () => {
      const [leadComponent] = editor.getWrapper().append({
        type: 'db-text',
        attributes: { 'data-db-variant': 'lead' },
      });
      expect(leadComponent.getClasses()).toEqual(['db-text']);
      const [eyebrowComponent] = editor.getWrapper().append({
        type: 'db-text',
        classes: ['db-text', 'db-text-caption', 'db-eyebrow'],
        attributes: { 'data-db-variant': 'caption' },
        components: 'Our mission',
      });
      expect(eyebrowComponent.getAttributes()['data-db-variant']).toBe('eyebrow');
      expect(eyebrowComponent.getClasses()).toEqual(['db-text']);
    });

    test('callouts carry one glyph, swap it per type and keep a note role', () => {
      const [calloutComponent] = editor.getWrapper().append({ type: 'db-callout' });
      expect((calloutComponent.toHTML().match(/<svg/g) || []).length).toBe(1);
      calloutComponent.addAttributes({ 'data-db-variant': 'error' });
      expect(calloutComponent.getAttributes().role).toBe('note');
      const iconComponent = calloutComponent.components().at(0);
      expect(iconComponent.getAttributes()['data-db-glyph']).toBe('error');
      expect(iconComponent.toHTML()).toContain('m9 9 6 6');
      const svgComponent = iconComponent.components().at(0);
      expect(svgComponent.get('selectable')).toBe(false);
      expect(svgComponent.get('layerable')).toBe(false);
    });

    test('quotes use figure, blockquote and figcaption and can hide the source', () => {
      const [quoteComponent] = editor.getWrapper().append({ type: 'db-quote' });
      const html = quoteComponent.toHTML();
      expect(html).toMatch(/^<figure/);
      expect(html).toContain('<blockquote');
      expect(html).toContain('<figcaption');
      expect(html).not.toContain('<cite');
      expect(quoteComponent.getTrait('data-db-hide-source')).toBeTruthy();
      expect(quoteComponent.getTrait('data-db-quote')).toBeTruthy();
    });

    test('list and button group children have human names', () => {
      const [listComponent] = editor.getWrapper().append({ type: 'db-list' });
      expect(listComponent.components().at(0).getName()).toBe('List item');
      const [groupComponent] = editor.getWrapper().append({ type: 'db-button-group' });
      expect(groupComponent.getName()).toBe('Button group');
      expect(groupComponent.components().at(1).getName()).toBe('Second button');
      editor.select(listComponent);
      expect(toolbarTitles(listComponent)).toContain('Add item');
    });
  });

  describe('rich text helpers', () => {
    const buildFakeRte = (hostElement) => ({
      el: hostElement,
      doc: document,
      selection: () => document.getSelection(),
      updateActiveActions: () => {},
    });

    test('wrapping keeps existing inline formatting inside the selection', () => {
      const hostElement = document.createElement('p');
      hostElement.innerHTML = 'Plain <b>bold word</b> and more';
      document.body.appendChild(hostElement);
      const range = document.createRange();
      range.setStart(hostElement.firstChild, 6);
      range.setEnd(hostElement.querySelector('b').firstChild, 4);
      const selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      expect(wrapSelectionWithTag(buildFakeRte(hostElement), 'mark')).toBe(true);
      expect(hostElement.innerHTML).toBe('Plain <mark><b>bold</b></mark><b> word</b> and more');
    });

    test('clear formatting unwraps highlights inside the selection', () => {
      const hostElement = document.createElement('p');
      hostElement.innerHTML = 'Alpha <mark>delta</mark> end';
      document.body.appendChild(hostElement);
      const range = document.createRange();
      range.selectNodeContents(hostElement);
      const selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      expect(unwrapTagsInsideSelection(buildFakeRte(hostElement), 'MARK')).toBeGreaterThan(0);
      expect(hostElement.innerHTML).toBe('Alpha delta end');
    });
  });

  describe('google fonts', () => {
    test('italic entries request the ital axis', () => {
      const importUrl = buildGoogleFontImportUrl([{ family: 'Lora', weights: [400, 700], italic: true }]);
      expect(importUrl).toContain('family=Lora:ital,wght@0,400;0,700;1,400;1,700');
      expect(buildGoogleFontImportUrl([{ family: 'Inter', weights: [400] }])).toContain('family=Inter:wght@400');
    });
  });
});
