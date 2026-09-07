import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import addFormStep from '../../../src/dynamic-builder/formComponents/addFormStep';
import applySubmissionRecipe from '../../../src/dynamic-builder/formComponents/applySubmissionRecipe';
import buildSiteScriptText from '../../../src/dynamic-builder/exporter/buildSiteScriptText';
import ensureFieldControlId from '../../../src/dynamic-builder/formComponents/ensureFieldControlId';
import isFormConnected from '../../../src/dynamic-builder/formComponents/isFormConnected';
import normalizeRecipeEndpoint from '../../../src/dynamic-builder/formComponents/normalizeRecipeEndpoint';
import getSubmissionRecipeRecords from '../../../src/dynamic-builder/formComponents/getSubmissionRecipeRecords';
import runConditionalFieldsBehavior from '../../../src/dynamic-builder/formComponents/runConditionalFieldsBehavior';
import runFormBehavior from '../../../src/dynamic-builder/formComponents/runFormBehavior';
import runFormFieldBehavior from '../../../src/dynamic-builder/formComponents/runFormFieldBehavior';
import runFormStatusBehavior from '../../../src/dynamic-builder/formComponents/runFormStatusBehavior';
import runFormStepsBehavior from '../../../src/dynamic-builder/formComponents/runFormStepsBehavior';
import runSubmitButtonBehavior from '../../../src/dynamic-builder/formComponents/runSubmitButtonBehavior';
import sanitizeFieldName from '../../../src/dynamic-builder/formComponents/sanitizeFieldName';
import serializeOptionEntries from '../../../src/dynamic-builder/formComponents/serializeOptionEntries';
import wrapOrphanFormChild from '../../../src/dynamic-builder/formComponents/wrapOrphanFormChild';

const flushTimers = () => new Promise((resolve) => setTimeout(resolve, 0));

const collectDescendants = (component) =>
  component
    .components()
    .models.reduce(
      (records, childComponent) => records.concat([childComponent], collectDescendants(childComponent)),
      [],
    );
const findByTag = (component, tagName) =>
  collectDescendants(component).filter(
    (childComponent) => String(childComponent.get('tagName')).toLowerCase() === tagName,
  );
const findByClass = (component, className) =>
  collectDescendants(component).filter((childComponent) => childComponent.getClasses().includes(className));
const findByTagAttribute = (component, tagName, attributeName) =>
  findByTag(component, tagName).filter((childComponent) => childComponent.getAttributes()[attributeName] !== undefined);

describe('Dynamic builder forms', () => {
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

  const appendForm = () => editor.getWrapper().append({ type: 'db-form' })[0];

  describe('form model', () => {
    test('a new form posts multipart data, defaults to Formspree and is not connected yet', () => {
      const formComponent = appendForm();
      const formAttributes = formComponent.getAttributes();
      expect(formAttributes.enctype).toBe('multipart/form-data');
      expect(formAttributes['data-db-recipe']).toBe('formspree');
      expect(formAttributes.action).toBeUndefined();
      expect(isFormConnected(formAttributes)).toBe(false);
      expect(formComponent.findType('db-form-status').length).toBe(1);
      expect(formComponent.findType('db-form-status')[0].get('removable')).toBe(false);
    });

    test('recipes normalise ids into endpoints and only some are connected without a URL', () => {
      const formspreeRecord = getSubmissionRecipeRecords()[0];
      expect(formspreeRecord.id).toBe('formspree');
      expect(normalizeRecipeEndpoint(formspreeRecord, 'abcdwxyz')).toEqual({
        endpointUrl: 'https://formspree.io/f/abcdwxyz',
        isValid: true,
      });
      expect(normalizeRecipeEndpoint(formspreeRecord, 'https://usebasin.com/f/abc').isValid).toBe(false);
      expect(normalizeRecipeEndpoint(formspreeRecord, 'javascript:alert(1)').isValid).toBe(false);
      const formComponent = appendForm();
      formComponent.addAttributes({ action: 'https://formspree.io/f/abcdwxyz' });
      expect(isFormConnected(formComponent.getAttributes())).toBe(true);
      applySubmissionRecipe(formComponent, 'netlify');
      expect(formComponent.getAttributes()['data-netlify']).toBe('true');
      expect(formComponent.getAttributes().action).toBeUndefined();
      expect(isFormConnected(formComponent.getAttributes())).toBe(true);
      applySubmissionRecipe(formComponent, 'custom');
      expect(formComponent.getAttributes()['data-netlify']).toBeUndefined();
      expect(isFormConnected(formComponent.getAttributes())).toBe(false);
    });

    test('a raw status div is upgraded and labels are wired to stable ids', () => {
      const formComponent = editor.getWrapper().append({
        type: 'db-form',
        components: [
          { type: 'db-form-field' },
          { tagName: 'div', classes: ['db-form-status'], attributes: { 'data-db-form-status': 'true' } },
        ],
      })[0];
      expect(formComponent.findType('db-form-status').length).toBe(1);
      const fieldComponent = formComponent.findType('db-form-field')[0];
      const controlId = findByTag(fieldComponent, 'input')[0].getAttributes().id;
      expect(controlId).toMatch(/^db-field-/);
      expect(findByTag(fieldComponent, 'label')[0].getAttributes().for).toBe(controlId);
      expect(formComponent.toHTML()).toContain('for="' + controlId + '"');
    });

    test('the submit button uses the shared button classes and follows its style traits', () => {
      const buttonComponent = appendForm().findType('db-submit-button')[0];
      expect(buttonComponent.getClasses()).toEqual(
        expect.arrayContaining(['db-button', 'db-button-primary', 'db-button-md']),
      );
      buttonComponent.addAttributes({ 'data-db-variant': 'outline', 'data-db-size': 'lg' });
      expect(buttonComponent.getClasses()).toEqual(expect.arrayContaining(['db-button-outline', 'db-button-lg']));
      expect(buttonComponent.getClasses()).not.toContain('db-button-primary');
      expect(buttonComponent.getClasses()).not.toContain('db-button-md');
    });
  });

  describe('fields and choices', () => {
    test('switching the field type swaps the control and the default label', () => {
      const fieldComponent = appendForm().append({ type: 'db-form-field' }, { at: 0 })[0];
      fieldComponent.addAttributes({ 'data-db-required': 'true' });
      fieldComponent.addAttributes({ 'data-db-field-kind': 'email' });
      const controlComponent = findByTag(fieldComponent, 'input')[0];
      expect(controlComponent.getAttributes().type).toBe('email');
      expect(controlComponent.getAttributes().required).toBe('required');
      expect(fieldComponent.getAttributes()['data-db-label']).toBe('Email address');
      fieldComponent.addAttributes({ 'data-db-field-kind': 'textarea' });
      expect(findByTag(fieldComponent, 'textarea').length).toBe(1);
      expect(findByTag(fieldComponent, 'input').length).toBe(0);
    });

    test('inline label edits write back to the field so trait changes do not revert them', () => {
      const fieldComponent = appendForm().findType('db-form-field')[0];
      const labelComponent = findByTag(fieldComponent, 'label')[0];
      expect(labelComponent.get('type')).toBe('db-field-label');
      editor.trigger('rte:disable', { model: labelComponent, el: { textContent: ' Your full name ' } });
      expect(fieldComponent.getAttributes()['data-db-label']).toBe('Your full name');
      fieldComponent.addAttributes({ 'data-db-required': 'false' });
      expect(labelComponent.toHTML()).toContain('Your full name');
      expect(labelComponent.toHTML()).not.toContain('(required)');
    });

    test('a select always offers a placeholder option and its options are not editable', () => {
      const fieldComponent = appendForm().append(
        { type: 'db-form-field', components: [{ type: 'db-select' }] },
        { at: 0 },
      )[0];
      const selectComponent = findByTag(fieldComponent, 'select')[0];
      const optionComponents = selectComponent.components().models;
      expect(optionComponents[0].getAttributes().value).toBe('');
      expect(optionComponents[0].getAttributes().disabled).toBe('disabled');
      expect(optionComponents[0].getAttributes().selected).toBe('selected');
      expect(optionComponents[1].get('selectable')).toBe(false);
      expect(optionComponents[1].get('layerable')).toBe(false);
      selectComponent.addAttributes({ 'data-db-selected': 'support' });
      const supportOption = selectComponent.components().models.find((o) => o.getAttributes().value === 'support');
      expect(supportOption.getAttributes().selected).toBe('selected');
      expect(selectComponent.components().models[0].getAttributes().selected).toBeUndefined();
      selectComponent.addAttributes({ 'data-db-options': '' });
      expect(selectComponent.toHTML()).toContain('Option 1');
    });

    test('radio groups update in place, keep custom styling and sanitise the group name', () => {
      const radioComponent = appendForm().append({ type: 'db-radio-group' }, { at: 0 })[0];
      const firstChoice = findByClass(radioComponent, 'db-choice')[0];
      firstChoice.addClass('my-custom');
      radioComponent.addAttributes({ 'data-db-selected': 'phone', 'data-db-required': 'true' });
      radioComponent.addAttributes({ 'data-db-legend': 'Pick one' });
      expect(findByClass(radioComponent, 'my-custom').length).toBe(1);
      expect(findByTagAttribute(radioComponent, 'input', 'checked').length).toBe(1);
      expect(findByTagAttribute(radioComponent, 'input', 'required').length).toBe(3);
      expect(findByTag(radioComponent, 'legend')[0].toHTML()).toContain('Pick one');
      radioComponent.addAttributes({ 'data-db-group-name': 'a"b c' });
      expect(radioComponent.getAttributes()['data-db-group-name']).toBe('a-b-c');
      expect(findByTag(radioComponent, 'input')[0].getAttributes().name).toBe('a-b-c');
      radioComponent.addAttributes({ 'data-db-options': 'email|Email\npost|Post' });
      expect(findByClass(radioComponent, 'db-choice').length).toBe(2);
      expect(findByClass(radioComponent, 'my-custom').length).toBe(1);
      expect(sanitizeFieldName('  ', 'choice')).toBe('choice');
      expect(serializeOptionEntries([{ optionLabel: 'Email', optionValue: 'email' }, { optionLabel: 'Post' }])).toBe(
        'email|Email\nPost',
      );
    });

    test('checkboxes cannot be dropped into a form field and orphan fields get wrapped in a form', () => {
      const formComponent = appendForm();
      const fieldComponent = formComponent.findType('db-form-field')[0];
      const checkboxComponent = formComponent.append({ type: 'db-checkbox' })[0];
      expect(editor.Components.canMove(fieldComponent, checkboxComponent).result).toBe(false);
      const sectionComponent = editor.getWrapper().append({ type: 'db-section' })[0];
      const containerComponent = sectionComponent.findType('db-container')[0] || sectionComponent;
      const orphanField = containerComponent.append({ type: 'db-form-field' })[0];
      expect(wrapOrphanFormChild(editor, orphanField)).toBe(true);
      expect(orphanField.parent().get('type')).toBe('db-form');
      expect(orphanField.parent().findType('db-submit-button').length).toBe(1);
    });

    test('splitting into steps wraps the existing fields and adds the navigation', () => {
      const formComponent = appendForm();
      const addedStep = addFormStep(editor, formComponent);
      expect(formComponent.findType('db-form-step').length).toBe(2);
      expect(formComponent.findType('db-form-step')[0].findType('db-form-field').length).toBe(3);
      expect(addedStep.getAttributes()['data-db-legend']).toBe('Step 2');
      expect(findByTag(addedStep, 'legend')[0].toHTML()).toContain('Step 2');
      expect(formComponent.findType('db-form-steps-nav').length).toBe(1);
      const scriptText = buildSiteScriptText(editor, {});
      expect(scriptText).toContain('dbStepsReady');
      expect(scriptText).toContain('dbFormSend');
      formComponent.findType('db-form-step').forEach((stepComponent) => stepComponent.remove());
      expect(formComponent.findType('db-form-steps-nav').length).toBe(0);
    });
  });

  describe('runtime', () => {
    const mountForm = (formAttributes, innerMarkup) => {
      document.body.innerHTML =
        '<form data-db-form="true" novalidate ' +
        formAttributes +
        '>' +
        innerMarkup +
        '<button type="submit" data-db-sending-label="Sending now">Send</button>' +
        '<div class="db-form-status" data-db-form-status="true"></div></form>';
      runFormBehavior();
      runFormFieldBehavior();
      runFormStatusBehavior();
      runSubmitButtonBehavior();
      return document.querySelector('form');
    };
    const submitForm = (formElement) => {
      const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
      formElement.dispatchEvent(submitEvent);
      return submitEvent;
    };
    const fieldMarkup = (controlMarkup, labelText) =>
      '<div class="db-form-field" data-db-form-field="true"><label data-db-field-label="true">' +
      labelText +
      '</label>' +
      controlMarkup +
      '</div>';

    afterEach(() => {
      delete window.fetch;
    });

    test('errors clear while the visitor fixes the field and the message becomes assertive', () => {
      const formElement = mountForm(
        'action="https://formspree.io/f/abc" data-db-recipe="formspree"',
        fieldMarkup('<input type="email" name="email" required>', 'Email'),
      );
      const inputElement = formElement.querySelector('input');
      const submitEvent = submitForm(formElement);
      expect(submitEvent.defaultPrevented).toBe(true);
      const errorElement = formElement.querySelector('.db-field-error');
      expect(errorElement.textContent).toBe('Please fill in this field.');
      expect(inputElement.getAttribute('aria-describedby')).toContain(errorElement.id);
      expect(formElement.querySelector('[data-db-form-status]').getAttribute('role')).toBe('alert');
      inputElement.value = 'nope';
      inputElement.dispatchEvent(new window.Event('input', { bubbles: true }));
      expect(errorElement.textContent).toBe('Enter a valid email address.');
      inputElement.value = 'ann@example.com';
      inputElement.dispatchEvent(new window.Event('input', { bubbles: true }));
      expect(errorElement.textContent).toBe('');
      expect(inputElement.getAttribute('aria-describedby')).toBeNull();
      expect(inputElement.classList.contains('db-field-invalid')).toBe(false);
    });

    test('file, pattern and required-choice rules are enforced', () => {
      const formElement = mountForm(
        'action="https://formspree.io/f/abc"',
        fieldMarkup('<input type="file" name="cv" accept=".pdf" data-db-max-size-mb="1">', 'CV') +
          fieldMarkup(
            '<input type="text" name="code" pattern="[0-9]+" data-db-pattern-message="Digits only.">',
            'Code',
          ) +
          '<fieldset class="db-radio-group"><div class="db-choice-list"><label class="db-choice"><input type="radio" name="way" value="a" required></label>' +
          '<label class="db-choice"><input type="radio" name="way" value="b" required></label></div></fieldset>',
      );
      const fileInput = formElement.querySelector('input[type=file]');
      Object.defineProperty(fileInput, 'files', {
        value: [new window.File([new Uint8Array(2 * 1024 * 1024)], 'big.pdf', { type: 'application/pdf' })],
      });
      formElement.querySelector('input[name=code]').value = 'abc';
      submitForm(formElement);
      const errorTexts = [...formElement.querySelectorAll('.db-field-error')].map((el) => el.textContent);
      expect(errorTexts).toContain('Choose a file under 1 MB.');
      expect(errorTexts).toContain('Digits only.');
      expect(errorTexts).toContain('Choose one option.');
      expect(formElement.querySelector('.db-choice-list').nextElementSibling.classList.contains('db-field-error')).toBe(
        true,
      );
    });

    test('a form with no destination never fakes success', () => {
      window.fetch = jest.fn();
      const formElement = mountForm('data-db-recipe="formspree"', fieldMarkup('<input name="name">', 'Name'));
      const submitEvent = submitForm(formElement);
      expect(submitEvent.defaultPrevented).toBe(true);
      expect(window.fetch).not.toHaveBeenCalled();
      const statusElement = formElement.querySelector('[data-db-form-status]');
      expect(statusElement.textContent).toContain('not connected');
      expect(statusElement.className).toContain('db-form-status-error');
    });

    test('a Formspree form is posted as form data with a JSON accept header and reads the reply', async () => {
      const responses = [
        { ok: true, json: () => Promise.resolve({ ok: true }) },
        { ok: false, json: () => Promise.resolve({ errors: [{ message: 'Email is required' }] }) },
      ];
      window.fetch = jest.fn(() => Promise.resolve(responses.shift()));
      const formElement = mountForm(
        'action="https://formspree.io/f/abcdwxyz" data-db-recipe="formspree" data-db-success-message="Got it!"',
        fieldMarkup('<input name="name" value="Ann">', 'Name'),
      );
      expect(submitForm(formElement).defaultPrevented).toBe(true);
      const buttonElement = formElement.querySelector('button');
      expect(buttonElement.disabled).toBe(true);
      expect(buttonElement.textContent).toBe('Sending now');
      const [requestUrl, requestOptions] = window.fetch.mock.calls[0];
      expect(requestUrl).toBe('https://formspree.io/f/abcdwxyz');
      expect(requestOptions.method).toBe('POST');
      expect(requestOptions.headers.Accept).toBe('application/json');
      expect(requestOptions.body instanceof window.FormData).toBe(true);
      expect(requestOptions.body.get('name')).toBe('Ann');
      await flushTimers();
      await flushTimers();
      const statusElement = formElement.querySelector('[data-db-form-status]');
      expect(statusElement.textContent).toBe('Got it!');
      expect(statusElement.className).toContain('db-form-status-success');
      expect(buttonElement.disabled).toBe(false);
      expect(buttonElement.textContent).toBe('Send');
      submitForm(formElement);
      await flushTimers();
      await flushTimers();
      expect(statusElement.className).toContain('db-form-status-error');
      expect(statusElement.textContent).toContain('Email is required');
    });

    test('a custom endpoint can send JSON with extra headers and renamed fields', async () => {
      window.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }));
      const formElement = mountForm(
        'action="https://api.example.com/leads" data-db-recipe="custom" data-db-method="put" data-db-body-format="json" ' +
          'data-db-headers=\'{"X-Api-Key":"secret"}\' data-db-field-map=\'{"name":"full_name"}\'',
        fieldMarkup('<input name="name" value="Ann">', 'Name'),
      );
      submitForm(formElement);
      const [, requestOptions] = window.fetch.mock.calls[0];
      expect(requestOptions.method).toBe('PUT');
      expect(requestOptions.headers['X-Api-Key']).toBe('secret');
      expect(requestOptions.headers['Content-Type']).toBe('application/json');
      expect(JSON.parse(requestOptions.body)).toEqual({ full_name: 'Ann' });
      await flushTimers();
    });

    test('steps validate before moving on and conditional fields hide with their errors', () => {
      document.body.innerHTML =
        '<form data-db-form="true" novalidate action="https://formspree.io/f/abc">' +
        '<fieldset data-db-form-step="true"><legend>One</legend>' +
        '<div class="db-form-field" data-db-form-field="true"><input name="first" required></div></fieldset>' +
        '<fieldset data-db-form-step="true"><legend>Two</legend>' +
        '<div class="db-form-field" data-db-form-field="true"><select name="topic"><option value="">Pick</option><option value="biz">Biz</option></select></div>' +
        '<div class="db-form-field" data-db-form-field="true" data-db-show-when-field="topic" data-db-show-when-op="equals" data-db-show-when-value="biz">' +
        '<input name="company" required></div></fieldset>' +
        '<div data-db-form-steps-nav="true"><span data-db-step-progress-bar></span><p data-db-step-progress-text></p>' +
        '<button type="button" data-db-step-back>Back</button><button type="button" data-db-step-next>Next</button></div>' +
        '<button type="submit">Send</button><div data-db-form-status="true"></div></form>';
      runFormBehavior();
      runFormFieldBehavior();
      runFormStepsBehavior();
      runConditionalFieldsBehavior();
      const formElement = document.querySelector('form');
      const stepElements = formElement.querySelectorAll('[data-db-form-step]');
      const nextButton = formElement.querySelector('[data-db-step-next]');
      expect(stepElements[1].hidden).toBe(true);
      expect(formElement.querySelector('[data-db-step-progress-text]').textContent).toBe('Step 1 of 2: One');
      nextButton.click();
      expect(stepElements[1].hidden).toBe(true);
      expect(formElement.querySelector('.db-field-error').textContent).toBe('Please fill in this field.');
      formElement.querySelector('input[name=first]').value = 'Ann';
      nextButton.click();
      expect(stepElements[1].hidden).toBe(false);
      expect(formElement.getAttribute('data-db-step-last')).toBe('true');
      const companyField = formElement.querySelector('[data-db-show-when-field]');
      expect(companyField.hidden).toBe(true);
      const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
      formElement.dispatchEvent(submitEvent);
      expect(formElement.querySelectorAll('.db-field-invalid').length).toBe(0);
      const topicSelect = formElement.querySelector('select');
      topicSelect.value = 'biz';
      topicSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
      expect(companyField.hidden).toBe(false);
      formElement.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      expect(formElement.querySelector('input[name=company]').classList.contains('db-field-invalid')).toBe(true);
      topicSelect.value = '';
      topicSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
      expect(companyField.hidden).toBe(true);
      expect(formElement.querySelector('input[name=company]').classList.contains('db-field-invalid')).toBe(false);
    });

    test('ensureFieldControlId keeps the help text linked to the control', () => {
      const fieldComponent = appendForm().findType('db-form-field')[2];
      ensureFieldControlId(fieldComponent);
      const controlAttributes = findByTag(fieldComponent, 'textarea')[0].getAttributes();
      expect(controlAttributes['aria-describedby']).toBe(controlAttributes.id + '-help');
      expect(findByTag(fieldComponent, 'small')[0].getAttributes().id).toBe(controlAttributes.id + '-help');
    });
  });
});
