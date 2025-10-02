import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import { useNavigate } from 'react-router-dom';
import PageContent from '@/components/PageContent';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const { data } = await api.get('/songs');
    setSongs(data.result);
  };

  const createSong = () => {
    navigate('/songs/create');
  };

  const editSong = async (id) => {
    navigate(`/songs/edit/${id}`);
  };

  const deleteSong = async (id) => {
    const { data } = await api.delete(`/songs/${id}`);
    notifySuccess(data.message);
    setSongs(songs.filter(song => song._id !== id));
  }

  const columns = [
    {
      name: 'Título',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Artista',
      selector: (row) => row.artist.name,
      sortable: true,
    },
    {
      name: 'Año',
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const actions = [
    {
      label: 'Nueva Canción',
      iconName: 'add',
      callback: () => createSong(),
    },
  ];

  const tableActions = [
    {
      label: 'Editar',
      iconName: 'edit',
      callback: (row) => editSong(row._id),
    },
    {
      label: 'Eliminar',
      iconName: 'delete',
      callback: (row) => deleteSong(row._id),
    },
  ];

  return (
    <PageContent
      title="Canciones"
      items={songs}
      columns={columns}
      actions={actions}
      tableActions={tableActions}
    />
  );
}

export default Songs;