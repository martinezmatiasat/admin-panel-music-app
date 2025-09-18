import { Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from '@/context/SessionContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Panel from '@/layouts/Panel';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Albums from '@/pages/Albums';
import CreateAlbum from '@/pages/CreateAlbum';
import Songs from '@/pages/Songs';
import Artists from '@/pages/Artists';
import CreateArtist from '@/pages/CreateArtist';
import Admin from '@/pages/Admin';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <SessionProvider>
      <Routes>
        <Route element={<ProtectedRoute><Panel /></ProtectedRoute>}>
          <Route path="" element={<Navigate to="/albums" />} />
          <Route path="albums" element={<Albums />} />
          <Route path="albums/create" element={<CreateAlbum />} />
          <Route path="songs" element={<Songs />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/create" element={<CreateArtist />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" />
    </SessionProvider>
  );
};

export default App;