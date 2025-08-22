import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) => { return `
    block px-4 py-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-300 font-semibold' : ''}
  `}

  return (
    <aside className="w-50 p-4 space-y-4">
      <nav>
        <ul className="px-2 py-4">
          <li>
            <NavLink to="/albums" end className={linkClass}>
              Albumes
            </NavLink>
          </li>
          <li className="mt-4">
            <NavLink to="/songs" className={linkClass}>
              Canciones
            </NavLink>
          </li>
          <li className="mt-4">
            <NavLink to="/artists" className={linkClass}>
              Artistas
            </NavLink>
          </li>
          <li className="mt-4">
            <NavLink to="/users" className={linkClass}>
              Usuarios
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;