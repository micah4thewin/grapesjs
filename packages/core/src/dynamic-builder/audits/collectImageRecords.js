import describeAuditElement from './describeAuditElement.js';
import walkComponentTree from '../support/walkComponentTree.js';

const collectImageRecords = (auditContext) => {
  if (auditContext.canvasBody) {
    return Array.from(auditContext.canvasBody.querySelectorAll('img')).map((imageElement) => ({
      label: describeAuditElement(imageElement),
      attributes: {
        alt: imageElement.getAttribute('alt'),
        width: imageElement.getAttribute('width'),
        height: imageElement.getAttribute('height'),
        loading: imageElement.getAttribute('loading'),
        fetchpriority: imageElement.getAttribute('fetchpriority'),
      },
    }));
  }
  const imageRecords = [];
  walkComponentTree(auditContext.wrapperComponent, (component) => {
    if (String(component.get('tagName') || '').toLowerCase() !== 'img') return;
    const componentAttributes = component.getAttributes();
    const readAttribute = (attributeName) =>
      componentAttributes[attributeName] === undefined ? null : componentAttributes[attributeName];
    imageRecords.push({
      label: component.getName ? component.getName() : 'img',
      attributes: {
        alt: readAttribute('alt'),
        width: readAttribute('width'),
        height: readAttribute('height'),
        loading: readAttribute('loading'),
        fetchpriority: readAttribute('fetchpriority'),
      },
    });
  });
  return imageRecords;
};

export default collectImageRecords;
