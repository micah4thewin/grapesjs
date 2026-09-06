import buildIconPickerControlsCss from './buildIconPickerControlsCss.js';
import buildIconPickerGridCss from './buildIconPickerGridCss.js';

const getIconPickerEditorCss = () => [buildIconPickerControlsCss(), buildIconPickerGridCss()].join('\n');

export default getIconPickerEditorCss;
