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
    if (!audioContext) return;
    if (audioContext.state === 'running') {
      playToneRecipe(audioContext, toneSteps);
      return;
    }
    if (audioContext.state !== 'suspended' || typeof audioContext.resume !== 'function') return;
    const resumeResult = audioContext.resume();
    if (!resumeResult || typeof resumeResult.then !== 'function') return;
    resumeResult
      .then(() => {
        if (audioContext.state === 'running') playToneRecipe(audioContext, toneSteps);
      })
      .catch(() => undefined);
  } catch (audioError) {
    return;
  }
};

export default playFeedbackTone;
