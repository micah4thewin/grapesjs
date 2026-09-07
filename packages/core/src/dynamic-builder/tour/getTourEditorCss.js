import getTourButtonCss from './getTourButtonCss.js';
import getTourOverlayCss from './getTourOverlayCss.js';
import getTourPopoverCss from './getTourPopoverCss.js';

const getTourEditorCss = () => [getTourOverlayCss(), getTourPopoverCss(), getTourButtonCss()].join('\n');

export default getTourEditorCss;
