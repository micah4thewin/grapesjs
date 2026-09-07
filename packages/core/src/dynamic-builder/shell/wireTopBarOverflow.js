import isTopBarOverflowing from './isTopBarOverflowing.js';

const wireTopBarOverflow = (editor, stripElement) => {
  const maxCompactLevel = 3;
  const applyCompactLevel = () => {
    let compactLevel = 0;
    stripElement.setAttribute('data-db-compact', '0');
    while (compactLevel < maxCompactLevel && isTopBarOverflowing(stripElement)) {
      compactLevel += 1;
      stripElement.setAttribute('data-db-compact', String(compactLevel));
    }
  };
  const viewWindow = stripElement.ownerDocument.defaultView;
  let resizeObserver = null;
  if (viewWindow && typeof viewWindow.ResizeObserver === 'function') {
    resizeObserver = new viewWindow.ResizeObserver(applyCompactLevel);
    resizeObserver.observe(stripElement);
  } else if (viewWindow) {
    viewWindow.addEventListener('resize', applyCompactLevel);
  }
  editor.on('device:select page command:run:core:preview command:stop:core:preview', () =>
    setTimeout(applyCompactLevel, 0),
  );
  editor.on('destroy', () => {
    resizeObserver && resizeObserver.disconnect();
    viewWindow && viewWindow.removeEventListener('resize', applyCompactLevel);
  });
  applyCompactLevel();
  setTimeout(applyCompactLevel, 100);
};

export default wireTopBarOverflow;
