import buildHeroMediaRecord from './buildHeroMediaRecord.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';

const syncHeroMediaVisibility = (heroComponent) => {
  if (!heroComponent || !heroComponent.getAttributes) return;
  const showsMedia = heroComponent.getAttributes()['data-db-media'] !== 'none';
  const innerComponent = findDescendantByAttribute(heroComponent, 'data-db-hero-inner');
  if (!innerComponent) return;
  const mediaComponent = findDescendantByAttribute(innerComponent, 'data-db-hero-media');
  if (showsMedia && !mediaComponent) innerComponent.append(buildHeroMediaRecord());
  if (!showsMedia && mediaComponent) mediaComponent.remove();
};

export default syncHeroMediaVisibility;
