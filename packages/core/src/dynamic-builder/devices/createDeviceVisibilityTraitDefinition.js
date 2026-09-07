import escapeHtmlText from '../support/escapeHtmlText.js';
import getDeviceVisibilityRecords from './getDeviceVisibilityRecords.js';

const createDeviceVisibilityTraitDefinition = (editor) => ({
  noLabel: true,
  eventCapture: ['change'],
  createInput: () =>
    [
      '<div class="gjs-db-field gjs-db-device-visibility" role="group" aria-label="Show on devices">',
      '<span class="gjs-db-field-label">Show on</span>',
      getDeviceVisibilityRecords()
        .map((visibilityRecord) =>
          [
            '<label class="gjs-db-device-visibility-option">',
            `<input type="checkbox" data-db-visibility-class="${visibilityRecord.className}" checked />`,
            `<span>${escapeHtmlText(visibilityRecord.label)}</span>`,
            `<small class="gjs-db-muted">${escapeHtmlText(visibilityRecord.help)}</small>`,
            '</label>',
          ].join(''),
        )
        .join(''),
      '<span class="gjs-db-field-help">Untick a device to hide this element there. Use the device buttons at the top to check each size.</span>',
      '</div>',
    ].join(''),
  onEvent: ({ component, elInput }) => {
    if (!component || !elInput || !elInput.querySelectorAll) return;
    elInput.querySelectorAll('[data-db-visibility-class]').forEach((checkboxElement) => {
      const className = checkboxElement.getAttribute('data-db-visibility-class');
      if (checkboxElement.checked) component.removeClass(className);
      else component.addClass(className);
    });
    editor.trigger('db:device-visibility:change', component);
  },
  onUpdate: ({ component, elInput }) => {
    if (!elInput || !elInput.querySelectorAll) return;
    const classNames = component && component.getClasses ? component.getClasses() : [];
    elInput.querySelectorAll('[data-db-visibility-class]').forEach((checkboxElement) => {
      checkboxElement.checked = classNames.indexOf(checkboxElement.getAttribute('data-db-visibility-class')) < 0;
    });
  },
});

export default createDeviceVisibilityTraitDefinition;
