import resolveEditorModel from './resolveEditorModel.js';

const isSymbolRenderBusy = (editorOrModel) => {
  const editorModel = resolveEditorModel(editorOrModel);
  return Boolean(editorModel) && Number(editorModel.get('dbSymbolRenderDepth') || 0) > 0;
};

export default isSymbolRenderBusy;
