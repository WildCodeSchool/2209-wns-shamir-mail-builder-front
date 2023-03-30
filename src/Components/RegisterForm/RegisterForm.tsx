import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { isEmailInValid, isPhoneNumberInValid } from '../../helpers';

type HandleSignUp = (username: string, password: string, email: string, phone: string) => void;

interface IRegisterFormProps {
  handleSignUp: HandleSignUp;
}

interface FormData {
  username: string
  email: string
  password: string
  phone: string
}

export default function RegisterForm({ handleSignUp }: IRegisterFormProps) {
  const [state, setState] = useState<FormData>({
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleSignUp(state.username, state.password, state.email, state.phone);
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
        error={isEmailInValid(state.email)}
        helperText={isEmailInValid(state.email) ? 'Adresse mail invalide' : ''}
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
        error={isPhoneNumberInValid(state.phone)}
        helperText={isPhoneNumberInValid(state.phone) ? 'Numéro invalide' : ''}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={(e) => handleSubmit(e)}
      >
        Valider
      </Button>
    </Box>
  );
}
