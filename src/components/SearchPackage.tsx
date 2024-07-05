import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';

interface SearchPackageProps {
  onSearch: (searchTerm: string, searchBy: 'name' | 'trackingNumber') => void;
}

const SearchPackage: React.FC<SearchPackageProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'trackingNumber'>('name');

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e: SelectChangeEvent<'name' | 'trackingNumber'>) => {
    setSearchBy(e.target.value as 'name' | 'trackingNumber');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, searchBy);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="search"
        label="חפש חבילה..."
        name="search"
        autoComplete="search"
        autoFocus
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="search-by-label">חפש לפי</InputLabel>
        <Select
          labelId="search-by-label"
          id="search-by"
          value={searchBy}
          label="חפש לפי"
          onChange={handleSearchByChange}
        >
          <MenuItem value="name">שם</MenuItem>
          <MenuItem value="trackingNumber">מספר מעקב</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        חפש
      </Button>
    </Box>
  );
};

export default SearchPackage;
