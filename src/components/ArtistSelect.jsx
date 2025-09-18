import Select from 'react-select';
import { useState, useEffect } from 'react';
import api from '@/utils/api';

const ArtistSelect = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
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

  const fetchSelectedArtist = async () => {
    setSelectedOption(options.find(opt => opt.value === value) || null);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    fetchSelectedArtist();
  }, [options, value]);

  return (
    <div>
      <label className="block mb-1">Artista</label>
      <Select
        options={options}
        value={selectedOption}
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