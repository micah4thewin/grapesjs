const convertHslToRgb = (hslRecord) => {
  const hue = (((hslRecord.hue % 360) + 360) % 360) / 360;
  const saturation = Math.max(0, Math.min(1, hslRecord.saturation));
  const lightness = Math.max(0, Math.min(1, hslRecord.lightness));
  if (saturation === 0) return { red: lightness * 255, green: lightness * 255, blue: lightness * 255 };
  const upper = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const lower = 2 * lightness - upper;
  const channelFor = (offset) => {
    let position = hue + offset;
    if (position < 0) position += 1;
    if (position > 1) position -= 1;
    if (position < 1 / 6) return lower + (upper - lower) * 6 * position;
    if (position < 1 / 2) return upper;
    if (position < 2 / 3) return lower + (upper - lower) * (2 / 3 - position) * 6;
    return lower;
  };
  return { red: channelFor(1 / 3) * 255, green: channelFor(0) * 255, blue: channelFor(-1 / 3) * 255 };
};

export default convertHslToRgb;
