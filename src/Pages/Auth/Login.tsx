import React from 'react';
import { Container, Typography } from '@mui/material';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function Login() {
  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Connexion
        </Typography>
        <LoginForm />
      </Container>
    </ContentStyle>
  );
}
