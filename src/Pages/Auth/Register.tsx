import { Container, Typography } from '@mui/material';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';

export default function Register() {
  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Création de compte
        </Typography>
        <RegisterForm />
      </Container>
    </ContentStyle>
  );
}
