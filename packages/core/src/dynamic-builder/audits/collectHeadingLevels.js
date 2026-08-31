import walkComponentTree from '../support/walkComponentTree.js';

const collectHeadingLevels = (auditContext) => {
  if (auditContext.canvasBody) {
    return Array.from(auditContext.canvasBody.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((headingElement) =>
      Number(headingElement.tagName.slice(1)),
    );
  }
  const headingLevels = [];
  walkComponentTree(auditContext.wrapperComponent, (component) => {
    const tagName = String(component.get('tagName') || '').toLowerCase();
    const headingMatch = tagName.match(/^h([1-6])$/);
    headingMatch && headingLevels.push(Number(headingMatch[1]));
  });
  return headingLevels;
};

export default collectHeadingLevels;
