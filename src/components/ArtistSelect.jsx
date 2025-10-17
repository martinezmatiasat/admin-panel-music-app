import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Select from 'react-select';

const ArtistSelect = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [defaultOption, setDefaultOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArtists = async () => {
    const { data } = await api.get('/artists');
    setOptions(
      data.result.map(artist => ({
        value: artist._id,
        label: artist.name
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    setDefaultOption(options.find(opt => opt.value === value) || null);
  }, [options, value]);

  return (
    <div>
      <label className="block mb-1">Artista</label>
      <Select
        options={options}
        value={defaultOption}
        onChange={opt => onChange(opt.value)}
        isLoading={loading}
        isSearchable
        placeholder="Selecciona un artista..."
        noOptionsMessage={() => "No se encontraron artistas"}
      />
    </div>
  );
};

export default ArtistSelect;