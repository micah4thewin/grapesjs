const buildButtonContentCss = () => `
.db-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--db-space-2, 0.5rem);
  min-height: 44px;
  min-width: 44px;
  margin: 0;
  padding: var(--db-space-2, 0.5rem) var(--db-space-5, 1.5rem);
  border: 1px solid transparent;
  border-radius: var(--db-radius-md, 0.5rem);
  font-family: var(--db-font-body, inherit);
  font-size: var(--db-type-base, 1rem);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    border-color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    box-shadow var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease);
}
.db-button:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-button[aria-disabled='true'],
.db-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}
.db-button[data-db-size='sm'] {
  font-size: max(var(--db-type-sm, 0.875rem), 0.75rem);
  padding: var(--db-space-1, 0.25rem) var(--db-space-4, 1rem);
}
.db-button[data-db-size='lg'] {
  font-size: var(--db-type-lg, 1.2rem);
  padding: var(--db-space-3, 0.75rem) var(--db-space-6, 2rem);
}
@media (max-width: 767.98px) {
  .db-button.db-button-full-mobile {
    display: flex;
    width: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .db-button:active {
    transform: none;
  }
}
`;

export default buildButtonContentCss;
