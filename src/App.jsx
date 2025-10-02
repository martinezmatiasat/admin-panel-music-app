import { Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from '@/context/SessionContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Panel from '@/layouts/Panel';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Albums from '@/pages/Albums';
import CreateAlbum from '@/pages/CreateAlbum';
import EditAlbum from '@/pages/EditAlbum';
import Songs from '@/pages/Songs';
import CreateSong from '@/pages/CreateSong';
import EditSong from '@/pages/EditSong';
import Artists from '@/pages/Artists';
import CreateArtist from '@/pages/CreateArtist';
import EditArtist from '@/pages/EditArtist';
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
          <Route path="albums/edit/:albumId" element={<EditAlbum />} />
          <Route path="songs" element={<Songs />} />
          <Route path="songs/create" element={<CreateSong />} />
          <Route path="songs/edit/:songId" element={<EditSong />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/create" element={<CreateArtist />} />
          <Route path="artists/edit/:artistId" element={<EditArtist />} />
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