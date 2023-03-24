import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContentStyle } from '../../../layouts/Main/UserLayoutConfig';

export default function StripeCancel() {
  return (
    <ContentStyle>
      <Container>
        <Typography>
          La prochaine fois, abonnez-vous pour profiter au maximum de notre outil!
        </Typography>
        <Link to="/">Back to Home page</Link>
      </Container>
    </ContentStyle>
  );
}
