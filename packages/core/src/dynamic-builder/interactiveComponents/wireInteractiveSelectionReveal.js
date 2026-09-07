import revealAccordionItemInCanvas from './revealAccordionItemInCanvas.js';
import revealTabPanelInCanvas from './revealTabPanelInCanvas.js';

const wireInteractiveSelectionReveal = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    const selectedElement =
      selectedComponent && typeof selectedComponent.getEl === 'function' ? selectedComponent.getEl() : null;
    if (!selectedElement || !selectedElement.closest) return;
    revealAccordionItemInCanvas(selectedElement);
    revealTabPanelInCanvas(selectedElement);
  });
};

export default wireInteractiveSelectionReveal;
