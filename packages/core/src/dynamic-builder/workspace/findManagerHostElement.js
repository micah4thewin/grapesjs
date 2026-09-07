const findManagerHostElement = (viewsContainerElement, markerSelector) => {
  if (!viewsContainerElement || !viewsContainerElement.querySelector) return null;
  const markerElement = viewsContainerElement.querySelector(markerSelector);
  if (!markerElement) return null;
  let hostElement = markerElement;
  while (hostElement.parentElement && hostElement.parentElement !== viewsContainerElement) {
    hostElement = hostElement.parentElement;
  }
  return hostElement.parentElement === viewsContainerElement ? hostElement : null;
};

export default findManagerHostElement;
