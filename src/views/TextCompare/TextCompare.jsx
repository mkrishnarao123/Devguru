import { useEffect, useState } from 'react';

export default function TextCompare() {
  const [uuid, setUuid] = useState('5a9bb58b-ded3-4de1-bb12-0ba907bbc829');
  const [decodedUUID, setDecodedUUID] = useState(null);

  useEffect(() => {
    decodeUUID();
  }, []);

  const decodeUUID = async () => {
    try {
      const response = await fetch(`https://www.uuidtools.com/api/decode/${uuid}`);
      if (!response.ok) {
        alert('invalid UUID');
        return;
      }
      const data = await response.json();
      setDecodedUUID(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/text.svg" className="w-12" alt="Text Compare" />
        <p className="ms-4 mt-4 font-bold text-xl">Text Compare</p>
      </header>
      <main className="dark:bg-gray-700 bg-slate-50 p-4">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            className="h-11 w-2/4 p-4 rounded-sm"
            placeholder="Enter UUID"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
          />
          <button
            onClick={decodeUUID}
            className="bg-primary-500 h-10 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white"
          >
            Decode UUID
          </button>
        </div>
        <div>
          <p className="font-medium">Result:</p>
          {decodedUUID && (
            <table className="border bg-white my-4">
              <tbody>
                <tr className="border">
                  <td className="p-3">Standard String Format</td>
                  <td className="p-3">{decodedUUID.encode.STR}</td>
                </tr>
                <tr className="border">
                  <td className="p-3">Single Integer Value</td>
                  <td className="p-3">{decodedUUID.encode.SIV}</td>
                </tr>
                <tr className="border">
                  <td className="p-3">Version</td>
                  <td className="p-3">{decodedUUID.decode.version}</td>
                </tr>
                <tr className="border">
                  <td className="p-3">Variant</td>
                  <td className="p-3">{decodedUUID.decode.variant}</td>
                </tr>
                <tr className="border">
                  <td className="p-3">Contents</td>
                  <td className="p-3">{decodedUUID.decode.contents}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
