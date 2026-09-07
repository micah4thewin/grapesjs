const buildAddChildButtonTrait = (buttonText, appendChild) => ({
  type: 'button',
  name: 'dbAddChild',
  text: buttonText,
  full: true,
  command: (commandEditor, buttonTrait) => appendChild(commandEditor, buttonTrait && buttonTrait.target),
});

export default buildAddChildButtonTrait;
