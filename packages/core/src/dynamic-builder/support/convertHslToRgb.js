const convertHslToRgb = (hueDegrees, saturationRatio, lightnessRatio) => {
  const wrappedHue = (((hueDegrees % 360) + 360) % 360) / 360;
  const safeSaturation = Math.max(0, Math.min(1, saturationRatio));
  const safeLightness = Math.max(0, Math.min(1, lightnessRatio));
  const secondChroma =
    safeLightness < 0.5
      ? safeLightness * (1 + safeSaturation)
      : safeLightness + safeSaturation - safeLightness * safeSaturation;
  const firstChroma = 2 * safeLightness - secondChroma;
  const convertHueChannel = (channelHue) => {
    const normalizedHue = ((channelHue % 1) + 1) % 1;
    if (normalizedHue < 1 / 6) return firstChroma + (secondChroma - firstChroma) * 6 * normalizedHue;
    if (normalizedHue < 1 / 2) return secondChroma;
    if (normalizedHue < 2 / 3) return firstChroma + (secondChroma - firstChroma) * (2 / 3 - normalizedHue) * 6;
    return firstChroma;
  };
  return {
    red: Math.round(convertHueChannel(wrappedHue + 1 / 3) * 255),
    green: Math.round(convertHueChannel(wrappedHue) * 255),
    blue: Math.round(convertHueChannel(wrappedHue - 1 / 3) * 255),
  };
};

export default convertHslToRgb;
