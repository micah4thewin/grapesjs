const resolveBrandLabelText = (shellOptions) => {
  const brandLabel = shellOptions && shellOptions.brandLabel;
  if (typeof brandLabel === 'string') return brandLabel.trim();
  return 'Editor';
};

export default resolveBrandLabelText;
