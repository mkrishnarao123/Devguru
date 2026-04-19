import BoxShadows from '../../components/BoxShadows/BoxShadows.jsx';

export default function BoxShadowsPage() {
  return (
    <div className="w-100 bg-transparent">
      <header className="dark:bg-gray-800 bg-primary-100 dark:text-white p-2 flex px-4 shadow-sm">
        <img src="/src/assets/icons/square-shadow.png" className="w-12" alt="Box Shadows" />
        <p className="ms-4 mt-4 font-bold text-xl">Box Shadows</p>
      </header>
      <main className="dark:bg-gray-700 bg-slate-50 p-2 md:p-4">
        <BoxShadows />
      </main>
    </div>
  );
}
