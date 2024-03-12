import { Routes, Route, useNavigate } from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import { supabase } from './services/client';
// import { Home } from './components/';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Verification from './components/pages/Verification';
import Pruebas from './components/pages/Pruebas';
import Register from './components/pages/Register';
import BusinesNotFound from './components/adminPanel/BusinesNotFound';
import PersonalProfile from './components/PersonalProfile';
import BusinessProfile from './components/BusinessProfile';
import CrearNegocio from './components/adminPanel/CrearNegocio';
import Planes from './components/adminPanel/Planes';
import { useEffect } from 'react';
import TablaVentas from './components/adminPanel/tableVentas';
import './App.css';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        console.log('no hay sesión');
        navigate('/login');
      }else{
        console.log('hay sesión');    
        // navigate('/');
      }
    })
    // navigate('/pruebas');

  }, []);

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PersonalProfile />} />
        <Route path="/plans" element={<Planes />} />
        <Route path="/profile/business" element={<BusinesNotFound />} />
        <Route path="/profile/business/create" element={<CrearNegocio />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pruebas" element={<Planes />} />
      </Routes>
    </>
  );
}

export default App;
