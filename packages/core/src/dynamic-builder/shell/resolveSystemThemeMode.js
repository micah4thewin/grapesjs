const resolveSystemThemeMode = (containerElement) => {
  const viewWindow = containerElement && containerElement.ownerDocument && containerElement.ownerDocument.defaultView;
  if (viewWindow && typeof viewWindow.matchMedia === 'function') {
    return viewWindow.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export default resolveSystemThemeMode;
