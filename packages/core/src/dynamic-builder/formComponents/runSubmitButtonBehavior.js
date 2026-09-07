const runSubmitButtonBehavior = () => {
  const inEditorCanvas = Boolean(document.querySelector('[data-gjs-type]'));
  const parseRecord = (jsonText) => {
    try {
      const parsedValue = JSON.parse(jsonText || '{}');
      return parsedValue && typeof parsedValue === 'object' && !Array.isArray(parsedValue) ? parsedValue : {};
    } catch (parseError) {
      return {};
    }
  };
  document.querySelectorAll('form[data-db-form] button[type=submit]').forEach((buttonElement) => {
    const formElement = buttonElement.closest('form');
    if (!formElement || buttonElement.dataset.dbSubmitReady) return;
    buttonElement.dataset.dbSubmitReady = 'true';
    const idleMarkup = buttonElement.innerHTML;
    const finish = (outcomeName, detailText) =>
      formElement.dbFormFinish ? formElement.dbFormFinish(outcomeName, detailText) : undefined;
    const setBusy = (isBusy) => {
      buttonElement.disabled = isBusy;
      buttonElement.setAttribute('aria-busy', isBusy ? 'true' : 'false');
      if (isBusy) buttonElement.textContent = buttonElement.getAttribute('data-db-sending-label') || 'Sending...';
      else buttonElement.innerHTML = idleMarkup;
    };
    const buildRequest = (recipeId, actionUrl) => {
      const fieldMap = parseRecord(formElement.getAttribute('data-db-field-map'));
      const methodName = String(formElement.getAttribute('data-db-method') || 'post').toUpperCase();
      const headers = { Accept: 'application/json', ...parseRecord(formElement.getAttribute('data-db-headers')) };
      const bodyData = new FormData();
      new FormData(formElement).forEach((fieldValue, fieldName) =>
        bodyData.append(fieldMap[fieldName] || fieldName, fieldValue),
      );
      if (recipeId === 'netlify') bodyData.append('form-name', formElement.getAttribute('name') || 'contact');
      const requestUrl = new URL(actionUrl || window.location.pathname, window.location.href);
      const requestOptions = { method: methodName, headers };
      if (methodName === 'GET') {
        bodyData.forEach((fieldValue, fieldName) => {
          if (typeof fieldValue === 'string') requestUrl.searchParams.append(fieldName, fieldValue);
        });
      } else if (formElement.getAttribute('data-db-body-format') === 'json') {
        const bodyRecord = {};
        bodyData.forEach((fieldValue, fieldName) => {
          if (typeof fieldValue !== 'string') return;
          bodyRecord[fieldName] = fieldName in bodyRecord ? [].concat(bodyRecord[fieldName], fieldValue) : fieldValue;
        });
        headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(bodyRecord);
      } else requestOptions.body = bodyData;
      if (recipeId === 'apps-script') requestOptions.mode = 'no-cors';
      return { requestUrl: requestUrl.toString(), requestOptions };
    };
    const readErrorDetail = (payload) => {
      const errorList = Array.isArray(payload.errors) ? payload.errors : [];
      const joinedErrors = errorList.map((errorItem) => String((errorItem && errorItem.message) || '')).join(' ');
      return String(joinedErrors || payload.error || payload.message || '').trim();
    };
    formElement.dbFormSend = (submitEvent) => {
      const recipeId = formElement.getAttribute('data-db-recipe') || '';
      const actionUrl = formElement.getAttribute('action') || '';
      if (!actionUrl && recipeId !== 'netlify') {
        submitEvent.preventDefault();
        return finish(recipeId === 'message' ? 'success' : 'not-connected', '');
      }
      if (inEditorCanvas) {
        submitEvent.preventDefault();
        return finish('preview', '');
      }
      if (formElement.getAttribute('data-db-submit-mode') === 'native') return setBusy(true);
      submitEvent.preventDefault();
      setBusy(true);
      const { requestUrl, requestOptions } = buildRequest(recipeId, actionUrl);
      fetch(requestUrl, requestOptions)
        .then((response) => {
          if (response.type === 'opaque' || response.ok) return finish('success', '');
          return response
            .json()
            .catch(() => ({}))
            .then((payload) => finish('failure', readErrorDetail(payload)));
        })
        .catch(() => finish('failure', ''))
        .then(() => setBusy(false));
    };
    window.addEventListener('pageshow', () => setBusy(false));
  });
};

export default runSubmitButtonBehavior;
