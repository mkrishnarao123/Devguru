import { useLocation, useNavigate } from 'react-router-dom';
import idIcon from '../../assets/icons/id-icon.svg';
import imageIcon from '../../assets/icons/image-icon.svg';
import baseIcon from '../../assets/icons/base-icon.svg';
import jwtIcon from '../../assets/icons/jwt-icon.png';
import jsIcon from '../../assets/icons/jslogo.svg';
import HtmlIcon from '../../assets/icons/htmlicon.svg';
import SquareShadow from '../../assets/icons/square-shadow.png';

const tools = [
  { title: 'JS Compiler', icon: jsIcon, route: '/js-compiler' },
  { title: 'HTML Compiler', icon: HtmlIcon, route: '/html-compiler' },
  { title: 'JWT Decoder', icon: jwtIcon, route: '/jwt-decoder' },
  { title: 'Image Compressor', icon: imageIcon, route: '/image-compressor' },
  { title: 'UUID Generator', icon: idIcon, route: '/uuid-generator' },
  { title: 'Base64 Generator', icon: baseIcon, route: '/base64-generator' },
  { title: 'Box Shadows', icon: SquareShadow, route: '/box-shadows' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 dark:bg-slate-600 md:dark:bg-transparent md:bg-transparent p-3 w-full md:w-1/4 md:h-5/6 m-auto">
      <div className="grid grid-cols-3 md:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.route}
            onClick={() => navigate(tool.route)}
            className={`hover-main-card bg-white dark:bg-slate-400 md:bg-inherit md:dark:bg-white ${
              location.pathname === tool.route ? 'bg-red-100' : ''
            }`}
          >
            <div className="text-xs md:text-base">
              <img src={tool.icon} className="w-6 md:w-12 m-auto" alt={tool.title} />
              {tool.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
