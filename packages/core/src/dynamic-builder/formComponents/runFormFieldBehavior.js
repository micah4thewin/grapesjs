const runFormFieldBehavior = () => {
  document.querySelectorAll('[data-db-form-field]').forEach((fieldElement) => {
    if (fieldElement.dataset.dbFieldReady) return;
    fieldElement.dataset.dbFieldReady = 'true';
    const controlElement = fieldElement.querySelector('input, select, textarea');
    if (!controlElement) return;
    if (!controlElement.id) controlElement.id = 'db-control-' + Math.random().toString(36).slice(2, 9);
    const labelElement = fieldElement.querySelector('[data-db-field-label]');
    if (labelElement && !labelElement.getAttribute('for')) labelElement.setAttribute('for', controlElement.id);
    const helpElement = fieldElement.querySelector('[data-db-field-help]');
    if (!helpElement) return;
    if (!helpElement.id) helpElement.id = controlElement.id + '-help';
    const describedIds = (controlElement.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (describedIds.indexOf(helpElement.id) < 0) describedIds.push(helpElement.id);
    controlElement.setAttribute('aria-describedby', describedIds.join(' '));
  });
};

export default runFormFieldBehavior;
