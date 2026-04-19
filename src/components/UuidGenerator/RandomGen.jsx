import { useEffect, useState } from 'react';

function generateUUID() {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function RandomGen() {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    generateUUIDValue();
  }, []);

  const generateUUIDValue = () => {
    setUuid(generateUUID());
  };

  const copyUUid = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="w-100">
      <h2 className="text-base font-medium">UUID (Universally Unique Identifier):</h2>
      <p className="py-3 rounded-sm">
        A UUID (Universally Unique Identifier) (v4) is a standardized 128-bit
        identifier used in software development to uniquely identify information
        without requiring a central authority.
      </p>
      <div className="md:flex gap-3 items-center">
        <p className="md:text-center text-md md:w-3/4 bg-slate-100 p-3 rounded-lg md:text-lg">{uuid}</p>
        <button
          onClick={() => copyUUid(uuid)}
          className="bg-slate-300 mt-2 md:mt-0 h-10 text-center px-3 rounded-md hover:bg-slate-400 hover:shadow-md"
        >
          Copy
        </button>
        <button
          onClick={generateUUIDValue}
          className="bg-primary-500 ms-3 h-10 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
