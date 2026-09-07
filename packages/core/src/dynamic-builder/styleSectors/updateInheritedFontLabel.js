const updateInheritedFontLabel = (editor) => {
  const refreshLabel = () => {
    const containerElement = editor.getContainer && editor.getContainer();
    const optionElement =
      containerElement && containerElement.querySelector('.gjs-sm-property__font-family select option[value=""]');
    if (!optionElement) return;
    const selectedComponent = editor.getSelected && editor.getSelected();
    const selectedElement = selectedComponent && selectedComponent.getEl ? selectedComponent.getEl() : null;
    const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
    if (!selectedElement || !canvasWindow) {
      optionElement.textContent = 'Site default (inherited)';
      return;
    }
    const familyName = String(canvasWindow.getComputedStyle(selectedElement).fontFamily || '')
      .split(',')[0]
      .replace(/[\u0022\u0027]/g, '')
      .trim();
    optionElement.textContent = familyName ? `Inherited: ${familyName}` : 'Site default (inherited)';
  };
  editor.on('component:toggled style:target', () => setTimeout(refreshLabel, 0));
};

export default updateInheritedFontLabel;
