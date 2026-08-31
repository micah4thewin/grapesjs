const parseColorToRgb = (colorValue) => {
  const normalizedValue = String(colorValue || '')
    .trim()
    .toLowerCase();
  if (!normalizedValue) return null;
  const namedColors = { white: '#ffffff', black: '#000000', transparent: 'rgba(0,0,0,0)' };
  const resolvedValue = namedColors[normalizedValue] || normalizedValue;
  const hexMatch = resolvedValue.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hexDigits = hexMatch[1];
    const expandedDigits =
      hexDigits.length < 6
        ? hexDigits
            .split('')
            .map((digit) => digit + digit)
            .join('')
        : hexDigits;
    const red = parseInt(expandedDigits.slice(0, 2), 16);
    const green = parseInt(expandedDigits.slice(2, 4), 16);
    const blue = parseInt(expandedDigits.slice(4, 6), 16);
    const alphaDigits = expandedDigits.slice(6, 8);
    const alpha = alphaDigits ? parseInt(alphaDigits, 16) / 255 : 1;
    return { red, green, blue, alpha };
  }
  const rgbMatch = resolvedValue.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (rgbMatch) {
    return {
      red: Number(rgbMatch[1]),
      green: Number(rgbMatch[2]),
      blue: Number(rgbMatch[3]),
      alpha: rgbMatch[4] == null ? 1 : Number(rgbMatch[4]),
    };
  }
  const hslMatch = resolvedValue.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (hslMatch) {
    const hue = Number(hslMatch[1]) / 360;
    const saturation = Number(hslMatch[2]) / 100;
    const lightness = Number(hslMatch[3]) / 100;
    const alpha = hslMatch[4] == null ? 1 : Number(hslMatch[4]);
    const secondChroma =
      lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const firstChroma = 2 * lightness - secondChroma;
    const convertHueChannel = (channelHue) => {
      const wrappedHue = ((channelHue % 1) + 1) % 1;
      if (wrappedHue < 1 / 6) return firstChroma + (secondChroma - firstChroma) * 6 * wrappedHue;
      if (wrappedHue < 1 / 2) return secondChroma;
      if (wrappedHue < 2 / 3) return firstChroma + (secondChroma - firstChroma) * (2 / 3 - wrappedHue) * 6;
      return firstChroma;
    };
    return {
      red: Math.round(convertHueChannel(hue + 1 / 3) * 255),
      green: Math.round(convertHueChannel(hue) * 255),
      blue: Math.round(convertHueChannel(hue - 1 / 3) * 255),
      alpha,
    };
  }
  return null;
};

export default parseColorToRgb;
