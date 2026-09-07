import getSymbolLibrary from './getSymbolLibrary.js';
import resolveBaseModelConstructor from './resolveBaseModelConstructor.js';
import resolveEditorModel from './resolveEditorModel.js';

const getSymbolLibraryModel = (editorOrModel) => {
  const editorModel = resolveEditorModel(editorOrModel);
  if (!editorModel) return null;
  const existingModel = editorModel.get('dbSymbolLibraryModel');
  if (existingModel) return existingModel;
  const BaseModelConstructor = resolveBaseModelConstructor(editorModel);
  if (!BaseModelConstructor) return null;
  const libraryModel = new BaseModelConstructor({ _undo: true, library: getSymbolLibrary(editorModel) });
  editorModel.set('dbSymbolLibraryModel', libraryModel);
  const undoManager = editorModel.UndoManager;
  if (undoManager && typeof undoManager.add === 'function') undoManager.add(libraryModel);
  return libraryModel;
};

export default getSymbolLibraryModel;
