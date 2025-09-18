import { useState } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import ArtistSelect from '@/components/ArtistSelect';

const CreateAlbum = () => {
  const [album, setAlbum] = useState({
    title: '',
    artist: '',
    description: '',
    year: '',
    image: null,
    songs: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((album) => ({ ...album, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAlbum((album) => ({ ...album, image: e.target.files[0] }));
  };

  const handleArtistChange = (value) => {
    console.log(value);
    setAlbum((album) => ({ ...album, artist: value }));
  };

  const handleSongChange = (index, value) => {
    setAlbum((album) => {
      const updatedSongs = [...album.songs];
      updatedSongs[index] = value;
      return { ...album, songs: updatedSongs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', album.title);
    formData.append('artist', album.artist);
    formData.append('description', album.description);
    formData.append('year', album.year);
    formData.append('image', album.image);
    formData.append('songs', JSON.stringify(album.songs));

    const { data } = await api.post('/albums', formData);
    notifySuccess(data.message);
    navigate('/albums');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Crear Álbum</h2>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Nombre del Álbum</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={album.title}
            onChange={handleChange}
            name="title"
          />
        </div>
        <div>
          <ArtistSelect
            value={album.artist}
            onChange={handleArtistChange}
          />
        </div>
        <div>
          <label className="block mb-1">Año</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={album.year}
            onChange={handleChange}
            name="year"
          />
        </div>
        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={album.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div>
          <label className="block mb-1">Imagen</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            onChange={handleFileChange}
            name="image"
          />
        </div>
        <div className="flex items-center gap-2 mt-8">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Icon name="save" />
            Guardar
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => navigate('/albums')}
          >
            <Icon name="cancel" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAlbum;