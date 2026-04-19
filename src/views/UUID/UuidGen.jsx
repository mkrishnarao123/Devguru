import { useMemo, useState } from 'react';
import RandomGen from '../../components/UuidGenerator/RandomGen.jsx';
import BulkGenerator from '../../components/UuidGenerator/BulkGenerator.jsx';
import UuidDecoder from '../../components/UuidGenerator/UuidDecoder.jsx';

const tabs = [
  { component: RandomGen, title: 'Random UUID Generator' },
  { component: BulkGenerator, title: 'Bulk UUID Generator' },
  { component: UuidDecoder, title: 'UUID Decoder' },
];

export default function UuidGen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ActiveComponent = useMemo(() => tabs[activeIndex].component, [activeIndex]);

  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/id-icon.svg" className="w-12" alt="UUID" />
        <p className="ms-4 mt-4 font-bold text-xl">UUID Generator</p>
      </header>
      <main className="dark:bg-gray-700">
        <div className="bg-gray-200 p-2 md:p-0">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              onClick={() => setActiveIndex(index)}
              className={`p-1 md:p-3 hover:shadow-md hover:bg-primary-500 ${
                activeIndex === index ? 'bg-primary-500 text-white' : ''
              }`}
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
