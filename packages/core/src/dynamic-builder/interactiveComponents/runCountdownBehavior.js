const runCountdownBehavior = () => {
  document.querySelectorAll('[data-db-countdown]').forEach((countdownElement) => {
    if (countdownElement.dataset.dbCountdownReady) return;
    countdownElement.dataset.dbCountdownReady = 'true';
    const gridElement = countdownElement.querySelector('[data-db-countdown-grid]');
    const messageElement = countdownElement.querySelector('[data-db-countdown-message]');
    const summaryElement = countdownElement.querySelector('[data-db-countdown-summary]');
    const valueElements = {
      days: countdownElement.querySelector('[data-db-count-days]'),
      hours: countdownElement.querySelector('[data-db-count-hours]'),
      minutes: countdownElement.querySelector('[data-db-count-minutes]'),
      seconds: countdownElement.querySelector('[data-db-count-seconds]'),
    };
    const countdownState = { timerId: null, lastSummaryStamp: null };
    const readDeadline = () => {
      const dateValue = countdownElement.getAttribute('data-db-deadline-date') || '';
      if (!dateValue) return null;
      const rawTimeValue = countdownElement.getAttribute('data-db-deadline-time') || '';
      const timeValue = /^\d\d?:\d\d$/.test(rawTimeValue) ? rawTimeValue : '00:00';
      const parsedDeadline = new Date(dateValue + 'T' + (timeValue.length === 4 ? '0' + timeValue : timeValue) + ':00');
      return isNaN(parsedDeadline.getTime()) ? null : parsedDeadline;
    };
    const padValue = (numberValue) => String(numberValue).padStart(2, '0');
    const writeSegments = (remainingMs) => {
      const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      const segmentValues = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
      Object.keys(segmentValues).forEach((segmentKey) => {
        if (valueElements[segmentKey]) valueElements[segmentKey].textContent = padValue(segmentValues[segmentKey]);
      });
      return segmentValues;
    };
    const writeSummary = (summaryText) => {
      if (summaryElement && summaryElement.textContent !== summaryText) summaryElement.textContent = summaryText;
    };
    const setHiddenState = (targetElement, shouldHide) => {
      if (!targetElement) return;
      if (shouldHide) targetElement.setAttribute('hidden', '');
      else targetElement.removeAttribute('hidden');
    };
    const applyTick = () => {
      if (!countdownElement.isConnected) {
        window.clearInterval(countdownState.timerId);
        return;
      }
      const deadlineDate = readDeadline();
      if (!deadlineDate) {
        writeSegments(0);
        setHiddenState(countdownElement, false);
        setHiddenState(gridElement, false);
        setHiddenState(messageElement, true);
        writeSummary('No deadline set for this countdown');
        return;
      }
      const remainingMs = deadlineDate.getTime() - Date.now();
      const expiryMessageText = countdownElement.getAttribute('data-db-expiry-message') || 'This countdown has ended.';
      if (remainingMs <= 0) {
        writeSegments(0);
        const expiryAction = countdownElement.getAttribute('data-db-expiry-action') || 'message';
        if (expiryAction === 'hide') {
          setHiddenState(countdownElement, true);
        } else {
          if (messageElement) messageElement.textContent = expiryMessageText;
          setHiddenState(countdownElement, false);
          setHiddenState(gridElement, true);
          setHiddenState(messageElement, false);
        }
        writeSummary(expiryMessageText);
        return;
      }
      setHiddenState(countdownElement, false);
      setHiddenState(gridElement, false);
      setHiddenState(messageElement, true);
      const segmentValues = writeSegments(remainingMs);
      const minuteStamp = Math.floor(remainingMs / 60000);
      if (countdownState.lastSummaryStamp !== minuteStamp) {
        countdownState.lastSummaryStamp = minuteStamp;
        writeSummary(
          'Time remaining: ' +
            segmentValues.days +
            ' days, ' +
            segmentValues.hours +
            ' hours and ' +
            segmentValues.minutes +
            ' minutes',
        );
      }
    };
    applyTick();
    countdownState.timerId = window.setInterval(applyTick, 1000);
  });
};

export default runCountdownBehavior;
