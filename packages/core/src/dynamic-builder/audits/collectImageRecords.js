import describeAuditComponent from './describeAuditComponent.js';
import describeAuditElement from './describeAuditElement.js';
import walkComponentTree from '../support/walkComponentTree.js';

const imageAttributeNames = ['alt', 'width', 'height', 'loading', 'fetchpriority'];

const collectImageRecords = (auditContext) => {
  if (auditContext.canvasRoot) {
    return Array.from(auditContext.canvasRoot.querySelectorAll('img')).map((imageElement) => {
      const attributes = {};
      imageAttributeNames.forEach((attributeName) => {
        attributes[attributeName] = imageElement.getAttribute(attributeName);
      });
      return { label: describeAuditElement(imageElement), target: imageElement, attributes };
    });
  }
  const imageRecords = [];
  walkComponentTree(auditContext.wrapperComponent, (component) => {
    if (String(component.get('tagName') || '').toLowerCase() !== 'img') return;
    const componentAttributes = component.getAttributes();
    const attributes = {};
    imageAttributeNames.forEach((attributeName) => {
      attributes[attributeName] =
        componentAttributes[attributeName] === undefined ? null : componentAttributes[attributeName];
    });
    imageRecords.push({ label: describeAuditComponent(component), target: component, attributes });
  });
  return imageRecords;
};

export default collectImageRecords;
