const getModalAccessibilityCss = () => `
.gjs-mdl-dialog:focus {
  outline: none;
}
.gjs-mdl-dialog:focus-visible {
  outline: 2px solid var(--gjs-db-focus, #2563eb);
  outline-offset: -2px;
}
.gjs-mdl-dialog button.gjs-mdl-btn-close {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: 1;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
.gjs-mdl-dialog button.gjs-mdl-btn-close svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
}
.gjs-mdl-dialog button.gjs-mdl-btn-close:hover {
  background-color: var(--gjs-db-hover, rgba(127, 127, 127, 0.15));
}
.gjs-mdl-dialog button.gjs-mdl-btn-close:focus-visible {
  outline: 2px solid var(--gjs-db-focus, #2563eb);
  outline-offset: 2px;
}
@media (pointer: coarse) {
  .gjs-mdl-dialog button.gjs-mdl-btn-close {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    right: 4px;
  }
}
`;

export default getModalAccessibilityCss;
