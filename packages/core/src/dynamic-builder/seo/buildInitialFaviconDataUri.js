import computeRelativeLuminance from '../support/computeRelativeLuminance.js';
import parseColorToRgb from '../support/parseColorToRgb.js';

const resolveInitialGlyph = (siteName) => {
  const firstCharacter = [...String(siteName || '')].find((character) => /[\p{L}\p{N}]/u.test(character));
  return firstCharacter ? firstCharacter.toUpperCase() : '';
};

const buildInitialFaviconDataUri = (siteName, brandColor) => {
  const safeBrandColor = /^#[0-9a-fA-F]{6}$/.test(String(brandColor || '')) ? brandColor : '#4b5563';
  const parsedColor = parseColorToRgb(safeBrandColor);
  const isLightBackground = Boolean(parsedColor) && computeRelativeLuminance(parsedColor) > 0.5;
  const glyphColor = isLightBackground ? '#111827' : '#ffffff';
  const initialGlyph = resolveInitialGlyph(siteName);
  const svgMarkup = [
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>",
    "<rect width='32' height='32' rx='7' fill='" + safeBrandColor + "'/>",
    initialGlyph
      ? "<text x='16' y='22.5' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='18' font-weight='700' fill='" +
        glyphColor +
        "'>" +
        initialGlyph +
        '</text>'
      : '',
    '</svg>',
  ].join('');
  return 'data:image/svg+xml,' + encodeURIComponent(svgMarkup);
};

export default buildInitialFaviconDataUri;
