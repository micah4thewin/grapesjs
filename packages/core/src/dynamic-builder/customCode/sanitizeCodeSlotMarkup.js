import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';

const sanitizeCodeSlotMarkup = (slotValue) => sanitizeHtmlMarkup(slotValue, { allowIframes: true });

export default sanitizeCodeSlotMarkup;
