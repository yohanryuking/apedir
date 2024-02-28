import React from 'react';
import { Avatar, Box, Button, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { supabase } from '../services/client';

const BlurredBackground = styled(Box)(({ theme }) => ({
  backgroundImage: `url('profilePicture.jpg')`,
  filter: 'blur(4px)',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProfilePicture = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  border: '4px solid white',
}));

const PersonalProfile = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    business: 'My Business',
  };

  const handleCreateBusiness = () => {
    // Logic to create a new business
  };

  const handleLogout = () => {
    // Logic to handle logout
    supabase.auth.signOut();
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <BlurredBackground>
        <ProfilePicture src="profilePicture.jpg" />
      </BlurredBackground>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="div" gutterBottom>
          {user.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleCreateBusiness} fullWidth>
              Editar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={handleCreateBusiness} fullWidth>
              Negocio
            </Button>
          </Grid>
        </Grid>
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={user.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone Number" secondary={user.phoneNumber} />
          </ListItem>
        </List>
        <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalProfile;