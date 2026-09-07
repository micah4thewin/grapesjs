const ensureAnnouncementStorageKey = (announcementComponent) => {
  if (!announcementComponent || typeof announcementComponent.getAttributes !== 'function') return '';
  const currentKey = String((announcementComponent.getAttributes() || {})['data-db-storage-key'] || '').trim();
  if (currentKey && currentKey !== 'db-announcement-default') return currentKey;
  const nextKey = 'db-announcement-' + Math.random().toString(36).slice(2, 8);
  announcementComponent.addAttributes({ 'data-db-storage-key': nextKey });
  return nextKey;
};

export default ensureAnnouncementStorageKey;
