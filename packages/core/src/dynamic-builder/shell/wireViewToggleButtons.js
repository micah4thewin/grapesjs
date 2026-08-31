import getViewToggleCommandIds from './getViewToggleCommandIds.js';

const wireViewToggleButtons = (editor, stripElement) => {
  getViewToggleCommandIds().forEach((commandId) => {
    const setPressedState = (pressedState) => {
      const toggleButton = stripElement.querySelector(`[data-db-command="${commandId}"]`);
      if (toggleButton) toggleButton.setAttribute('aria-pressed', pressedState ? 'true' : 'false');
    };
    editor.on(`command:run:${commandId}`, () => setPressedState(true));
    editor.on(`command:stop:${commandId}`, () => setPressedState(false));
    setPressedState(editor.Commands.isActive(commandId));
  });
};

export default wireViewToggleButtons;
