const listToolbarStopElements = (stripElement) =>
  [...stripElement.querySelectorAll('button, [tabindex]')].filter((candidateElement) => {
    if (candidateElement.closest('[data-db-menu]')) return false;
    if (candidateElement.disabled || candidateElement.hidden) return false;
    return Boolean(candidateElement.offsetParent);
  });

export default listToolbarStopElements;
