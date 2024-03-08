import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import PersonalProfile from './PersonalProfile';
import BusinessProfile from './BusinessProfile';
import CrearNegocio from './adminPanel/CrearNegocio';

const ProfileComp = () => {
  const [isPersonalProfile, setIsPersonalProfile] = useState(true);

  const toggleProfile = () => {
    setIsPersonalProfile(!isPersonalProfile);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" p={1}>
        <Button variant="contained" onClick={toggleProfile}>
          Cambiar a {isPersonalProfile ? 'Perfil Negocio' : 'Perfil Personal'}
        </Button>
      </Box>
      <Box>
        {isPersonalProfile ? <PersonalProfile /> : <BusinessProfile />}
      </Box>
    </Box>
  );
};

export default ProfileComp;