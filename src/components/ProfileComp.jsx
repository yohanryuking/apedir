import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import PersonalProfile from './PersonalProfile';
import BusinessProfile from './BusinessProfile';

const ProfileComp = () => {
  const [currentComponent, setCurrentComponent] = useState(<PersonalProfile />);

  return (
    <Box>
      <Box display="flex" justifyContent="center" p={1}>
        <Button variant="contained" onClick={() => setCurrentComponent(<PersonalProfile />)}>Perfil Personal</Button>
        <Button variant="contained" onClick={() => setCurrentComponent(<BusinessProfile />)}>Perfil Negocio</Button>
      </Box>
      <Box>
        {currentComponent}
      </Box>
    </Box>
  );
};

export default ProfileComp;