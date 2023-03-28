import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box mt={30} ml={60} sx={{ width: '80%', height: '80%' }}>
      <CircularProgress variant="indeterminate" size={60} />
      <Typography>Loading...</Typography>
    </Box>
  );
}
