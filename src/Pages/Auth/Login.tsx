import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import LoginForm from '../../Components/LoginForm/LoginForm';

export const GET_TOKEN = gql`
mutation GetToken($email: String!, $password: String!){
  getToken(email: $email, password: $password)
}`;

export default function Login() {
  const navigate = useNavigate();
  const [loadToken] = useMutation(GET_TOKEN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.getToken);
      navigate('/app/home');
    },
  });

  const handleLogin = (email: string, password: string) => {
    loadToken({ variables: { email, password } });
  };

  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Connexion
        </Typography>
        <LoginForm
          handleLogin={handleLogin}
        />
      </Container>
    </ContentStyle>
  );
}
