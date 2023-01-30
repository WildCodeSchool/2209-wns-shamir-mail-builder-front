import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContentStyle } from '../../../layouts/Main/UserLayoutConfig';

export default function StripeSuccess() {
  return (
    <ContentStyle>
      <Container>
        <Typography>Thanks for your subscription, enjoy our tool!</Typography>
        <Link to="/">Back to Home page</Link>
      </Container>
    </ContentStyle>
  );
}
