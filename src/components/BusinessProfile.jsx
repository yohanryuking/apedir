import React, { useEffect, useState } from 'react';
import { supabase } from '../services/client';
import { Box, Typography, Avatar, BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  root: {
    backgroundColor: '#555',
    height: '35px',
  },
  actionItem: {
    color: '#fff',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    padding: '6px 12px',
  },
  selected: {
    color: '#555',
    backgroundColor: '#fff',
  },
});

const BusinessProfile = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
  const fetchBusiness = async () => {
    // Aquí debes hacer una solicitud a tu base de datos para obtener los negocios asociados al perfil del usuario
    // Puedes usar supabase para hacer la solicitud
    const { data, error } = await supabase
      .from('business')
      .select('*')
      .eq('owner', (await supabase.auth.getUser()).data.user.email);
    if (error) {
      console.error('Error fetching business:', error.message);
    } else {
      setBusiness(data[0]);
      console.log(data[0])
    }
  };
  fetchBusiness();
}, []);

const handleCreateBusiness = () => {
  // Aquí debes implementar la lógica para crear un nuevo negocio
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 2, backgroundColor: '#555', color: '#fff', display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>Logo</Avatar>
        <Box sx={{ flexGrow: 1 }} />
        <Avatar sx={{ bgcolor: 'secondary.main' }}>{business?.owner}</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">{business?.name}</Typography>
          <Typography variant="body2">Plan Premium</Typography>
        </Box>
      </Box>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction classes={{ root: classes.actionItem, selected: classes.selected }} label="Dashboard" />
        <BottomNavigationAction classes={{ root: classes.actionItem, selected: classes.selected }} label="Negocio" />
        <BottomNavigationAction classes={{ root: classes.actionItem, selected: classes.selected }} label="Catálogo" />
        <BottomNavigationAction classes={{ root: classes.actionItem, selected: classes.selected }} label="Eventos" />
        <BottomNavigationAction classes={{ root: classes.actionItem, selected: classes.selected }} label="Novedades" />
      </BottomNavigation>
    </Box>
  );
};

export default BusinessProfile;