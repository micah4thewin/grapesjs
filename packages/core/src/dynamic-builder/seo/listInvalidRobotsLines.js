import isRobotsDirectiveLine from './isRobotsDirectiveLine.js';
import normalizeRobotsExtraLines from './normalizeRobotsExtraLines.js';

const listInvalidRobotsLines = (robotsExtraValue) =>
  normalizeRobotsExtraLines(robotsExtraValue).filter((robotsLine) => !isRobotsDirectiveLine(robotsLine));

export default listInvalidRobotsLines;
