import appendSocialProfileFromUrl from './appendSocialProfileFromUrl.js';
import buildHelpedInputMarkup from './buildHelpedInputMarkup.js';
import markTraitInputValidity from '../traits/markTraitInputValidity.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';

const rejectionMessage = 'That link cannot be used. Paste a full web address, like https://instagram.com/yourname';

const createSocialProfilePasteTraitDefinition = () => ({
  createInput: ({ trait }) => buildHelpedInputMarkup('url', trait),
  onEvent: ({ component, elInput }) => {
    const inputElement = resolveTraitInnerElement(elInput, 'input');
    if (!inputElement) return;
    const pastedValue = String(inputElement.value || '').trim();
    if (!pastedValue) {
      markTraitInputValidity(inputElement, true, rejectionMessage);
      return;
    }
    const addedItem = appendSocialProfileFromUrl(component, pastedValue);
    markTraitInputValidity(inputElement, Boolean(addedItem), rejectionMessage);
    if (addedItem) inputElement.value = '';
  },
});

export default createSocialProfilePasteTraitDefinition;
