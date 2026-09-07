import escapeHtmlText from './escapeHtmlText.js';
import getIconMarkup from './getIconMarkup.js';

const buildActionToastElement = (ownerDocument, messageText, options) => {
  const toastElement = ownerDocument.createElement('div');
  const kindClass = options.kind ? ` gjs-db-toast-${options.kind}` : '';
  toastElement.className = `gjs-db-toast gjs-db-toast-actionable${kindClass}`;
  toastElement.setAttribute('role', options.kind === 'error' ? 'alert' : 'status');
  const actionMarkup = options.actionLabel
    ? `<button type="button" class="gjs-db-toast-action" data-db-toast-action>${escapeHtmlText(options.actionLabel)}</button>`
    : '';
  const closeMarkup =
    options.dismissible === false
      ? ''
      : [
          '<button type="button" class="gjs-db-toast-close" data-db-toast-close aria-label="Dismiss">',
          getIconMarkup('close', { size: 14 }),
          '</button>',
        ].join('');
  toastElement.innerHTML = `<span class="gjs-db-toast-text">${escapeHtmlText(messageText)}</span>${actionMarkup}${closeMarkup}`;
  return toastElement;
};

export default buildActionToastElement;
