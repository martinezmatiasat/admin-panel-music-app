import { } from 'react';
import PageContent from '@/components/PageContent';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Ejemplo de datos de usuarios
  /* const users = [
    {
      _id: '1',
      name: 'Juan',
      surname: 'Pérez',
      nickname: 'juanp',
      email: 'juan@example.com',
      role: 'admin',
      image: 'https://randomuser.me/utils/portraits/men/1.jpg',
    },
    {
      _id: '2',
      name: 'María',
      surname: 'González',
      nickname: 'mariag',
      email: 'maria@example.com',
      role: 'user',
      image: 'https://randomuser.me/utils/portraits/women/2.jpg',
    },
    {
      _id: '3',
      name: 'Pedro',
      surname: 'López',
      nickname: 'pedrol',
      email: 'pedro@example.com',
      role: 'user',
      image: 'https://randomuser.me/utils/portraits/men/3.jpg',
    },
  ]; */

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api.tusitio.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const createUser = async () => {
    // Lógica para crear un nuevo usuario
    alert('Crear nuevo usuario');
  };

  const editUser = async (id) => {
    // Lógica para editar un usuario
    alert(`Editar usuario con ID: ${id}`);
  };

  const deleteUser = async (id) => {
    // Lógica para eliminar un usuario
    alert(`Eliminar usuario con ID: ${id}`);
  };

  const actions = [
    {
      label: 'Nuevo Usuario',
      iconName: 'add',
      callback: () => createUser(),
    },
  ];

  // Definición de columnas
  const columns = [
    {
      name: 'Foto',
      selector: row => <img src={row.image} alt="user" className="w-10 h-10 rounded-full" />,
      sortable: false,
      width: '80px',
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Apellido',
      selector: row => row.surname,
      sortable: true,
    },
    {
      name: 'Nickname',
      selector: row => row.nickname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Rol',
      selector: row => row.role,
      sortable: true,
    },
  ];

  const tableActions = [
    {
      label: 'Editar usuario',
      iconName: 'edit',
      callback: row => editUser(row._id),
    },
    {
      label: 'Eliminar usuario',
      iconName: 'delete',
      callback: row => deleteUser(row._id),
    },
  ];

  return (
    <PageContent
      title="Usuarios"
      actions={actions}
      items={users}
      columns={columns}
      tableActions={tableActions}
    />
  )
};

export default Users;