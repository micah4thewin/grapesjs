import convertHslToRgb from './convertHslToRgb.js';
import getNamedColorRecords from './getNamedColorRecords.js';
import parseColorHueValue from './parseColorHueValue.js';
import parseColorNumberValue from './parseColorNumberValue.js';
import splitColorFunctionParts from './splitColorFunctionParts.js';

const clampChannel = (channelValue) => Math.max(0, Math.min(255, Math.round(channelValue)));
const clampAlpha = (alphaValue) => Math.max(0, Math.min(1, alphaValue));

const parseHexColor = (hexDigits) => {
  const digitCount = hexDigits.length;
  if (digitCount !== 3 && digitCount !== 4 && digitCount !== 6 && digitCount !== 8) return null;
  const expandedDigits =
    digitCount <= 4
      ? hexDigits
          .split('')
          .map((digit) => digit + digit)
          .join('')
      : hexDigits;
  const alphaDigits = expandedDigits.slice(6, 8);
  return {
    red: parseInt(expandedDigits.slice(0, 2), 16),
    green: parseInt(expandedDigits.slice(2, 4), 16),
    blue: parseInt(expandedDigits.slice(4, 6), 16),
    alpha: alphaDigits ? parseInt(alphaDigits, 16) / 255 : 1,
  };
};

const parseAlphaPart = (alphaText) => {
  if (!alphaText) return 1;
  const alphaValue = parseColorNumberValue(alphaText, 1);
  return alphaValue == null ? 1 : clampAlpha(alphaValue);
};

const parseRgbFunction = (argumentText) => {
  const { channelParts, alphaText } = splitColorFunctionParts(argumentText);
  if (channelParts.length !== 3) return null;
  const channelValues = channelParts.map((partText) => parseColorNumberValue(partText, 255));
  if (channelValues.some((channelValue) => channelValue == null)) return null;
  return {
    red: clampChannel(channelValues[0]),
    green: clampChannel(channelValues[1]),
    blue: clampChannel(channelValues[2]),
    alpha: parseAlphaPart(alphaText),
  };
};

const parseHslFunction = (argumentText) => {
  const { channelParts, alphaText } = splitColorFunctionParts(argumentText);
  if (channelParts.length !== 3) return null;
  const hueDegrees = parseColorHueValue(channelParts[0]);
  const saturationValue = parseColorNumberValue(channelParts[1], 1);
  const lightnessValue = parseColorNumberValue(channelParts[2], 1);
  if (hueDegrees == null || saturationValue == null || lightnessValue == null) return null;
  const saturationRatio = channelParts[1].indexOf('%') >= 0 ? saturationValue : saturationValue / 100;
  const lightnessRatio = channelParts[2].indexOf('%') >= 0 ? lightnessValue : lightnessValue / 100;
  return { ...convertHslToRgb(hueDegrees, saturationRatio, lightnessRatio), alpha: parseAlphaPart(alphaText) };
};

const parseSrgbColorFunction = (argumentText) => {
  const { channelParts, alphaText } = splitColorFunctionParts(argumentText);
  if (channelParts.length !== 4 || channelParts[0].toLowerCase() !== 'srgb') return null;
  const channelValues = channelParts.slice(1).map((partText) => parseColorNumberValue(partText, 1));
  if (channelValues.some((channelValue) => channelValue == null)) return null;
  return {
    red: clampChannel(channelValues[0] * 255),
    green: clampChannel(channelValues[1] * 255),
    blue: clampChannel(channelValues[2] * 255),
    alpha: parseAlphaPart(alphaText),
  };
};

const parseColorToRgb = (colorValue) => {
  const normalizedValue = String(colorValue == null ? '' : colorValue)
    .trim()
    .toLowerCase();
  if (!normalizedValue) return null;
  const namedColors = getNamedColorRecords();
  const resolvedValue = namedColors[normalizedValue] || normalizedValue;
  const hexMatch = resolvedValue.match(/^#([0-9a-f]+)$/i);
  if (hexMatch) return parseHexColor(hexMatch[1]);
  const functionMatch = resolvedValue.match(/^([a-z]+)\((.*)\)$/i);
  if (!functionMatch) return null;
  const functionName = functionMatch[1].toLowerCase();
  const argumentText = functionMatch[2];
  if (functionName === 'rgb' || functionName === 'rgba') return parseRgbFunction(argumentText);
  if (functionName === 'hsl' || functionName === 'hsla') return parseHslFunction(argumentText);
  if (functionName === 'color') return parseSrgbColorFunction(argumentText);
  return null;
};

export default parseColorToRgb;
