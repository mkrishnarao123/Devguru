import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/HeroSection/Navbar.jsx';
import Sidebar from './components/HeroSection/Sidebar.jsx';
import UuidGen from './views/UUID/UuidGen.jsx';
import TextCompare from './views/TextCompare/TextCompare.jsx';
import Jwt from './views/JWT/Index.jsx';
import JsCompiler from './views/JsCompiler/JsCompiler.jsx';
import HtmlCompiler from './views/HtmlCompiler/HtmlCompiler.jsx';
import ImageCompressor from './views/ImageCompressor/Index.jsx';
import ColorPicker from './views/ColorPicker/ColorPicker.jsx';
import Base64 from './views/Base64/Base64.jsx';
import BoxShadows from './views/BoxShadows/Index.jsx';

function App() {
  return (
    <div className="main-wrapper w-100 dark:bg-gray-700">
      <Navbar />
      <main className="main-section p-2 md:px-10 m-auto md:flex flex-row gap-6">
        <Sidebar />
        <div className="m-auto h-5/6 w-full main-content-section">
          <div className="w-full h-full rounded-lg">
            <Routes>
              <Route path="/" element={<Navigate to="/js-compiler" replace />} />
              <Route path="/uuid-generator" element={<UuidGen />} />
              <Route path="/text-diff-checker" element={<TextCompare />} />
              <Route path="/jwt-decoder" element={<Jwt />} />
              <Route path="/js-compiler" element={<JsCompiler />} />
              <Route path="/html-compiler" element={<HtmlCompiler />} />
              <Route path="/image-compressor" element={<ImageCompressor />} />
              <Route path="/color-picker" element={<ColorPicker />} />
              <Route path="/base64-generator" element={<Base64 />} />
              <Route path="/box-shadows" element={<BoxShadows />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
