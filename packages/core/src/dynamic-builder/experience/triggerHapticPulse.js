const triggerHapticPulse = (pulseMilliseconds) => {
  try {
    typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function' && navigator.vibrate(pulseMilliseconds);
  } catch (hapticError) {
    return;
  }
};

export default triggerHapticPulse;
