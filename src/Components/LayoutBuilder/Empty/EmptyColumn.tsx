import React from 'react';
import { Box } from '@mui/material';

const EmptyColumn = () => (
  <Box
    component={'div'}
    style={{
      background: '#fbf0da',
      width: '100%',
      minHeight: '150px',
      height: '100%',
    }}
  >
    <Box
      component={'div'}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '12px',
      }}
    >
      Déposez un composant ici
    </Box>
  </Box>
);

export default EmptyColumn;
