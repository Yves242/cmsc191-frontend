import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, SelectChangeEvent } from '@mui/material';

const ComboBox = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Correct the type of event to SelectChangeEvent<string>
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);  // event.target.value is already a string
  };

  return (
    <Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={selectedOption}
          onChange={handleChange}
          displayEmpty
          sx={{
            backgroundColor: 'white', // Set background color to white
            '& .MuiSelect-root': {
              padding: '10px',
            },
          }}
        >
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="last5Years">Last 5 Years</MenuItem>
          <MenuItem value="dateRange">Date Range</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ComboBox;
