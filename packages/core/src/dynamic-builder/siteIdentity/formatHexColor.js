const formatHexColor = (rgbRecord) => {
  const toHexPart = (channelValue) =>
    Math.max(0, Math.min(255, Math.round(channelValue)))
      .toString(16)
      .padStart(2, '0');
  return '#' + toHexPart(rgbRecord.red) + toHexPart(rgbRecord.green) + toHexPart(rgbRecord.blue);
};

export default formatHexColor;
