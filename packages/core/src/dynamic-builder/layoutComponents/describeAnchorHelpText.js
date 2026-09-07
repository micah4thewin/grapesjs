const describeAnchorHelpText = (slugValue) =>
  slugValue
    ? `Menu links and buttons can jump here with #${slugValue}`
    : 'Give this part of the page a short name so menu links can jump to it';

export default describeAnchorHelpText;
