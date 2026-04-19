import JwtDecoder from '../../components/JWTDecoder/JwtDecoder.jsx';

export default function Jwt() {
  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/jwt-icon.png" className="w-12" alt="JWT" />
        <p className="ms-4 mt-4 font-bold text-xl">JWT Decoder</p>
      </header>
      <main className="dark:bg-gray-700 bg-slate-50 p-2 md:p-4">
        <JwtDecoder />
      </main>
    </div>
  );
}
