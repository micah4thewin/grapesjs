import walkComponentTree from '../support/walkComponentTree.js';

const collectPageAnchorRecords = (sitePage) => {
  const anchorRecords = [];
  const rootComponent = sitePage && sitePage.getMainComponent ? sitePage.getMainComponent() : null;
  if (!rootComponent) return anchorRecords;
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (!visitedComponent || !visitedComponent.get || visitedComponent === rootComponent) return;
    const rawAttributes = visitedComponent.get('attributes') || {};
    const anchorId = String(rawAttributes.id || '').trim();
    if (!anchorId || anchorId === visitedComponent.ccid) return;
    if (String(visitedComponent.get('type') || '') === 'textnode') return;
    const anchorName = visitedComponent.getName ? String(visitedComponent.getName() || '').trim() : '';
    anchorRecords.push({
      anchorId,
      label: anchorName && anchorName !== anchorId ? `${anchorName} (#${anchorId})` : `#${anchorId}`,
    });
  });
  return anchorRecords;
};

export default collectPageAnchorRecords;
