const buildButtonGroupContentCss = () => `
.db-button-group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--db-space-3, 0.75rem);
  margin: 0 0 var(--db-space-4, 1rem);
}
.db-button-group[data-db-wrap='true'] {
  flex-wrap: wrap;
}
.db-button-group[data-db-gap='sm'] {
  gap: var(--db-space-2, 0.5rem);
}
.db-button-group[data-db-gap='lg'] {
  gap: var(--db-space-5, 1.5rem);
}
.db-button-group[data-db-align='center'] {
  justify-content: center;
}
.db-button-group[data-db-align='end'] {
  justify-content: flex-end;
}
.db-button-group[data-db-align='between'] {
  justify-content: space-between;
}
@media (max-width: 767.98px) {
  .db-button-group {
    row-gap: var(--db-space-2, 0.5rem);
  }
}
`;

export default buildButtonGroupContentCss;
