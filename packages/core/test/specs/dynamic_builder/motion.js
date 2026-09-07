import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import boostCssSpecificity from '../../../src/dynamic-builder/customCode/boostCssSpecificity';
import buildPageDocumentMarkup from '../../../src/dynamic-builder/exporter/buildPageDocumentMarkup';
import convertMillisecondsToSeconds from '../../../src/dynamic-builder/interactions/convertMillisecondsToSeconds';
import convertSecondsToMilliseconds from '../../../src/dynamic-builder/interactions/convertSecondsToMilliseconds';
import describeFlowPreviewWarnings from '../../../src/dynamic-builder/interactions/describeFlowPreviewWarnings';
import describeTargetMatches from '../../../src/dynamic-builder/interactions/describeTargetMatches';
import getDialogRuntimeSource from '../../../src/dynamic-builder/interactions/getDialogRuntimeSource';
import getFlowRuntimeSource from '../../../src/dynamic-builder/interactions/getFlowRuntimeSource';
import mergeAlertFlowIntoRecords from '../../../src/dynamic-builder/interactions/mergeAlertFlowIntoRecords';
import readComponentFlows from '../../../src/dynamic-builder/interactions/readComponentFlows';
import resolveFlowBuilderAction from '../../../src/dynamic-builder/interactions/resolveFlowBuilderAction';
import resolveInteractionSettings from '../../../src/dynamic-builder/interactions/resolveInteractionSettings';
import updateSiteMetaRecord from '../../../src/dynamic-builder/support/updateSiteMetaRecord';
import validateCodeText from '../../../src/dynamic-builder/codeEditor/validateCodeText';
import walkHtmlTagStack from '../../../src/dynamic-builder/codeEditor/walkHtmlTagStack';
import writeComponentFlows from '../../../src/dynamic-builder/interactions/writeComponentFlows';

const waitForCanvasRender = async (component) => {
  for (let attempt = 0; attempt < 60 && !component.getEl(); attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
};

describe('Dynamic builder motion', () => {
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

  describe('animate on scroll', () => {
    test('choosing an effect fills the defaults and choosing none clears every animation attribute', () => {
      const textComponent = editor.getWrapper().append({ type: 'db-text' })[0];
      textComponent.addAttributes({ 'data-db-aos': 'fade-up' });
      const filledAttributes = textComponent.getAttributes();
      expect(filledAttributes['data-db-aos-duration']).toBe('700');
      expect(filledAttributes['data-db-aos-once']).toBe('true');
      textComponent.addAttributes({ 'data-db-aos-duration': '1500', 'data-db-aos': 'none' });
      const remainingNames = Object.keys(textComponent.getAttributes()).filter(
        (name) => name.indexOf('data-db-aos') === 0,
      );
      expect(remainingNames).toEqual([]);
      expect(buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {})).not.toContain('data-db-aos');
    });

    test('the runtime expands staggered parents and releases will-change after reveal', () => {
      const gridComponent = editor.getWrapper().append({ type: 'db-text' })[0];
      gridComponent.addAttributes({ 'data-db-aos': 'zoom-in', 'data-db-aos-stagger': '120' });
      const documentMarkup = buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {});
      expect(documentMarkup).toContain('data-db-aos-stagger');
      expect(documentMarkup).toContain('dbAosObservers');
      expect(documentMarkup).toContain('will-change: auto');
    });
  });

  describe('dialog button', () => {
    test('extra flows and steps survive a settings change', () => {
      const buttonComponent = editor.getWrapper().append({ type: 'db-alert-button' })[0];
      const flowRecords = readComponentFlows(buttonComponent);
      flowRecords[0].actions.push({ type: 'toggle-class', options: { className: 'is-done' } });
      flowRecords.push({
        id: 'flow-hover',
        trigger: 'hover',
        triggerOptions: {},
        actions: [{ type: 'add-class', options: { className: 'is-hot' } }],
      });
      writeComponentFlows(buttonComponent, flowRecords);
      buttonComponent.addAttributes({ 'data-db-alert-title': 'All set', 'data-db-alert-then': 'open-url' });
      buttonComponent.addAttributes({ 'data-db-alert-url': '/thank-you' });
      const mergedFlows = readComponentFlows(buttonComponent);
      expect(mergedFlows.length).toBe(2);
      expect(mergedFlows[0].actions.map((actionRecord) => actionRecord.type)).toEqual([
        'alert',
        'open-url',
        'toggle-class',
      ]);
      expect(mergedFlows[0].actions[0].options.title).toBe('All set');
      expect(mergedFlows[1].trigger).toBe('hover');
    });

    test('a changed follow-up replaces the generated step only', () => {
      const existingFlows = [
        {
          id: 'flow-a',
          trigger: 'click',
          triggerOptions: {},
          actions: [
            { type: 'alert', options: { title: 'Old' } },
            { type: 'open-url', options: { url: '/old', newTab: 'false' } },
            { type: 'wait', options: { delay: '200' } },
          ],
        },
      ];
      const mergedFlows = mergeAlertFlowIntoRecords(existingFlows, {
        'data-db-alert-title': 'New',
        'data-db-alert-then': 'submit-form',
        'data-db-alert-form': '#signup',
      });
      expect(mergedFlows[0].actions.map((actionRecord) => actionRecord.type)).toEqual(['alert', 'submit-form', 'wait']);
      expect(mergedFlows[0].actions[1].options.target).toBe('#signup');
    });

    test('exports keep only the flow data on the button and offer the link field when needed', () => {
      const buttonComponent = editor.getWrapper().append({ type: 'db-alert-button' })[0];
      expect(buttonComponent.toHTML()).not.toContain('data-db-alert-title');
      expect(buttonComponent.toHTML()).toContain('data-db-flows');
      const traitNames = () => buttonComponent.get('traits').map((traitModel) => traitModel.get('name'));
      expect(traitNames()).not.toContain('data-db-alert-url');
      buttonComponent.addAttributes({ 'data-db-alert-then': 'open-url' });
      expect(traitNames()).toContain('data-db-alert-url');
    });
  });

  describe('flow runtime', () => {
    test('the built-in dialog is the default and is an accessible modal', () => {
      expect(resolveInteractionSettings({}).enabled).toBe(false);
      expect(resolveInteractionSettings({ sweetAlert: { enabled: true } }).enabled).toBe(true);
      const dialogSource = getDialogRuntimeSource(resolveInteractionSettings({}));
      expect(dialogSource).toContain('aria-labelledby');
      expect(dialogSource).toContain('previousFocus.focus()');
      expect(dialogSource).toContain('dismiss: confirmed ? undefined : reason');
      expect(dialogSource).toContain('dialogIcons[kind]');
    });

    test('the runtime binds keyboard access, typing guards and remembered values', () => {
      const runtimeSource = getFlowRuntimeSource();
      expect(runtimeSource).toContain('setAttribute("role", "button")');
      expect(runtimeSource).toContain('"focusout"');
      expect(runtimeSource).toContain('isTypingTarget(keyEvent.target, element)');
      expect(runtimeSource).toContain('"show-if-remembered"');
      expect(runtimeSource).toContain('flow.trigger === "remembered"');
      expect(runtimeSource).toContain('acknowledged = !offersCancel || dismissReason === "timer"');
      expect(runtimeSource).toContain('window.dbFlows = registry');
    });

    test('a page with a dialog snippet in a custom script ships the dialog runtime', () => {
      const scriptComponent = editor.getWrapper().append({ type: 'db-custom-script' })[0];
      scriptComponent.addAttributes({ scriptCode: "window.dbShowDialog({ title: 'Hi' });" });
      updateSiteMetaRecord(editor, { customCode: { allowScripts: true } });
      expect(buildPageDocumentMarkup(editor, editor.Pages.getSelected(), {})).toContain('dbShowDialog = function');
    });
  });

  describe('flow builder helpers', () => {
    const sampleFlows = () => [
      {
        id: 'flow-1',
        trigger: 'click',
        triggerOptions: {},
        actions: [
          { type: 'wait', options: { delay: '400' } },
          { type: 'show', options: { target: '#a' } },
        ],
      },
    ];

    test('steps move, flows duplicate and the focus target follows the change', () => {
      const moved = resolveFlowBuilderAction('move-down', sampleFlows(), { flowIndex: 0, actionIndex: 0 });
      expect(moved.flows[0].actions.map((actionRecord) => actionRecord.type)).toEqual(['show', 'wait']);
      expect(moved.focusSelector).toContain('data-db-flow-action-index="1"');
      const duplicated = resolveFlowBuilderAction('duplicate', sampleFlows(), { flowIndex: 0 });
      expect(duplicated.flows.length).toBe(2);
      expect(duplicated.flows[1].id).not.toBe('flow-1');
      expect(duplicated.flows[1].actions[1].options.target).toBe('#a');
      expect(resolveFlowBuilderAction('move-up', sampleFlows(), { flowIndex: 0, actionIndex: 0 })).toBeNull();
    });

    test('time fields round-trip between seconds and milliseconds', () => {
      expect(convertMillisecondsToSeconds('1500')).toBe('1.5');
      expect(convertMillisecondsToSeconds('0')).toBe('');
      expect(convertSecondsToMilliseconds('2.5')).toBe('2500');
      expect(convertSecondsToMilliseconds('')).toBe('');
    });

    test('target hints report matches, misses and invalid selectors', () => {
      document.body.insertAdjacentHTML('beforeend', '<div id="probe-target"></div>');
      expect(describeTargetMatches(document, '#probe-target').state).toBe('ok');
      expect(describeTargetMatches(document, '.missing-thing').state).toBe('empty');
      expect(describeTargetMatches(document, '#(').state).toBe('invalid');
      expect(describeTargetMatches(document, '').state).toBe('self');
      const warnings = describeFlowPreviewWarnings(document, [
        {
          actions: [
            { type: 'open-url', options: { url: '/next' } },
            { type: 'show', options: { target: '.missing-thing' } },
          ],
        },
      ]);
      expect(warnings.length).toBe(2);
    });

    test('a step the preview cannot finish says so at the moment it is clicked', () => {
      const runtimeSource = getFlowRuntimeSource();
      expect(runtimeSource).toContain('window.dbFlowsNotice(messageText)');
      expect(runtimeSource).toContain('Links are not opened while you preview');
      expect(runtimeSource).toContain('Forms are not sent while you preview');
      expect(runtimeSource).not.toContain('allowCustomJs');
    });
  });

  describe('custom code', () => {
    test('user CSS is boosted so plain selectors beat builder styles', () => {
      const boosted = boostCssSpecificity(
        '.db-heading { color: red; }\n@media (max-width: 600px) { .a, .b:hover { x: 1 } }',
      );
      expect(boosted).toContain(':root:root .db-heading {');
      expect(boosted).toContain(':root:root .a, :root:root .b:hover {');
      expect(boostCssSpecificity('@keyframes spin { from { x: 0 } to { x: 1 } }')).not.toContain(':root:root');
      expect(boostCssSpecificity(':root { --x: 1 }')).toContain(':root:root:root {');
      expect(boostCssSpecificity('html.dark .x { y: 1 }')).toContain('html:root:root.dark .x {');
    });

    test('custom HTML children are inert and edits flow through the code attribute', () => {
      const htmlComponent = editor.getWrapper().append({ type: 'db-custom-html' })[0];
      htmlComponent.addAttributes({ htmlCode: '<p>Hi</p><a href="/contact">Contact</a>' });
      const childComponents = htmlComponent.components();
      expect(childComponents.length).toBe(2);
      expect(childComponents.at(0).get('selectable')).toBe(false);
      expect(childComponents.at(0).get('editable')).toBe(false);
      expect(htmlComponent.toHTML()).toContain('Contact');
      expect(htmlComponent.toHTML()).not.toContain('htmlCode');
    });

    test('flows pasted into a custom HTML block are dropped', () => {
      const htmlComponent = editor.getWrapper().append({ type: 'db-custom-html' })[0];
      htmlComponent.addAttributes({
        htmlCode: '<button data-db-flows="[]" class="pasted">Hi</button>',
      });
      expect(htmlComponent.toHTML()).toContain('pasted');
      expect(htmlComponent.toHTML()).not.toContain('data-db-flows');
    });

    test('the script card says when it will not ship', async () => {
      const scriptComponent = editor.getWrapper().append({ type: 'db-custom-script' })[0];
      expect(scriptComponent.toHTML()).toBe('');
      await waitForCanvasRender(scriptComponent);
      const noteTexts = () =>
        scriptComponent
          .find('.db-code-card-note')
          .map((noteComponent) =>
            noteComponent.getEl && noteComponent.getEl() ? noteComponent.getEl().textContent : '',
          );
      expect(noteTexts().join(' ')).toContain('Will not ship');
      updateSiteMetaRecord(editor, { customCode: { allowScripts: true } });
      editor.trigger('db:custom-code:update', { allowScripts: true });
      expect(noteTexts().join(' ')).not.toContain('Will not ship');
    });
  });

  describe('code validation', () => {
    test('html validation catches unclosed and mismatched tags but not comments', () => {
      expect(validateCodeText('html', '<div class="x">\n<p>Hello</p>').valid).toBe(false);
      expect(validateCodeText('html', '<div class="x">\n<p>Hello</p>').message).toContain('<div>');
      expect(validateCodeText('html', '<p>Hi <b>there</p></b>').valid).toBe(false);
      expect(validateCodeText('html', '<!-- comment with </div> -->').valid).toBe(true);
      expect(validateCodeText('html', '<ul><li>One<li>Two</ul>').valid).toBe(true);
      expect(validateCodeText('html', '<img src="x.png"><br><input>').valid).toBe(true);
      expect(walkHtmlTagStack('<script>if (a < b) {}</script><div></div>').problem).toBe('');
    });
  });
});
