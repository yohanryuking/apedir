import React, { useEffect, useState } from 'react';
import { supabase } from '../services/client';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [value, setValue] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      const user = await supabase.auth.getUser();
      console.log(user.data.user.email);

  if (session) {
    console.log(session.data.session.user.email);
  } else {
    console.log('no hay sesión');
  }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // navigate('/login');
  };

  return (
    <Box>
      {/* El resto de tu código */}

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{ width: '100%', position: 'fixed', bottom: 0 }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Home;