const buildTraitSliderAssetCss = () => `
.gjs-db-trait-slider {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.gjs-db-trait-slider-range {
  flex: 1 1 auto;
  min-width: 0;
  width: auto;
  padding: 0;
  box-shadow: none;
  background: transparent;
}
.gjs-db-trait-slider-readout {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 3px;
}
.gjs-db-trait-slider-number {
  width: 4.4em;
  padding: 4px 6px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  -moz-appearance: textfield;
}
.gjs-db-trait-slider-number::-webkit-outer-spin-button,
.gjs-db-trait-slider-number::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.gjs-db-trait-slider-unit {
  min-width: 1.2em;
  font-size: 0.7rem;
}
.gjs-db-trait-asset {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
}
.gjs-db-trait-asset-thumb {
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-lift-1);
}
.gjs-db-trait-asset-body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.gjs-db-trait-asset-name {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.gjs-db-trait-asset-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
`;

export default buildTraitSliderAssetCss;
