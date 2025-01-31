import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import {Link} from 'expo-router';
import PrintIcon from '@mui/icons-material/Print'

// Wrapper for the profile emoji and switch inside a smaller box
const BoxWrapper = styled('div')({
  padding: '5px', // Reduced padding to make the box smaller
  border: '2px solid #ccc', // Add a border around the box
  borderRadius: '10px', // Round the corners of the box
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100px', // Smaller width for the box
  backgroundColor: '#f9f9f9', // Light background for the box
  position: 'fixed', // Fixing it to the top right
  top: '10px', // Adjust position from the top
  right: '10px', // Adjust position from the right
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional shadow effect for better visibility
  zIndex: 1000, // Ensure it stays on top of other content
});

// Wrapper for the search icon inside the input field
const SearchIconWrapper = styled('div')({
  position: 'absolute',
  right: '10px', // Position the icon at the extreme right
  top: '50%',
  transform: 'translateY(-50%)', // Vertically center the icon
  pointerEvents: 'none', // Prevent interaction with the icon
});

// Styled InputBase component for the search bar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#FFFFFF', // White text color
  backgroundColor: '#000000', // Black background for the search bar
  borderRadius: '20px',
  transition: 'background-color 0.3s ease', // Smooth transition for hover/focus
  paddingRight: '35px', // Space for the search icon
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Add padding for the search input
    width: '100%',
    color: '#FFFFFF', // White text color
    fontSize: '16px',
  },
  // Darker background on hover
  '&:hover': {
    backgroundColor: '#333333', // Darker black on hover
  },
  '&.Mui-focused': {
    backgroundColor: '#111111', // Even darker background on focus
  },
}));

// Wrapper for the profile emoji and switch
const ToggleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '90px', // Adjust the width to fit the smaller box
  fontSize: '20px', // Adjust size of the emoji and toggle
});

const ZapperNavbar = () => {
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter(); // Using useRouter from expo-router

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(event.target.checked);

    // Redirect to the profile page when toggled on
    if (event.target.checked) {
      router.push('/ProfilePage'); // Adjusted route to match the profile page
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Profile Toggle Section */}
      <BoxWrapper>
        <ToggleWrapper>
          {/* Profile icon */}
          <span style={{ cursor: 'pointer' }}>
            👤
          </span>
           {/* Print Icon Section */}
      <div style={{ position: 'absolute', top: '10px', left: '120px' }}>
        <Link href="/PrintoutOrder">
          <span
            style={{ cursor: 'pointer', fontSize: '24px' }}
          >
            <PrintIcon style={{ color: '#000' }} /> {/* Print icon */}
          </span>
        </Link>
      </div>

          {/* Toggle switch */}
          <Switch
            checked={isToggled}
            onChange={handleToggleChange}
            color="primary"
            inputProps={{ 'aria-label': 'profile toggle' }}
          />
        </ToggleWrapper>
      </BoxWrapper>

      {/* Search Bar Section */}
      <div style={{ marginTop: '70px', width: '100%' }}> {/* Added marginTop for spacing */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
          {/* Search icon positioned at the extreme right */}
          <SearchIconWrapper>
            <SearchIcon style={{ color: '#FFFFFF' }} /> {/* White search icon */}
          </SearchIconWrapper>
        </div>
      </div>
    </div>
  );
};

export default ZapperNavbar;

