import { Container, Typography } from '@mui/material';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';

export default function HomeBuilder() {
  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          HomeBuilder.js
        </Typography>
      </Container>
    </ContentStyle>
  );
}
