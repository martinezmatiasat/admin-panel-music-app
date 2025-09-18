import { useState } from 'react';
import api from '@api/api';
import { notifySuccess } from '@/utils/notification';

function UploadSong() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artistId, setArtistId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artistId', artistId);
    formData.append('file', file); // ¡el campo debe coincidir con el backend!

    const { data } = await api.post('/songs/upload', formData);
    notifySuccess(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <input type="text" value={artistId} onChange={(e) => setArtistId(e.target.value)} placeholder="ID del artista" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Subir canción</button>
    </form>
  );
}

export default UploadSong;
