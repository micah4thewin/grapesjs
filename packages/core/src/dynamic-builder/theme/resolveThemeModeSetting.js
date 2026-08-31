const resolveThemeModeSetting = (themeOptions) => {
  const requestedMode = themeOptions && themeOptions.mode;
  if (requestedMode === 'light' || requestedMode === 'dark') return requestedMode;
  return 'auto';
};

export default resolveThemeModeSetting;
