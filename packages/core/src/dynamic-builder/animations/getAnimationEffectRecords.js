const getAnimationEffectRecords = () => [
  { id: 'none', label: 'No animation', from: '' },
  { id: 'fade', label: 'Fade in', from: 'opacity: 0;' },
  { id: 'fade-up', label: 'Fade up', from: 'opacity: 0; transform: translate3d(0, 28px, 0);' },
  { id: 'fade-down', label: 'Fade down', from: 'opacity: 0; transform: translate3d(0, -28px, 0);' },
  { id: 'fade-left', label: 'Fade from left', from: 'opacity: 0; transform: translate3d(-32px, 0, 0);' },
  { id: 'fade-right', label: 'Fade from right', from: 'opacity: 0; transform: translate3d(32px, 0, 0);' },
  { id: 'zoom-in', label: 'Zoom in', from: 'opacity: 0; transform: scale(0.9);' },
  { id: 'zoom-out', label: 'Zoom out', from: 'opacity: 0; transform: scale(1.08);' },
  { id: 'flip-up', label: 'Flip up', from: 'opacity: 0; transform: perspective(900px) rotateX(-24deg);' },
  { id: 'flip-left', label: 'Flip left', from: 'opacity: 0; transform: perspective(900px) rotateY(24deg);' },
  { id: 'slide-up', label: 'Slide up', from: 'transform: translate3d(0, 48px, 0);' },
  { id: 'blur-in', label: 'Blur in', from: 'opacity: 0; filter: blur(10px);' },
];

export default getAnimationEffectRecords;
