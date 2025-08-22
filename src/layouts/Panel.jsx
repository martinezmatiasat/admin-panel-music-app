import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

const Panel = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Panel;