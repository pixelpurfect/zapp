import React from 'react';
import { styled } from '@mui/material/styles';
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // transparent black background
  borderRadius: '20px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#ffffff', // ensure text is white
    background: 'transparent',
    fontSize: '16px',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // darken on hover
  },
  '& .MuiInputBase-input:focus': {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // focus effect
  },
}));

const SearchBar = () => (
  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
    <SearchIconWrapper>
      <SearchIcon style={{ color: '#ffffff' }} />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </div>
);

export default SearchBar;
