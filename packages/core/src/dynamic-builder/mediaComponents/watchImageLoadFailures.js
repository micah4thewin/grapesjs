import showToastNotice from '../support/showToastNotice.js';

const imageTypeNames = ['db-image', 'image'];

const readHostName = (sourceValue) => {
  try {
    return new URL(String(sourceValue || ''), 'https://example.invalid').hostname.replace(/^www\./, '');
  } catch (urlError) {
    return '';
  }
};

const describeFailure = (sourceValue) => {
  const hostName = readHostName(sourceValue);
  const whereText = hostName && hostName !== 'example.invalid' ? ' from ' + hostName : '';
  return (
    'That picture could not be loaded' +
    whereText +
    '. The site it lives on may block other pages from showing it, or the address may point at a web page rather than the picture itself. ' +
    'Save the picture to your computer and upload it, or use Free photos.'
  );
};

// Chrome and friends draw a broken-image glyph the size of a pixel when a
// remote picture fails, so the editor marks the element and tells the maker
// why the picture is missing instead of leaving an empty gap on the page.
const watchImageLoadFailures = (editor) => {
  const reportedSources = new Set();
  const wireElement = (component) => {
    const viewElement = component && component.getEl ? component.getEl() : null;
    if (!viewElement || viewElement.dataset.dbLoadWatch === 'true') return;
    viewElement.dataset.dbLoadWatch = 'true';
    viewElement.addEventListener('error', () => {
      const sourceValue = viewElement.getAttribute('src') || '';
      if (!sourceValue || sourceValue.indexOf('data:') === 0) return;
      viewElement.setAttribute('data-db-broken', 'true');
      if (reportedSources.has(sourceValue)) return;
      reportedSources.add(sourceValue);
      showToastNotice(editor, describeFailure(sourceValue), { kind: 'warning', duration: 9000 });
    });
    viewElement.addEventListener('load', () => viewElement.removeAttribute('data-db-broken'));
  };
  editor.on('component:mount', (component) => {
    if (!component || !component.get) return;
    if (imageTypeNames.indexOf(String(component.get('type') || '')) < 0 && component.get('tagName') !== 'img') return;
    wireElement(component);
  });
};

export default watchImageLoadFailures;
