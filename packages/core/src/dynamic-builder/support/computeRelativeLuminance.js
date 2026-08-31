const computeRelativeLuminance = (rgbColor) => {
  const linearizeChannel = (channelValue) => {
    const normalizedChannel = channelValue / 255;
    return normalizedChannel <= 0.03928
      ? normalizedChannel / 12.92
      : Math.pow((normalizedChannel + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * linearizeChannel(rgbColor.red) +
    0.7152 * linearizeChannel(rgbColor.green) +
    0.0722 * linearizeChannel(rgbColor.blue)
  );
};

export default computeRelativeLuminance;
