import { useEffect, useRef, useState } from 'react';

export default function ImageCompressor() {
  const [imageData, setImageData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [qualitySlider, setQualitySlider] = useState(80);
  const [resizingFactorSlider, setResizingFactorSlider] = useState(80);
  const [compressedSize, setCompressedSize] = useState('');
  const originalImageRef = useRef(null);
  const compressedImageRef = useRef(null);
  const downloadRef = useRef(null);

  useEffect(() => {
    if (imageData) compressImage();
  }, [qualitySlider, resizingFactorSlider]);

  const fileToDataUri = (field) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.readAsDataURL(field);
    });

  const previewFiles = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setImageData(files[0]);
    const dataUrl = await fileToDataUri(files[0]);
    setUploadedImage(dataUrl);
  };

  const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  const compressImage = () => {
    if (!imageData || !uploadedImage) return;
    const image = new Image();
    image.src = uploadedImage;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const originalWidth = image.width;
      const originalHeight = image.height;
      const scale = resizingFactorSlider / 100;
      canvas.width = originalWidth * scale;
      canvas.height = originalHeight * scale;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedUrl = URL.createObjectURL(blob);
            if (compressedImageRef.current) compressedImageRef.current.src = compressedUrl;
            if (downloadRef.current) downloadRef.current.href = compressedUrl;
            setCompressedSize(bytesToSize(blob.size));
          }
        },
        imageData.type || 'image/jpeg',
        qualitySlider / 100
      );
    };
  };

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/image-icon.svg" className="w-12" alt="Image" />
        <p className="ms-4 mt-4 font-bold text-xl">Image Compressor</p>
      </header>
      <main className="dark:bg-gray-700 bg-slate-50 p-2 md:p-4">
        <div className="w-100 flex">
          <label htmlFor="imgId" className="p-4 w-full text-center rounded-md font-medium cursor-pointer bg-white">
            Upload Image
          </label>
          <input onChange={previewFiles} id="imgId" type="file" accept="image/*" />
        </div>
        {imageData && (
          <div className="w-100 bg-primary-50 md:flex p-3 m-3 gap-6 items-center">
            <div className="bg-white p-3">
              <p className="text-xl text-secondary font-medium">ORIGINAL UPLOADED IMAGE:</p>
              <p>Name: <span className="font-medium">{imageData.name}</span></p>
              <p>Type: <span className="font-medium">{imageData.type}</span></p>
              <p className="font-medium rounded-lg">SIZE: <span className="font-medium">{imageData.size ? `${parseInt(imageData.size) / 1024} KB` : ''}</span></p>
              <img ref={originalImageRef} id="originalImage" src={uploadedImage} className="pa-3" alt="original" />
            </div>
            <div className="bg-white p-3 my-3">
              <p className="text-xl text-secondary font-medium">COMPRESSED IMAGE:</p>
              <div className="md:flex">
                <div className="bg-primary-50 flex p-1 my-2 rounded-md">
                  <div>
                    <p className="font-medium">Quality</p>
                    <input type="range" id="Quality" value={qualitySlider} onChange={(e) => setQualitySlider(Number(e.target.value))} />
                  </div>
                  <p className="bg-primary-50 p-2 ms-3 rounded-md"><span className="font-medium"> {qualitySlider}%</span></p>
                </div>
                <div className="bg-primary-50 flex p-1 my-2 md:ms-3 rounded-md">
                  <div>
                    <p className="font-medium">Resizing</p>
                    <input type="range" id="Resizing" value={resizingFactorSlider} onChange={(e) => setResizingFactorSlider(Number(e.target.value))} />
                  </div>
                  <p className="bg-primary-50 p-2 ms-3 rounded-md"><span className="font-medium"> {resizingFactorSlider}%</span></p>
                </div>
                <a ref={downloadRef} id="donwloadImage" download className="bg-primary-500 p-3 md:p-0 h-10 mt-4 pt-2 ms-3 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white">
                  Download
                </a>
              </div>
              <img ref={compressedImageRef} id="compressedImage" className="mt-4 md:m-0" alt="compressed" />
              <div>{compressedSize}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
