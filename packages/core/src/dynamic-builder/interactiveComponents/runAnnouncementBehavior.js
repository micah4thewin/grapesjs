const runAnnouncementBehavior = () => {
  document.querySelectorAll('[data-db-announcement]').forEach((announcementElement) => {
    if (announcementElement.dataset.dbAnnouncementReady) return;
    announcementElement.dataset.dbAnnouncementReady = 'true';
    const readStorageKey = () => announcementElement.getAttribute('data-db-storage-key') || '';
    const readDismissed = () => {
      const storageKey = readStorageKey();
      if (!storageKey) return false;
      try {
        return window.localStorage.getItem(storageKey) === 'true';
      } catch (storageError) {
        return false;
      }
    };
    const parseBoundaryDate = (attributeName, boundaryTime) => {
      const dateValue = announcementElement.getAttribute(attributeName) || '';
      if (!dateValue) return null;
      const parsedDate = new Date(dateValue + 'T' + boundaryTime);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    };
    const isWithinWindow = () => {
      const nowStamp = Date.now();
      const startDate = parseBoundaryDate('data-db-start-date', '00:00:00');
      const endDate = parseBoundaryDate('data-db-end-date', '23:59:59');
      if (startDate && nowStamp < startDate.getTime()) return false;
      if (endDate && nowStamp > endDate.getTime()) return false;
      return true;
    };
    const applyVisibility = () => {
      if (readDismissed() || !isWithinWindow()) announcementElement.setAttribute('hidden', '');
      else announcementElement.removeAttribute('hidden');
    };
    const closeElement = announcementElement.querySelector('[data-db-announcement-close]');
    if (closeElement)
      closeElement.addEventListener('click', () => {
        if (announcementElement.getAttribute('data-db-dismissible') !== 'true') return;
        const storageKey = readStorageKey();
        if (storageKey) {
          try {
            window.localStorage.setItem(storageKey, 'true');
          } catch (storageError) {
            void storageError;
          }
        }
        announcementElement.setAttribute('hidden', '');
      });
    if (window.MutationObserver) {
      const attributeObserver = new MutationObserver(() => applyVisibility());
      attributeObserver.observe(announcementElement, {
        attributes: true,
        attributeFilter: ['data-db-start-date', 'data-db-end-date', 'data-db-storage-key'],
      });
    }
    applyVisibility();
  });
};

export default runAnnouncementBehavior;
