import buildAnimationTraitDefinitions from '../animations/buildAnimationTraitDefinitions.js';
import buildInteractionTraitDefinitions from '../interactions/buildInteractionTraitDefinitions.js';

const getSharedComponentTraits = () => [...buildInteractionTraitDefinitions(), ...buildAnimationTraitDefinitions()];

export default getSharedComponentTraits;
