import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';

export default function Account() {
  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Box sx={{ pt: 3, mt: 12 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Account
          </Typography>
        </Box>
      </Container>
    </ContentStyle>
  );
}
