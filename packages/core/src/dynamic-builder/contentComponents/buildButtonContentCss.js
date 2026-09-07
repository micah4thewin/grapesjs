const buildButtonContentCss = () => `
.db-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--db-space-2, 0.5rem);
  box-sizing: border-box;
  min-height: 44px;
  min-width: 44px;
  margin: 0;
  padding: var(--db-space-2, 0.5rem) var(--db-space-5, 1.5rem);
  border: 1px solid transparent;
  border-radius: var(--db-radius-md, 0.5rem);
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  font-family: var(--db-font-body, inherit);
  font-size: var(--db-type-base, 1rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.005em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    border-color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    box-shadow var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    transform var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease);
}
.db-button:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-button:active {
  transform: translateY(1px);
}
.db-button[aria-disabled='true'],
.db-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
  transform: none;
}
.db-button-icon,
.db-button > svg {
  display: inline-flex;
  flex: 0 0 auto;
  width: 1.15em;
  height: 1.15em;
  line-height: 0;
}
.db-button-icon svg {
  width: 100%;
  height: 100%;
}
.db-button-icon-only {
  padding-left: var(--db-space-3, 0.75rem);
  padding-right: var(--db-space-3, 0.75rem);
}
.db-button-md,
.db-button[data-db-size='md'] {
  min-height: 44px;
  font-size: var(--db-type-base, 1rem);
  padding: var(--db-space-2, 0.5rem) var(--db-space-5, 1.5rem);
}
.db-button-sm,
.db-button[data-db-size='sm'] {
  min-height: 40px;
  font-size: max(var(--db-type-sm, 0.875rem), 0.75rem);
  padding: var(--db-space-1, 0.25rem) var(--db-space-4, 1rem);
}
.db-button-lg,
.db-button[data-db-size='lg'] {
  min-height: 52px;
  font-size: var(--db-type-lg, 1.2rem);
  padding: var(--db-space-3, 0.75rem) var(--db-space-6, 2rem);
}
.db-button-full {
  display: flex;
  width: 100%;
}
@media (max-width: 767.98px) {
  .db-button-full-mobile,
  .db-button[data-db-full-mobile='true'] {
    display: flex;
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .db-button,
  .db-button:active {
    transition: none;
    transform: none;
  }
}
`;

export default buildButtonContentCss;
