import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { notifySuccess } from '@/utils/notification';
import PageContent from '@/components/PageContent';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const { data } = await api.get('/albums');
    setAlbums(data.result);
  };

  const createAlbum = () => {
    navigate('/albums/create');
  }

  const editAlbum = async (id) => {
    navigate(`/albums/edit/${id}`);
  };

  const deleteAlbum = async (id) => {
    const { data } = await api.delete(`/albums/${id}`);
    notifySuccess(data.message);
    setAlbums(albums.filter(album => album._id !== id));
  };

  const columns = [
    {
      name: 'Img',
      selector: row => <img src={`${API_URL}/uploads/${row.image}`} alt="álbum" className="w-10 h-10" />,
      sortable: false,
      width: '80px',
    },
    {
      name: 'Título',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Artista',
      selector: row => row.artist.name,
      sortable: true,
    },
    {
      name: 'Año',
      selector: row => row.year,
      sortable: true,
    },
  ];

  const actions = [
    {
      label: 'Nuevo Album',
      iconName: 'add',
      callback: () => createAlbum(),
    },
  ];

  const tableActions = [
    {
      label: 'Editar Album',
      iconName: 'edit',
      callback: row => editAlbum(row._id),
    },
    {
      label: 'Eliminar Album',
      iconName: 'delete',
      callback: row => deleteAlbum(row._id),
    },
  ];

  return (
    <PageContent
      title="Álbumes"
      columns={columns}
      items={albums}
      actions={actions}
      tableActions={tableActions}
    />
  );
};

export default Albums;