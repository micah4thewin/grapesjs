const wrapPreviewSvgMarkup = (shapesMarkup) =>
  '<svg class="gjs-db-block-preview" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 60" ' +
  'preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
  shapesMarkup +
  '</svg>';

export default wrapPreviewSvgMarkup;
