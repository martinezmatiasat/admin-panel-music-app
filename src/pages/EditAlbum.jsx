import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import ArtistSelect from '@/components/ArtistSelect';
import SongSelect from '@/components/SongSelect';
import { useParams } from 'react-router-dom';

const EditAlbum = () => {
  const { albumId } = useParams();

  const [album, setAlbum] = useState({
    title: '',
    artist: '',
    description: '',
    year: '',
    image: null,
    songs: [],
  });

  useEffect(() => {
    fetchAlbum();
  }, []);

  const fetchAlbum = async () => {
    const { data } = await api.get(`/albums/${albumId}`);
    const albumData = data.result;
    const artistId = albumData.artist?._id || albumData.artist || '';
    // Normalizar songs a array de ids
    const songsIds = Array.isArray(albumData.songs)
      ? albumData.songs.map(s => (s && (s._id || s))).filter(Boolean)
      : [];

    setAlbum({ ...albumData, artist: artistId, songs: songsIds });
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const handleFileChange = (e) => {
    setAlbum({ ...album, image: e.target.files[0] });
  };

  const handleArtistChange = (value) => {
    setAlbum({ ...album, artist: value });
  };

  const handleSongsChange = (values) => {
    setAlbum(a => ({ ...a, songs: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', album.title);
    // artist puede ser id o un objeto; enviar id
    const artistId = album.artist && (album.artist._id || album.artist);
    formData.append('artist', artistId);
    formData.append('description', album.description);
    formData.append('year', album.year);
    if (album.image) formData.append('image', album.image);
    formData.append('songs', JSON.stringify(album.songs || []));

    const { data } = await api.patch(`/albums/${albumId}`, formData);
    notifySuccess(data.message);
    navigate('/albums');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Editar Álbum</h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Título</label>
          <input type="text" name="title" value={album.title} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <ArtistSelect value={album.artist} onChange={handleArtistChange} />
        </div>
        <div>
          <label className="block mb-1">Año</label>
          <input type="text" name="year" value={album.year} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea name="description" value={album.description} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Imagen</label>
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <SongSelect value={album.songs} onChange={handleSongsChange} />
        </div>
        <div className="flex items-center gap-2 mt-8">
          <button type="submit" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Icon name="save" />
            Guardar
          </button>
          <button type="button" onClick={() => navigate('/albums')} className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            <Icon name="cancel" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAlbum;