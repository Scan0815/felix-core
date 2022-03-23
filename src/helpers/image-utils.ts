import imageCompression from 'browser-image-compression';

export const Compress = async (imageElement, orientation = null, max = 1920, mb = 10) => {
  const options = {
    maxSizeMB: mb,
    maxWidthOrHeight: max,
    useWebWorker: true,
    exifOrientation: orientation,
    onProgress: () => {
    },
  };
  try {
    return await imageCompression(imageElement, options);
  } catch (error) {
    console.error(error);
  }
};
