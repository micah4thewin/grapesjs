const playToneRecipe = (audioContext, toneSteps) => {
  const baseTime = audioContext.currentTime;
  toneSteps.forEach((toneStep) => {
    const oscillatorNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const startTime = baseTime + toneStep.startAt;
    const endTime = startTime + toneStep.duration;
    oscillatorNode.type = toneStep.waveType;
    oscillatorNode.frequency.setValueAtTime(toneStep.startFrequency, startTime);
    if (toneStep.endFrequency !== toneStep.startFrequency) {
      oscillatorNode.frequency.exponentialRampToValueAtTime(Math.max(toneStep.endFrequency, 1), endTime);
    }
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.exponentialRampToValueAtTime(toneStep.peakGain, startTime + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);
    oscillatorNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillatorNode.start(startTime);
    oscillatorNode.stop(endTime + 0.02);
  });
};

export default playToneRecipe;
