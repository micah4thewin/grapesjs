const liveModeCommandIds = ['core:preview', 'core:fullscreen'];

const watchLiveCanvasModes = (editor, modeCallbacks) => {
  const startDelay = modeCallbacks.delay || 240;
  const isAnyLiveModeActive = () =>
    liveModeCommandIds.some((commandId) => editor.Commands && editor.Commands.isActive(commandId));
  liveModeCommandIds.forEach((commandId) => {
    editor.on('command:run:' + commandId, () => setTimeout(() => modeCallbacks.onRun(editor), startDelay));
    editor.on('command:stop:' + commandId, () => {
      modeCallbacks.onStop(editor);
      if (isAnyLiveModeActive()) setTimeout(() => modeCallbacks.onRun(editor), startDelay);
    });
  });
};

export default watchLiveCanvasModes;
