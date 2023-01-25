import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContentStyle } from '../../../layouts/Main/UserLayoutConfig';

export default function StripeCancel() {
  return (
    <ContentStyle>
      <Container>
        <Typography>Next time, subscribe for a full access to our tool!</Typography>
        <Link to="/">Back to Home page</Link>
      </Container>
    </ContentStyle>
  );
}
