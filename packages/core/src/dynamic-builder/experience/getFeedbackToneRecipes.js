const getFeedbackToneRecipes = () => ({
  drop: [
    { waveType: 'sine', startFrequency: 392, endFrequency: 587.33, startAt: 0, duration: 0.09, peakGain: 0.09 },
    { waveType: 'sine', startFrequency: 783.99, endFrequency: 783.99, startAt: 0.05, duration: 0.12, peakGain: 0.05 },
  ],
  select: [
    { waveType: 'sine', startFrequency: 1174.66, endFrequency: 1174.66, startAt: 0, duration: 0.035, peakGain: 0.025 },
  ],
  remove: [
    { waveType: 'triangle', startFrequency: 330, endFrequency: 165, startAt: 0, duration: 0.14, peakGain: 0.06 },
  ],
  save: [
    { waveType: 'sine', startFrequency: 523.25, endFrequency: 523.25, startAt: 0, duration: 0.12, peakGain: 0.05 },
    { waveType: 'sine', startFrequency: 783.99, endFrequency: 783.99, startAt: 0.09, duration: 0.16, peakGain: 0.05 },
  ],
  success: [
    { waveType: 'sine', startFrequency: 523.25, endFrequency: 523.25, startAt: 0, duration: 0.1, peakGain: 0.05 },
    { waveType: 'sine', startFrequency: 659.25, endFrequency: 659.25, startAt: 0.08, duration: 0.1, peakGain: 0.05 },
    { waveType: 'sine', startFrequency: 987.77, endFrequency: 987.77, startAt: 0.16, duration: 0.18, peakGain: 0.05 },
  ],
  error: [
    { waveType: 'triangle', startFrequency: 196, endFrequency: 174.61, startAt: 0, duration: 0.18, peakGain: 0.06 },
  ],
  toggle: [{ waveType: 'sine', startFrequency: 880, endFrequency: 880, startAt: 0, duration: 0.04, peakGain: 0.035 }],
  page: [
    { waveType: 'sine', startFrequency: 587.33, endFrequency: 587.33, startAt: 0, duration: 0.07, peakGain: 0.04 },
    { waveType: 'sine', startFrequency: 880, endFrequency: 880, startAt: 0.06, duration: 0.09, peakGain: 0.035 },
  ],
});

export default getFeedbackToneRecipes;
