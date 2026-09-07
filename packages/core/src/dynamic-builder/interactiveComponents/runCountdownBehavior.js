const runCountdownBehavior = () => {
  document.querySelectorAll('[data-db-countdown]').forEach((countdownElement) => {
    if (countdownElement.dataset.dbCountdownReady) return;
    countdownElement.dataset.dbCountdownReady = 'true';
    const isEditorCanvas = () =>
      document.body.hasAttribute('data-db-editor-canvas') && !document.body.hasAttribute('data-db-editor-preview');
    const gridElement = countdownElement.querySelector('[data-db-countdown-grid]');
    const messageElement = countdownElement.querySelector('[data-db-countdown-message]');
    const summaryElement = countdownElement.querySelector('[data-db-countdown-summary]');
    const segmentKeys = ['days', 'hours', 'minutes', 'seconds'];
    const valueElements = {};
    segmentKeys.forEach((segmentKey) => {
      valueElements[segmentKey] = countdownElement.querySelector('[data-db-count-' + segmentKey + ']');
    });
    const countdownState = { timerId: null, lastSummaryStamp: null };
    const readAttribute = (attributeName) => countdownElement.getAttribute(attributeName) || '';
    const readDeadline = () => {
      const dateValue = readAttribute('data-db-deadline-date');
      if (!dateValue) return null;
      const rawTimeValue = readAttribute('data-db-deadline-time');
      const timeValue = /^([01]\d|2[0-3]):[0-5]\d$/.test(rawTimeValue) ? rawTimeValue : '00:00';
      const rawOffsetValue = readAttribute('data-db-deadline-offset');
      const offsetValue = /^(Z|[+-](0\d|1[0-4]):[0-5]\d)$/.test(rawOffsetValue) ? rawOffsetValue : '';
      const parsedDeadline = new Date(dateValue + 'T' + timeValue + ':00' + offsetValue);
      return isNaN(parsedDeadline.getTime()) ? null : parsedDeadline;
    };
    const padValue = (numberValue) => String(numberValue).padStart(2, '0');
    const setHiddenState = (targetElement, shouldHide) => {
      if (!targetElement) return;
      if (shouldHide) targetElement.setAttribute('hidden', '');
      else targetElement.removeAttribute('hidden');
    };
    const setLiveHidden = (shouldHide) => {
      const inEditor = isEditorCanvas();
      setHiddenState(countdownElement, shouldHide && !inEditor);
      if (shouldHide && inEditor) countdownElement.setAttribute('data-db-live-hidden', 'true');
      else countdownElement.removeAttribute('data-db-live-hidden');
    };
    const showGrid = (shouldShowGrid) => {
      setHiddenState(gridElement, !shouldShowGrid);
      setHiddenState(messageElement, shouldShowGrid);
    };
    const writeSegments = (remainingMs) => {
      const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      const segmentValues = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
      segmentKeys.forEach((segmentKey) => {
        if (valueElements[segmentKey]) valueElements[segmentKey].textContent = padValue(segmentValues[segmentKey]);
      });
      const daysSegment = valueElements.days ? valueElements.days.closest('.db-countdown-segment') : null;
      const hideDays = readAttribute('data-db-hide-days') === 'true' && segmentValues.days === 0 && remainingMs > 0;
      setHiddenState(daysSegment, hideDays);
      return segmentValues;
    };
    const writeSummary = (summaryText) => {
      if (summaryElement && summaryElement.textContent !== summaryText) summaryElement.textContent = summaryText;
    };
    const applyTick = () => {
      if (!countdownElement.isConnected) return window.clearInterval(countdownState.timerId);
      const deadlineDate = readDeadline();
      if (!deadlineDate) {
        writeSegments(0);
        setLiveHidden(false);
        showGrid(true);
        writeSummary('No deadline set for this countdown');
        return;
      }
      const remainingMs = deadlineDate.getTime() - Date.now();
      if (remainingMs <= 0) {
        writeSegments(0);
        const expiryMessageText = readAttribute('data-db-expiry-message');
        const shouldHide = readAttribute('data-db-expiry-action') === 'hide';
        if (messageElement) messageElement.textContent = expiryMessageText;
        setLiveHidden(shouldHide);
        showGrid(shouldHide);
        writeSummary(expiryMessageText);
        return;
      }
      setLiveHidden(false);
      showGrid(true);
      const segmentValues = writeSegments(remainingMs);
      const minuteStamp = Math.floor(remainingMs / 60000);
      if (countdownState.lastSummaryStamp !== minuteStamp) {
        countdownState.lastSummaryStamp = minuteStamp;
        const summaryParts = [segmentValues.days + ' days', segmentValues.hours + ' hours', segmentValues.minutes + ' minutes'];
        writeSummary('Time remaining: ' + summaryParts.join(', '));
      }
    };
    applyTick();
    countdownState.timerId = window.setInterval(applyTick, 1000);
  });
};

export default runCountdownBehavior;
