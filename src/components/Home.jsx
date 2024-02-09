import React, { useEffect } from 'react';
import { isAuthenticated, signOut } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button, Typography, Paper } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = isAuthenticated();
    if (!isLogged) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <Root>
      <LogoutButton variant="outlined" onClick={handleLogout}>
        Cerrar sesión
      </LogoutButton>

      <Carousel>
        {/* Aquí puedes agregar tus imágenes al carrusel */}
        <div>
          <img src="image1.jpg" alt="Imagen 1" />
        </div>
        <div>
          <img src="image2.jpg" alt="Imagen 2" />
        </div>
        {/* Agrega más imágenes según sea necesario */}
      </Carousel>

      <Typography variant="h4" gutterBottom>
        Section 1
      </Typography>
      <Section>
        <Typography variant="body1">
          This is an example section.
        </Typography>
      </Section>

      <Typography variant="h4" gutterBottom>
        Section 2
      </Typography>
      <Section>
        <Typography variant="body1">
          This is another example section.
        </Typography>
      </Section>

      {/* Add more sections as needed */}
    </Root>
  );
};

export default Home;