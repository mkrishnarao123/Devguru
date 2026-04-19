export default function Navbar() {
  return (
    <header className="md:h-20 h-16 dark:bg-gray-800 dark:text-white p-2 px-4 bg-secondary shadow-sm">
      <p className="md:text-3xl text-white font-bold">
        <span>Dev</span>
        <span className="text-primary-500">Ease</span>
      </p>
      <small className="text-xs md:text-lg text-white">Tools to Code, Tools to Validate.</small>
    </header>
  );
}
