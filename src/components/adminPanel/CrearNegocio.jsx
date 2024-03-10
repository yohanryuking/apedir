import React, { useEffect, useState } from 'react';
import logo from '../../../src/assets/images/img107.jpg'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from '@mui/material';
import {supabase} from '../../services/client'

const CrearNegocio = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [fotoPortada, setFotoPortada] = useState('');
  const [provincia, setProvincia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [categoria, setCategoria] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horarios, setHorarios] = useState('');
  const [tieneDelivery, setTieneDelivery] = useState(false);
  const [redesSociales, setRedesSociales] = useState('');

  const [user, setUser] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  useEffect(()=>{
    const getUser= ()=>{
      const user = supabase.auth.getUser();
      setUser(user.data.user);
    }
  }, [])

  useEffect(()=>{
    
  }, [user])


  return (
    <>
    <img src={logo} alt="" />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre del negocio"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Foto de perfil"
              value={fotoPerfil}
              onChange={(e) => setFotoPerfil(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Foto de portada"
              value={fotoPortada}
              onChange={(e) => setFotoPortada(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Número de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <MenuItem value="categoria1">Categoría 1</MenuItem>
                <MenuItem value="categoria2">Categoría 2</MenuItem>
                <MenuItem value="categoria3">Categoría 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Horarios"
              value={horarios}
              onChange={(e) => setHorarios(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={tieneDelivery}
                  onChange={(e) => setTieneDelivery(e.target.checked)}
                />
              }
              label="Tiene delivery"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Enlaces a redes sociales"
              value={redesSociales}
              onChange={(e) => setRedesSociales(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Crear negocio
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CrearNegocio;
