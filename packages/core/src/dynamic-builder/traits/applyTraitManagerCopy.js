const applyTraitManagerCopy = (editor) => {
  const i18nModule = editor && editor.I18n;
  if (!i18nModule || typeof i18nModule.addMessages !== 'function') return;
  i18nModule.addMessages({
    en: {
      traitManager: {
        empty: 'Click something on the page to change its settings.',
        label: 'Settings',
      },
    },
  });
};

export default applyTraitManagerCopy;
