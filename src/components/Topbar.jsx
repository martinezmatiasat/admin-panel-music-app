import { useSession } from '@/context/SessionContext';

const Topbar = () => {
  const { logout } = useSession();

  return (
    <header className="px-6 pt-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">React Music App</h1>
      <button className="block px-4 py-2 rounded hover:bg-gray-200" onClick={logout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Topbar;