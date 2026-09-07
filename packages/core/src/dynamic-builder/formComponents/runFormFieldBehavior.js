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
    if (helpElement) {
      if (!helpElement.id) helpElement.id = controlElement.id + '-help';
      const describedIds = (controlElement.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
      if (describedIds.indexOf(helpElement.id) < 0) describedIds.push(helpElement.id);
      controlElement.setAttribute('aria-describedby', describedIds.join(' '));
    }
    const validateFiles = (fileControl) => {
      const fileList = [...(fileControl.files || [])];
      if (fileControl.hasAttribute('required') && !fileList.length) return 'Please choose a file.';
      const maxMegabytes = Number(fileControl.getAttribute('data-db-max-size-mb') || 0);
      if (maxMegabytes && fileList.some((fileItem) => fileItem.size > maxMegabytes * 1024 * 1024))
        return 'Choose a file under ' + maxMegabytes + ' MB.';
      const acceptRules = (fileControl.getAttribute('accept') || '')
        .split(',')
        .map((ruleText) => ruleText.trim().toLowerCase())
        .filter(Boolean);
      const matchesRule = (fileItem, ruleText) => {
        const fileType = String(fileItem.type || '').toLowerCase();
        if (ruleText.charAt(0) === '.') return fileItem.name.toLowerCase().endsWith(ruleText);
        return ruleText.endsWith('/*') ? fileType.indexOf(ruleText.slice(0, -1)) === 0 : fileType === ruleText;
      };
      const hasRejectedFile = fileList.some(
        (fileItem) => !acceptRules.some((ruleText) => matchesRule(fileItem, ruleText)),
      );
      return acceptRules.length && hasRejectedFile
        ? 'Choose a file of an accepted type: ' + acceptRules.join(', ') + '.'
        : '';
    };
    fieldElement.dbValidateControl = (targetControl) => {
      const controlType = String(targetControl.type || 'text');
      const rawValue = String(targetControl.value || '').trim();
      if (controlType === 'file') return validateFiles(targetControl);
      if (targetControl.hasAttribute('required') && !rawValue) return 'Please fill in this field.';
      if (!rawValue) return '';
      if (controlType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawValue))
        return 'Enter a valid email address.';
      if (controlType === 'url' && !/^https?:\/\/\S+$/i.test(rawValue))
        return 'Enter a full web address, starting with https://';
      const maxLength = Number(targetControl.getAttribute('maxlength') || 0);
      if (maxLength && rawValue.length > maxLength) return 'Use at most ' + maxLength + ' characters.';
      const patternText = targetControl.getAttribute('pattern');
      if (patternText && !new RegExp('^(?:' + patternText + ')$').test(rawValue))
        return targetControl.getAttribute('data-db-pattern-message') || 'Use the format this field asks for.';
      const minValue = targetControl.getAttribute('min');
      const maxValue = targetControl.getAttribute('max');
      if (controlType === 'number') {
        const numericValue = Number(rawValue);
        if (numericValue !== numericValue) return 'Enter a number.';
        if (minValue && numericValue < Number(minValue)) return 'Use a number of at least ' + minValue + '.';
        if (maxValue && numericValue > Number(maxValue)) return 'Use a number of at most ' + maxValue + '.';
      }
      if (controlType === 'date' || controlType === 'time') {
        if (minValue && rawValue < minValue) return 'Choose ' + minValue + ' or later.';
        if (maxValue && rawValue > maxValue) return 'Choose ' + maxValue + ' or earlier.';
      }
      return '';
    };
  });
};

export default runFormFieldBehavior;
