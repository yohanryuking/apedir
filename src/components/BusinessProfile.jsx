import React from 'react';
import { supabase } from '../services/client';
import { Box, Typography, Avatar, BottomNavigation, BottomNavigationAction } from '@mui/material';
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ p: 2, backgroundColor: '#555', color: '#fff', display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>Logo</Avatar>
        <Box sx={{ flexGrow: 1 }} />
        <Avatar sx={{ bgcolor: 'secondary.main' }}>N</Avatar>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6">Nombre del Negocio</Typography>
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