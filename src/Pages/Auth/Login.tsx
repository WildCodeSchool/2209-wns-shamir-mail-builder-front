import { useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import LoginForm from '../../Components/LoginForm/LoginForm';

export const GET_TOKEN = gql`
mutation GetToken($email: String!, $password: String!){
  getToken(email: $email, password: $password)
}`;

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggingIn, { loading, error }] = useMutation(GET_TOKEN, {
    onCompleted: (data) => {
      if (data.getToken) {
        setIsLoggedIn(!isLoggedIn);
      }
    },
  });
  if (loading) return <CircularProgress color="secondary" />;
  if (error) {
    return (
      <Typography>
        Error!
        `
        $
        {error.message}
        `
      </Typography>
    );
  }

  const handleLogin = (email: string, password: string) => {
    loggingIn({ variables: { email, password } });
  };
  console.log(isLoggedIn);
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
