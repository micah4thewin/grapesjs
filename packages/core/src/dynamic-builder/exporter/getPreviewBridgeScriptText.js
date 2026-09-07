const getPreviewBridgeScriptText = () =>
  [
    '(function () {',
    "  document.addEventListener('click', function (clickEvent) {",
    "    var anchorElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('a[href]') : null;",
    '    if (!anchorElement) return;',
    "    var hrefValue = anchorElement.getAttribute('href') || '';",
    '    if (/^(?:[a-z][a-z0-9+.-]*:|#|\\/\\/)/i.test(hrefValue)) return;',
    "    var fileName = hrefValue.split('#')[0].split('?')[0].replace(/^\\.?\\//, '');",
    '    if (!fileName) return;',
    '    clickEvent.preventDefault();',
    "    window.parent.postMessage({ dbPreviewNavigate: fileName }, '*');",
    '  });',
    "  window.addEventListener('error', function (errorEvent) {",
    "    window.parent.postMessage({ dbPreviewError: String((errorEvent && errorEvent.message) || 'Script error') }, '*');",
    '  });',
    '})();',
  ].join('\n');

export default getPreviewBridgeScriptText;
