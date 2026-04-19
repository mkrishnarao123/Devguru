import { useEffect, useState } from 'react';

export default function JwtDecoder() {
  const [JWT, setJWT] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cQ'
  );
  const [decodedJWT, setDecodedJWT] = useState('');
  const [decodedHeader, setDecodedHeader] = useState('');

  useEffect(() => {
    decodeJWT();
  }, []);

  const decodeJWT = async () => {
    try {
      const parts = JWT.split('.');
      if (parts.length !== 3) {
        alert('Invalid JWT format');
        return;
      }
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setDecodedHeader(JSON.stringify(header, null, 2));
      setDecodedJWT(JSON.stringify(payload, null, 2));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="w-100 md:flex">
      <div className="basis-3/4">
        <label htmlFor="token">Enter Your JWT Token</label>
        <div className="flex gap-3 items-center">
          <textarea
            id="token"
            className="h-48 w-full p-4 rounded-sm"
            placeholder="Enter JWT Token"
            value={JWT}
            onChange={(e) => setJWT(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={decodeJWT}
            className="bg-primary-500 h-10 mt-4 text-center px-3 rounded-md hover:bg-primary-800 hover:shadow-md text-white"
          >
            Decode JWT Token
          </button>
        </div>
      </div>
      <div className="basis-2/4 md:p-4">
        <div className="mb-2">
          <p className="font-normal">HEADER: Algorithm & Token type</p>
          <textarea className="h-32 w-full flex p-4 text-green-700 font-medium" value={decodedHeader} readOnly />
        </div>
        <p>PAYLOAD:Data</p>
        <div>
          <textarea value={decodedJWT} className="h-44 w-full flex p-4 text-blue-800 font-medium" readOnly />
        </div>
      </div>
    </div>
  );
}
