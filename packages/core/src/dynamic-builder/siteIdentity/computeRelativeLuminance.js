const computeRelativeLuminance = (rgbRecord) => {
  const linearize = (channelValue) => {
    const scaled = channelValue / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(rgbRecord.red) + 0.7152 * linearize(rgbRecord.green) + 0.0722 * linearize(rgbRecord.blue);
};

export default computeRelativeLuminance;
