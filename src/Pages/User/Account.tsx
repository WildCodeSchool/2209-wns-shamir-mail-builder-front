import { Container, Typography } from '@mui/material';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';

export default function UserAccount() {
  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Account.js
        </Typography>
      </Container>
    </ContentStyle>
  );
}
