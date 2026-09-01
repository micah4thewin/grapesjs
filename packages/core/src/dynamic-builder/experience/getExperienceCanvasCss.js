const getExperienceCanvasCss = () => `
@keyframes db-drop-settle-keyframes {
  0% {
    transform: scale(0.985);
    opacity: 0.4;
  }
  55% {
    transform: scale(1.004);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.db-drop-settle {
  animation: db-drop-settle-keyframes 380ms cubic-bezier(0.22, 1, 0.36, 1);
  outline: 2px solid rgba(91, 96, 103, 0.55);
  outline-offset: 3px;
  transition: outline-color 420ms ease;
}
@media (prefers-reduced-motion: reduce) {
  .db-drop-settle {
    animation: none;
  }
}
body * {
  -webkit-tap-highlight-color: transparent;
}
[data-gjs-type='wrapper']:empty {
  min-height: 60vh;
}
[data-gjs-type='wrapper']:empty::before {
  content: 'Your page is empty. Drag any block from the panel on the right and drop it here.';
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 6vh auto;
  padding: 3rem 2rem;
  max-width: 30rem;
  min-height: 10rem;
  border: 2px dashed #b6bcc4;
  border-radius: 12px;
  color: #5b6067;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}
`;

export default getExperienceCanvasCss;
