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

export default function BulkGenerator() {
  const [bulkUUIDs, setBulkUUIDs] = useState([]);
  const [count, setCount] = useState(6);

  useEffect(() => {
    generateBulkUUID(count);
  }, []);

  const generateBulkUUID = (value) => {
    if (value && value > 0) {
      const ids = [];
      for (let i = 0; i < value; i += 1) {
        ids.push(generateUUID());
      }
      setBulkUUIDs(ids);
    } else {
      alert('Please add valid number');
    }
  };

  const copyUUid = (textToCopy) => {
    navigator.clipboard.writeText(Array.isArray(textToCopy) ? textToCopy.join('\n') : textToCopy);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="w-100">
      <h2 className="text-base font-medium">Bulk UUID Generator (v4):</h2>
      <p className="py-3 rounded-sm">
        Our bulk UUID generator allows you to effortlessly generate up to{' '}
        <strong className="text-primary-500">100 unique identifiers in one go</strong>.
      </p>
      <div className="mb-2">
        <input
          type="number"
          className="h-11 p-4 rounded-sm"
          placeholder="Enter No of UUID's"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button
          onClick={() => generateBulkUUID(count)}
          className="bg-primary-500 mt-4 md:mt-0 h-10 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white ms-2"
        >
          Generate
        </button>
        <button
          onClick={() => copyUUid(bulkUUIDs)}
          className="bg-slate-300 ms-2 h-10 text-center px-3 rounded-md hover:bg-slate-400 hover:shadow-md"
        >
          Copy
        </button>
      </div>
      <div className="flex gap-3 items-center">
        <div className="text-center w-full grid grid-cols-1 md:grid-cols-2 bg-slate-100 p-3 rounded-lg">
          {bulkUUIDs.map((uuid) => (
            <p key={uuid}>{uuid}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
