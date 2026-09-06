import registerSymbolBlocks from './registerSymbolBlocks.js';

const watchSymbolBlockLibrary = (editor) => {
  const refreshSymbolBlocks = () => registerSymbolBlocks(editor);
  editor.on('db:symbols:update', refreshSymbolBlocks);
  editor.on('load', refreshSymbolBlocks);
  if (editor.onReady) editor.onReady(refreshSymbolBlocks);
};

export default watchSymbolBlockLibrary;
