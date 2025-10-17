import { useState } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/Icon';
import ArtistSelect from '@/components/ArtistSelect';

const CreateSong = () => {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    duration: '',
    year: '',
    audio: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  const handleFileChange = (e) => {
    setSong({ ...song, audio: e.target.files[0] });
  };

  const handleArtistChange = (value) => {
    setSong({ ...song, artist: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in song) {
      formData.append(key, song[key]);
    }
    const { data } = await api.post('/songs', formData);
    notifySuccess(data.message);
    navigate('/songs');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Song</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Título</label>
          <input type="text" name="title" value={song.title} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <ArtistSelect value={song.artist} onChange={handleArtistChange} />
        </div>
        <div>
          <label className="block mb-1">Duración</label>
          <input type="text" name="duration" value={song.duration} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Año</label>
          <input type="text" name="year" value={song.year} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Archivo</label>
          <input type="file" name="audio" onChange={handleFileChange} className="border border-gray-300 rounded px-3 py-2 w-full" />
        </div>
        <div className="flex items-center gap-2 mt-8">
          <button type="submit" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Icon name="save" />
            Guardar
          </button>
          <button type="button" onClick={() => navigate('/songs')} className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            <Icon name="cancel" />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSong;