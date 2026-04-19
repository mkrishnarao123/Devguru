import { useState } from 'react';

export default function ColorPicker() {
  const [getData, setGetData] = useState(null);
  const userdata = { name: 'krishnarao', designation: 'developer' };

  const save = () => {
    localStorage.setItem('userData', JSON.stringify(userdata));
  };

  const get = () => {
    setGetData(JSON.parse(localStorage.getItem('userData')));
  };

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/color-icon.svg" className="w-12" alt="Color" />
        <p className="ms-4 mt-4 font-bold text-xl">Colors</p>
      </header>
      <main className="dark:bg-gray-700 bg-slate-50 p-4">
        <button className="p-3 m-3 bg-green-200" onClick={save}>save in local</button>
        <button className="p-3 m-3 bg-red-200" onClick={get}>get from local</button>
        {getData && getData.designation}
      </main>
    </div>
  );
}
