import showToastNotice from '../support/showToastNotice.js';

const insertBlockAtSelection = (editor, blockModel) => {
  const blockContent = blockModel.getContent ? blockModel.getContent() : blockModel.get('content');
  if (!blockContent) return;
  const sampleSource = Array.isArray(blockContent) ? blockContent[0] : blockContent;
  const selectedComponent = editor.getSelected && editor.getSelected();
  const wrapperComponent = editor.getWrapper();
  const candidateTargets = [];
  if (selectedComponent) {
    const parentComponent = selectedComponent.parent() || wrapperComponent;
    candidateTargets.push({ parent: parentComponent, index: selectedComponent.index() + 1 });
    candidateTargets.push({ parent: selectedComponent, index: selectedComponent.components().length });
  }
  candidateTargets.push({ parent: wrapperComponent, index: wrapperComponent.components().length });
  const allowedTarget = candidateTargets.find(
    (candidateTarget) =>
      candidateTarget.parent && editor.Components.canMove(candidateTarget.parent, sampleSource).result,
  );
  if (!allowedTarget) {
    showToastNotice(editor, 'That block cannot go next to the selection. Select a section first.', { kind: 'warning' });
    return;
  }
  const addedComponents = allowedTarget.parent.components().add(blockContent, { at: allowedTarget.index });
  const firstAdded = Array.isArray(addedComponents) ? addedComponents[0] : addedComponents;
  if (firstAdded) {
    editor.select(firstAdded);
    if (editor.Canvas.scrollTo) editor.Canvas.scrollTo(firstAdded, { behavior: 'smooth' });
  }
  const blockLabel = String(blockModel.getLabel ? blockModel.getLabel() : '').replace(/<[^>]*>/g, '');
  showToastNotice(editor, `Added ${blockLabel || 'block'}.`, { kind: 'success' });
};

export default insertBlockAtSelection;
