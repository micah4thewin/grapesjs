const resolveWorkspaceSizeName = (availableWidth) => {
  if (availableWidth >= 1280) return 'lg';
  if (availableWidth >= 1080) return 'md';
  if (availableWidth >= 760) return 'sm';
  return 'xs';
};

export default resolveWorkspaceSizeName;
