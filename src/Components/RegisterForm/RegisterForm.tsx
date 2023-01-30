import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function RegisterForm() {
  const [state, setState] = useState<Object>({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e: any) => {
    const { value } = e.target;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 400,
      }}
    >
      <TextField
        required
        id="outlined-required-1"
        label="Nom d'utilisateur"
        InputLabelProps={{
          shrink: true,
        }}
        name="username"
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined-required-2"
        label="Adresse mail"
        placeholder="pierre.durand@gmail.com"
        InputLabelProps={{
          shrink: true,
        }}
        name="email"
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        name="password"
        onChange={handleChange}
      />
      <TextField
        id="outlined-number"
        label="Téléphone"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        name="phone"
        onChange={handleChange}
      />
      <Button variant="contained">Valider</Button>
    </Box>
  );
}
