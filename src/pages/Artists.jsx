import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import PageContent from '@/components/PageContent';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    const { data } = await api.get('/artists');
    setArtists(data.result);
  };

  const createArtist = () => {
    navigate('/artists/create');
  };

  const editArtist = async (id) => {
    navigate(`/artists/edit/${id}`);
  };

  const deleteArtist = async (id) => {
    const { data } = await api.delete(`/artists/${id}`);
    notifySuccess(data.message);
    setArtists(artists.filter(artist => artist._id !== id));
  };

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
  ];

  const actions = [
    {
      label: 'Nuevo Artista',
      iconName: 'add',
      callback: () => createArtist(),
    },
  ];

  const tableActions = [
    {
      label: 'Editar',
      iconName: 'edit',
      callback: (row) => editArtist(row._id),
    },
    {
      label: 'Eliminar',
      iconName: 'delete',
      callback: (row) => deleteArtist(row._id),
    },
  ];

  return (
    <PageContent
      title="Artistas"
      items={artists}
      columns={columns}
      actions={actions}
      tableActions={tableActions}
    />
  );
}

export default Artists;