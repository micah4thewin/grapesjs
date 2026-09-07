const runFormStatusBehavior = () => {
  const inEditorCanvas = Boolean(document.querySelector('[data-gjs-type]'));
  document.querySelectorAll('form[data-db-form] [data-db-form-status]').forEach((statusElement) => {
    const formElement = statusElement.closest('form');
    if (!formElement || statusElement.dataset.dbStatusReady) return;
    statusElement.dataset.dbStatusReady = 'true';
    const readText = (attributeName, fallbackText) => formElement.getAttribute(attributeName) || fallbackText;
    const showStatus = (messageText, statusKind) => {
      if (formElement.dbFormApi) formElement.dbFormApi.setStatus(messageText, statusKind);
      else statusElement.textContent = messageText;
      statusElement.setAttribute('tabindex', '-1');
      statusElement.focus();
    };
    formElement.dbFormFinish = (outcomeName, detailText) => {
      if (outcomeName === 'success') {
        const redirectUrl = formElement.getAttribute('data-db-redirect-url');
        if (redirectUrl && !inEditorCanvas) return window.location.assign(redirectUrl);
        formElement.reset();
        if (formElement.getAttribute('data-db-hide-on-success') === 'true') formElement.classList.add('db-form-sent');
        return showStatus(readText('data-db-success-message', 'Thanks! Your message has been received.'), 'success');
      }
      if (outcomeName === 'failure') {
        const failureText = readText(
          'data-db-failure-message',
          'Sorry, your message could not be sent. Please try again.',
        );
        return showStatus(failureText + (detailText ? ' ' + detailText : ''), 'error');
      }
      if (outcomeName === 'preview')
        return showStatus('Preview only: the published site will send this submission.', 'info');
      showStatus(
        'This form is not connected yet, so nothing was sent. If this is your site, choose where submissions go.',
        'error',
      );
    };
  });
};

export default runFormStatusBehavior;
