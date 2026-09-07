import resolveSystemThemeMode from './resolveSystemThemeMode.js';

const resolveEffectiveThemeMode = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const attributeValue =
    containerElement && containerElement.getAttribute && containerElement.getAttribute('data-theme');
  if (attributeValue === 'light' || attributeValue === 'dark') return attributeValue;
  return resolveSystemThemeMode(containerElement);
};

export default resolveEffectiveThemeMode;
