import { useEffect, useState } from 'react';

export default function Base64Decode() {
  const [uploadedImage, setUploadedImage] = useState(
    'SG93IG1hbnkgZGV2ZWxvcGVycyBkb2VzIGl0IHRha2UgdG8gc2NyZXcgaW4gYSBsaWdodGJ1bGI/IEFOU1dFUjogTm9uZS4gSXTigJlzIGEgaGFyZHdhcmUgcHJvYmxlbS4='
  );
  const [encodedResult, setEncodedResult] = useState('');

  useEffect(() => {
    EncodeData();
  }, []);

  const EncodeData = () => {
    setEncodedResult(atob(unescape(encodeURIComponent(uploadedImage))));
  };

  const previewFiles = () => {
    if (uploadedImage) {
      const shortened = uploadedImage;
      setUploadedImage(shortened);
    }
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
            Decode Data
          </button>
          <p className="font-medium">Enter Encoded text to Decode:</p>
          <textarea
            className="h-40 w-full text-secondary p-4 rounded-sm"
            placeholder="Enter Encoded text"
            value={uploadedImage}
            onChange={(e) => setUploadedImage(e.target.value)}
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
        <div className="w-full">
          <button onClick={previewFiles} className="bg-primary-500 h-10 text-center px-3 my-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white">
            Decode and Download Image
          </button>
          <p className="font-medium">Enter encoded image text:</p>
          <textarea className="h-52 w-full flex p-4 text-green-700 font-medium" value={uploadedImage} readOnly />
        </div>
        <div className="w-100 h-52 my-5 basis-3/5">
          <div>
            <a id="donwloadImage" download className="bg-primary-500 h-11 p-3 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white" href={uploadedImage}>
              Download
            </a>
            <div className="p-3 mt-3 h-full bg-white me-2">
              <img id="originalImage" src={uploadedImage} className="pa-3 h-56 w-full" alt="decoded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
