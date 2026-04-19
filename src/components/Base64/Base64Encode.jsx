import { useEffect, useState } from 'react';

export default function Base64Encode() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [baseValue, setBaseValue] = useState('How many developers does it take to screw in a lightbulb? ANSWER: None. It’s a hardware problem.');
  const [encodedResult, setEncodedResult] = useState('');

  useEffect(() => {
    EncodeData();
  }, []);

  const EncodeData = () => {
    setEncodedResult(btoa(unescape(encodeURIComponent(baseValue))));
  };

  const previewFiles = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setImageData(files);
    const reader = new FileReader();
    reader.addEventListener('load', () => setUploadedImage(reader.result));
    reader.readAsDataURL(files[0]);
  };

  const copyText = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="w-100">
      <div className="md:flex gap-3">
        <div className="basis-3/5">
          <button onClick={EncodeData} className="bg-primary-500 h-10 text-center px-3 my-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white">
            Encode Data
          </button>
          <p className="font-medium">Enter text to encode:</p>
          <textarea
            className="h-40 w-full text-secondary p-4 rounded-sm"
            placeholder="Enter Encoded text"
            value={baseValue}
            onChange={(e) => setBaseValue(e.target.value)}
          />
        </div>
        <div className="w-full">
          <div>
            <button onClick={() => copyText(encodedResult)} className="bg-slate-300 h-10 text-center px-3 rounded-md hover:bg-slate-400 hover:shadow-md">
              Copy
            </button>
          </div>
          <p className="font-medium">Result:</p>
          <textarea disabled className="h-40 w-full flex p-4 text-green-700 font-medium" value={encodedResult} readOnly />
        </div>
      </div>

      <div className="md:flex">
        <div className="w-100 h-52 my-5 basis-3/5">
          <div className="w-full">
            <label htmlFor="imgId" className="p-4 text-center rounded-md font-medium cursor-pointer text-white bg-primary-500">
              Upload Image to Encode
            </label>
            <input onChange={previewFiles} id="imgId" type="file" className="w-full" accept="image/*" />
          </div>
          <div className="my-4">
            <p className="font-medium">Upload Image to encode:</p>
            {imageData && imageData[0] && (
              <div className="p-3 h-full bg-white me-2">
                <img src={uploadedImage} className="pa-3 h-28" alt="uploaded" />
                <p>Name: <span className="font-medium">{imageData[0].name}</span></p>
                <p>Type: <span className="font-medium">{imageData[0].type}</span></p>
                <p className="font-medium rounded-lg">SIZE: <span className="font-medium">{imageData[0].size ? `${parseInt(imageData[0].size) / 1024} KB` : ''}</span></p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <div>
            <button onClick={() => copyText(uploadedImage)} className="bg-slate-300 mt-12 md:mt-0 h-10 text-center px-3 rounded-md hover:bg-slate-400 hover:shadow-md">
              Copy
            </button>
          </div>
          <p className="font-medium">Result:</p>
          <textarea disabled className="h-52 w-full flex p-4 text-green-700 font-medium" value={uploadedImage || ''} readOnly />
        </div>
      </div>
    </div>
  );
}
