const getDefaultCoverPhotoUri = () => {
  const svgMarkup = [
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'>",
    "<rect width='1600' height='900' fill='%231f2a37'/>",
    "<circle cx='1180' cy='230' r='120' fill='%23f2c14e' opacity='0.9'/>",
    "<path d='M0 640 L260 430 L480 560 L720 360 L980 600 L1240 470 L1600 640 L1600 900 L0 900 Z' fill='%232c3e50'/>",
    "<path d='M0 720 L320 560 L560 660 L860 500 L1120 700 L1400 600 L1600 720 L1600 900 L0 900 Z' fill='%2334495e'/>",
    '</svg>',
  ].join('');
  return 'data:image/svg+xml,' + svgMarkup.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23');
};

export default getDefaultCoverPhotoUri;
