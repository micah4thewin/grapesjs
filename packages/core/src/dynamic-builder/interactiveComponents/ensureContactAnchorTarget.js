import walkComponentTree from '../support/walkComponentTree.js';

const ensureContactAnchorTarget = (editor, sitePage) => {
  const mainComponent = sitePage && typeof sitePage.getMainComponent === 'function' ? sitePage.getMainComponent() : null;
  if (!mainComponent) return false;
  let hasContactAnchor = false;
  let hasContactCta = false;
  let candidateComponent = null;
  walkComponentTree(mainComponent, (currentComponent) => {
    if (typeof currentComponent.getAttributes !== 'function') return;
    const attributeRecord = currentComponent.getAttributes();
    if (attributeRecord.id === 'contact') hasContactAnchor = true;
    if (attributeRecord['data-db-navbar-cta'] && attributeRecord.href === '#contact') hasContactCta = true;
    const typeName = String(currentComponent.get('type') || '');
    if (!candidateComponent && !attributeRecord.id && (typeName === 'db-contact' || typeName === 'db-form')) {
      candidateComponent = currentComponent;
    }
  });
  if (hasContactAnchor || !hasContactCta || !candidateComponent) return false;
  candidateComponent.addAttributes({ id: 'contact' });
  return true;
};

export default ensureContactAnchorTarget;
