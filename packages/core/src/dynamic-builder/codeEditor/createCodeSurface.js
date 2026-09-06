import createCodeMirrorSurface from './createCodeMirrorSurface.js';
import createTextareaSurface from './createTextareaSurface.js';

const createCodeSurface = (editor, hostElement, surfaceOptions) => {
  const resolvedOptions = { onChange: () => undefined, ...surfaceOptions };
  const codeMirrorSurface = createCodeMirrorSurface(editor, hostElement, resolvedOptions);
  if (codeMirrorSurface) return codeMirrorSurface;
  return createTextareaSurface(hostElement, resolvedOptions);
};

export default createCodeSurface;
