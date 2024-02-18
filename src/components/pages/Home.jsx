// Importando las dependencias necesarias
import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/client'; // Cliente de Supabase
import { useNavigate } from 'react-router-dom'; // Hook de navegación
import { Button, Typography, Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material'; // Componentes de Material UI
import HomeIcon from '@mui/icons-material/Home'; // Icono de casa
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Icono de calendario
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Icono de carrito de compras
import Avatar from '@mui/material/Avatar'; // Componente de Avatar
import Campaign from '@mui/icons-material/Campaign'; // Icono de campaña
import Image from '../../assets/images/img107.jpg';
import HomeComp from '../HomeComp'; // Componente de inicio
import CartComp from '../CartComp'; // Componente de carrito de compras
import ProfileComp from '../ProfileComp'; // Componente de perfil

// Componentes para mostrar
const Calendar = () => <Box>Calendar</Box>;
const Announcements = () => <Box>Announcements</Box>;

// Componente Home
const Home = () => {
  const navigate = useNavigate(); // Hook de navegación
  const [user, setUser] = useState(null) // Estado para el usuario
  const [value, setValue] = useState(0); // Estado para el valor de la navegación
  const [currentComponent, setCurrentComponent] = useState(<HomeComp />); // Estado para el componente actual

  // Hook de efecto para verificar la autenticación
  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession(); // Obtener la sesión
      const user = await supabase.auth.getUser(); // Obtener el usuario
      console.log(user.data.user.email); // Imprimir el email del usuario

      if (session) {
        console.log(session.data.session.user.email); // Si hay sesión, imprimir el email del usuario
      } else {
        console.log('no hay sesión'); // Si no hay sesión, imprimir un mensaje
      }
    };

    checkAuth(); // Llamar a la función de verificación de autenticación
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        setCurrentComponent(<HomeComp />);
        break;
      case 1:
        setCurrentComponent(<Calendar />);
        break;
      case 2:
        setCurrentComponent(<CartComp />);
        break;
      case 3:
        setCurrentComponent(<Announcements />);
        break;
      case 4:
        setCurrentComponent(<ProfileComp />);
        break;
      default:
        setCurrentComponent(<HomeComp />);
    }
  };

  // Renderizar el componente
  return (
    <Box>
      <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{currentComponent}</Box>
      <BottomNavigation value={value} onChange={handleChange} showLabels sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Calendar" icon={<CalendarTodayIcon />} />
        <BottomNavigationAction label="Shopping" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Announcements" icon={<Campaign />} />
        <BottomNavigationAction label="Profile" icon={<Avatar src={Image} />} />
      </BottomNavigation>
    </Box>
  );
}

export default Home; // Exportar el componente