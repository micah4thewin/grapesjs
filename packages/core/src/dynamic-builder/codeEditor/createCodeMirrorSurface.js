import resolveCodeLanguageRecord from './resolveCodeLanguageRecord.js';

const buildViewerOptions = (languageRecord) => ({
  codeName: languageRecord.codeName,
  readOnly: false,
  lineNumbers: true,
  lineWrapping: true,
  autoFormat: false,
  theme: 'hopscotch',
  indentUnit: languageRecord.indentUnit,
  tabSize: languageRecord.indentUnit,
  autoCloseBrackets: true,
  matchBrackets: true,
  viewportMargin: Infinity,
});

const createCodeMirrorSurface = (editor, hostElement, surfaceOptions) => {
  const codeManager = editor.CodeManager;
  if (!codeManager || typeof codeManager.createViewer !== 'function') return null;
  const languageRecord = resolveCodeLanguageRecord(surfaceOptions.language);
  let viewerElement = null;
  try {
    const codeViewer = codeManager.createViewer(buildViewerOptions(languageRecord));
    viewerElement = codeViewer && codeViewer.getElement && codeViewer.getElement();
    const codeMirrorInstance = codeViewer && codeViewer.getEditor && codeViewer.getEditor();
    if (!viewerElement || !codeMirrorInstance || typeof codeMirrorInstance.setValue !== 'function') return null;
    hostElement.appendChild(viewerElement);
    codeViewer.setContent(String(surfaceOptions.value || ''), { noRefresh: true });
    codeMirrorInstance.setOption('extraKeys', {
      Tab: (currentInstance) => currentInstance.execCommand('indentMore'),
      'Shift-Tab': (currentInstance) => currentInstance.execCommand('indentLess'),
      Esc: (currentInstance) => currentInstance.display.input.blur(),
    });
    codeViewer.on('update', () => surfaceOptions.onChange(codeViewer.getContent()));
    setTimeout(() => codeViewer.refresh(), 30);
    return {
      getValue: () => String(codeViewer.getContent() || ''),
      setValue: (nextValue) => codeViewer.setContent(String(nextValue || '')),
      insertAtCursor: (snippetText) => {
        codeMirrorInstance.replaceSelection(String(snippetText || ''), 'end');
        codeMirrorInstance.focus();
        surfaceOptions.onChange(codeViewer.getContent());
      },
      focus: () => codeViewer.focus(),
      refresh: () => codeViewer.refresh(),
    };
  } catch (viewerError) {
    if (viewerElement && viewerElement.parentElement === hostElement) hostElement.removeChild(viewerElement);
    return null;
  }
};

export default createCodeMirrorSurface;
