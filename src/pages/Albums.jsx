import { useState } from 'react'

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Álbumes</h2>
      <p>Aquí se mostrarán los álbumes.</p>
    </div>
  );
};

export default Albums;