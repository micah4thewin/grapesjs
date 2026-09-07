import saveProjectSnapshot from './saveProjectSnapshot.js';

const runPersistNowCommand = (editor, moduleOptions) => {
  const persistNow = editor.getModel().get('dbPersistNow');
  const saveResult = typeof persistNow === 'function' ? persistNow() : saveProjectSnapshot(editor, moduleOptions);
  return saveResult === true;
};

export default runPersistNowCommand;
