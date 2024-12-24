import React from 'react';
import { styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Wrapper for the search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled InputBase component
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#1e293b',
  backgroundColor: 'rgba(235, 229, 229, 0.5)', // Transparent black background
  borderRadius: '20px',
  transition: 'background-color 0.3s ease', // Smooth transition for hover/focus
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    color: '#1e293b', // White text color
    fontSize: '16px',
  },
   // Darker background on hover
  }
));

// Main SearchBar component
const SearchBar = () => (
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
    <SearchIconWrapper>
      <SearchIcon style={{ color: '#1e293b' }} />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </div>
);

export default SearchBar;
