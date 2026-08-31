const buildCountdownInteractiveCss = () => `
.db-countdown {
  font-family: var(--db-font-body);
  color: var(--db-color-text);
}
.db-countdown-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--db-space-3);
}
.db-countdown-segment {
  display: grid;
  gap: var(--db-space-1);
  justify-items: center;
  min-width: 4.5rem;
  padding: var(--db-space-3);
  background: var(--db-color-surface-alt);
  border: 1px solid var(--db-color-line);
  border-radius: var(--db-radius-md);
}
.db-countdown-value {
  font-size: var(--db-type-2xl);
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.db-countdown-label {
  font-size: var(--db-type-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--db-color-text-muted);
}
.db-countdown-message {
  margin: 0;
  font-size: var(--db-type-lg);
  font-weight: 600;
}
@media (max-width: 480px) {
  .db-countdown-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
`;

export default buildCountdownInteractiveCss;
