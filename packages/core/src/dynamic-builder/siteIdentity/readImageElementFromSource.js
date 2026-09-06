const readImageElementFromSource = (imageSource) =>
  new Promise((resolve, reject) => {
    const imageElement = new Image();
    imageElement.crossOrigin = 'anonymous';
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = () => reject(new Error('Image could not be loaded'));
    imageElement.src = imageSource;
  });

export default readImageElementFromSource;
