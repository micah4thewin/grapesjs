const clampChannel = (channelValue) => Math.max(0, Math.min(255, Math.round(channelValue)));

const compositeColorOver = (foregroundColor, backgroundColor) => {
  if (!foregroundColor) return backgroundColor || null;
  const alphaValue = typeof foregroundColor.alpha === 'number' ? foregroundColor.alpha : 1;
  if (alphaValue >= 1 || !backgroundColor) return { ...foregroundColor, alpha: 1 };
  const blendChannel = (channelName) =>
    clampChannel(foregroundColor[channelName] * alphaValue + backgroundColor[channelName] * (1 - alphaValue));
  return {
    red: blendChannel('red'),
    green: blendChannel('green'),
    blue: blendChannel('blue'),
    alpha: 1,
  };
};

export default compositeColorOver;
