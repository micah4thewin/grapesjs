const normalizeRobotsExtraLines = (robotsExtraValue) => {
  const sourceLines = Array.isArray(robotsExtraValue) ? robotsExtraValue : String(robotsExtraValue || '').split('\n');
  return sourceLines.map((sourceLine) => String(sourceLine).trim()).filter(Boolean);
};

export default normalizeRobotsExtraLines;
