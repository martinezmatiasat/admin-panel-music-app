import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Select from 'react-select';

const SongSelect = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    const { data } = await api.get('/songs');
    setOptions(
      data.result.map(song => ({ 
        value: song._id, 
        label: song.title
      }))
    );
    setLoading(false);
  };
    
  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    setDefaultOptions(options.filter(opt => value.includes(opt.value)));
  }, [options, value]);

  return (
    <div>
      <h2 className="block mb-1">Canciones</h2>
      <Select
        options={options}
        value={defaultOptions}
        onChange={opt => onChange(opt.map(o => o.value))}
        isLoading={loading}
        isMulti
        isSearchable
        placeholder="Selecciona una canción..."
        noOptionsMessage={() => "No se encontraron canciones"}
      />
    </div>
  );
};

export default SongSelect;