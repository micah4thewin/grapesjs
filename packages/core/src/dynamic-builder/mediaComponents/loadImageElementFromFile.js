const loadImageElementFromFile = (imageFile) =>
  new Promise((resolveImage, rejectImage) => {
    const objectUrl = URL.createObjectURL(imageFile);
    const imageElement = new Image();
    imageElement.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolveImage(imageElement);
    };
    imageElement.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      rejectImage(new Error('Unable to read the image file'));
    };
    imageElement.src = objectUrl;
  });

export default loadImageElementFromFile;
