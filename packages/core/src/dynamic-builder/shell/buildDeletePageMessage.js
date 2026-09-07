import describeLinkCountText from './describeLinkCountText.js';

const buildDeletePageMessage = (pageName, linkCount) => {
  const linkWarning = linkCount
    ? ` ${describeLinkCountText(linkCount)} on other pages point to it and will stop working.`
    : '';
  return `Delete the page "${pageName}"?${linkWarning} You can undo this right after.`;
};

export default buildDeletePageMessage;
