import ensureAudioContext from './ensureAudioContext.js';
import getFeedbackToneRecipes from './getFeedbackToneRecipes.js';
import getSoundPreference from './getSoundPreference.js';
import playToneRecipe from './playToneRecipe.js';

const playFeedbackTone = (editor, toneName) => {
  if (!getSoundPreference()) return;
  const toneSteps = getFeedbackToneRecipes()[toneName];
  if (!toneSteps) return;
  try {
    const audioContext = ensureAudioContext(editor);
    if (!audioContext || audioContext.state !== 'running') return;
    playToneRecipe(audioContext, toneSteps);
  } catch (audioError) {
    return;
  }
};

export default playFeedbackTone;
