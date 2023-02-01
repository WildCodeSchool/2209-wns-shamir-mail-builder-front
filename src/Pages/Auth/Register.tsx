import { useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';

export const CREATE_ACCOUNT = gql`
mutation CreateUser($username: String!, $password: String!, $email: String!, $phone: String!){
  createUser(username: $username, password: $password, email: $email, phone: $phone) {
    username
    phone
    email
  }
}`;

export default function Register() {
  const navigate = useNavigate();
  const [signUp, { loading, error }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: () => {
      navigate('/auth/login');
    },
  });
  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography>
        Error !
      </Typography>
    );
  }

  const handleSignUp = (username: string, password: string, email: string, phone: string) => {
    signUp({ variables: { username, password, email, phone } });
  };

  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Création de compte
        </Typography>
        <RegisterForm handleSignUp={handleSignUp} />
      </Container>
    </ContentStyle>
  );
}
