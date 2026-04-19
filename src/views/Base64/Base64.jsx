import { useMemo, useState } from 'react';
import Base64Encode from '../../components/Base64/Base64Encode.jsx';
import Base64Decode from '../../components/Base64/Base64Decode.jsx';

const tabs = [
  { component: Base64Encode, title: 'Encode' },
  { component: Base64Decode, title: 'Decode' },
];

export default function Base64() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveComponent = useMemo(() => tabs[activeIndex].component, [activeIndex]);

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/base-icon.svg" className="w-12" alt="Base64" />
        <p className="ms-4 mt-4 font-bold text-xl">Base64</p>
      </header>
      <main className="dark:bg-gray-700">
        <div className="bg-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveIndex(index)}
              className={`p-3 hover:shadow-md hover:bg-primary-500 ${activeIndex === index ? 'bg-primary-500 text-white' : ''}`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="p-4 bg-slate-50">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
