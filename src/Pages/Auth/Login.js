import { Container, Typography } from '@mui/material';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';

export default function Login() {
  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Login.js
        </Typography>
      </Container>
    </ContentStyle>
  );
}
