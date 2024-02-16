import { Routes, Route, useNavigate } from 'react-router-dom';
import {CssBaseline} from '@mui/material';
import { supabase } from './services/client';
// import { Home } from './components/';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Verification from './components/Verification';
import Pruebas from './components/Pruebas';
import { useEffect } from 'react';

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
        <Route path="*" element={<NotFound />} />
        <Route path="/pruebas" element={<Pruebas />} />
      </Routes>
    </>
  );
}

export default App;