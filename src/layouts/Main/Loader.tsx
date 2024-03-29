import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{ width: '80%', height: '80%', m: 'auto' }}>
      <CircularProgress variant="indeterminate" size={60} />
      <Typography>Loading...</Typography>
    </Box>
  );
}
