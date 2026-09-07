const describeLinkCountText = (linkCount) => {
  if (!linkCount) return '';
  return linkCount === 1 ? '1 link' : `${linkCount} links`;
};

export default describeLinkCountText;
