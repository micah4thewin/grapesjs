import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';
import stripPastedFlowAttributes from './stripPastedFlowAttributes.js';

const sanitizeCodeSlotMarkup = (slotValue) =>
  stripPastedFlowAttributes(sanitizeHtmlMarkup(slotValue, { allowIframes: true }));

export default sanitizeCodeSlotMarkup;
