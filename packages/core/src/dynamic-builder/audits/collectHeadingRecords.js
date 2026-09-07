import walkComponentTree from '../support/walkComponentTree.js';

const collectHeadingRecords = (auditContext) => {
  if (auditContext.canvasRoot) {
    return Array.from(auditContext.canvasRoot.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((headingElement) => ({
      level: Number(headingElement.tagName.slice(1)),
      target: headingElement,
    }));
  }
  const headingRecords = [];
  walkComponentTree(auditContext.wrapperComponent, (component) => {
    const tagName = String(component.get('tagName') || '').toLowerCase();
    const headingMatch = tagName.match(/^h([1-6])$/);
    headingMatch && headingRecords.push({ level: Number(headingMatch[1]), target: component });
  });
  return headingRecords;
};

export default collectHeadingRecords;
