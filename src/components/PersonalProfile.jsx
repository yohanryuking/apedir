import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { supabase } from '../services/client';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');

  // const fetchAvatarUrl = async () => {
  //   const filePath = `profiles/${user.id}/avatar.jpg`;

  //   const { data: url, error: urlError } = await supabase.storage
  //     .from('avatars')
  //     .createSignedUrl(filePath, 60);

  //   if (urlError) {
  //     console.error('Error fetching avatar URL:', urlError.message);
  //   } else {
  //     setAvatarUrl(url);
  //   }
  // };

  useEffect(() => {
    const fetchUser = async () => {
      const userSB = await supabase.auth.getUser();
      const userId = userSB.data.user.id;
      setId(userId);

      const { data, error } = await supabase
        .from('users')
        .select('name,phone,plan,email').eq('id', userId);
      if (error) {
        console.error('Error fetching user profile:', error.message);
      } else {
        setUser(data[0]);
        setName(data[0]?.name);
        setEmail(data[0]?.email);
        setPhone(data[0]?.phone);
        // fetchAvatarUrl();
      }
    }
    fetchUser();
  }, []);

  const handleCreateBusiness = () => {
    // Logic to create a new business
  };

  const handleUpdateProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ name, email, phone })
      .eq('id', id);
    if (error) {
      console.error('Error updating user profile:', error.message);
    } else {
      console.log('User profile updated successfully:', data);
    }
  };

  const planLevel = (plan) => {
    if (plan == 0) {
      return 'Básico';
    } else if (plan == 1) {
      return 'Premium';
    } else if (plan == 2) {
      return 'Empresarial';
    } else if (plan == 3) {
      return 'Empresarial Plus';
    }
    return 'No definido';
  };

  const handleLogout = () => {
    // Logic to handle logout
    supabase.auth.signOut();
  };

  return (
    <Box sx={{
      width: { xs: '100%', md: '100vw' },
      height: '100vh',
      bgcolor: 'background.default'
    }}>
      <BlurredBackground>
        <ProfilePicture src={avatarUrl || 'defaultAvatar.jpg'} />
      </BlurredBackground>
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="div" gutterBottom>
          {user?.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleUpdateProfile} fullWidth>
              Editar perfil
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => { navigate('/profile/business') }} fullWidth>
              Gestionar Negocio
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItemText primary="Plan Actual" secondary={planLevel(user?.plan)} />
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalProfile;