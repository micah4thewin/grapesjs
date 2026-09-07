const setSymbolOverrides = (instanceComponent, overridesRecord) => {
  if (!instanceComponent || typeof instanceComponent.set !== 'function') return;
  instanceComponent.set('dbSymbolOverrides', { ...(overridesRecord || {}) });
};

export default setSymbolOverrides;
