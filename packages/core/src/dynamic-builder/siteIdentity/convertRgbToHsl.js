const convertRgbToHsl = (rgbRecord) => {
  const red = rgbRecord.red / 255;
  const green = rgbRecord.green / 255;
  const blue = rgbRecord.blue / 255;
  const maxChannel = Math.max(red, green, blue);
  const minChannel = Math.min(red, green, blue);
  const lightness = (maxChannel + minChannel) / 2;
  const delta = maxChannel - minChannel;
  if (delta === 0) return { hue: 0, saturation: 0, lightness };
  const saturation = lightness > 0.5 ? delta / (2 - maxChannel - minChannel) : delta / (maxChannel + minChannel);
  let hue = 0;
  if (maxChannel === red) hue = ((green - blue) / delta + (green < blue ? 6 : 0)) / 6;
  else if (maxChannel === green) hue = ((blue - red) / delta + 2) / 6;
  else hue = ((red - green) / delta + 4) / 6;
  return { hue: hue * 360, saturation, lightness };
};

export default convertRgbToHsl;
