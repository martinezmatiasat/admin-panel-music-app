import { Routes, Route, Navigate } from 'react-router-dom';
import Panel from '@/layouts/Panel';
import Login from '@/pages/Login';
import Albums from '@/pages/Albums';
import Songs from '@/pages/Songs';
import Artists from '@/pages/Artists';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const token = localStorage.getItem('token');

  if (!token && window.location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  if (token && window.location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Panel />}>
          <Route path="" element={<Navigate to="/albums" />} />
          <Route path="albums" element={<Albums />} />
          <Route path="songs" element={<Songs />} />
          <Route path="artists" element={<Artists />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>

  );
};

export default App;