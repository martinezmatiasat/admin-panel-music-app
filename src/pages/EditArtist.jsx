import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import { useParams } from 'react-router-dom';

const EditArtist = () => {
  const { artistId } = useParams();

  const [artist, setArtist] = useState({
    name: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    const { data } = await api.get(`/artists/${artistId}`);
    setArtist(data.result);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist((artist) => ({ ...artist, [name]: value }));
  };

  const handleFileChange = (e) => {
    setArtist((artist) => ({ ...artist, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', artist.name);
    formData.append('description', artist.description);
    formData.append('image', artist.image);

    const { data } = await api.patch(`/artists/${artistId}`, formData);
    notifySuccess(data.message);
    navigate('/artists');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Artista</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Nombre del Artista</label>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={artist.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div>
          <label className="block mb-1">Biografía</label>
          <textarea
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={artist.description}
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
            onClick={() => navigate('/artists')}
          >
            <Icon name="cancel" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArtist;