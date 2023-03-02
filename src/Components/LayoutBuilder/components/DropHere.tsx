import React from 'react';
import { Box } from '@mui/material';

const DropHere = ({ hoverPosition }: {
  hoverPosition: string | undefined;
}) => (
  <Box
    component={'div'}
    sx={{
      position: 'absolute',
      [hoverPosition || 'top']: '-1px',
      left: 0,
      right: 0,
      background: '#B0E0E6',
      height: '2px',
      zIndex: 1000,
    }}
  >
    <Box
      component={'span'}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '-10px',
        transform: 'translateX(-50%)',
        padding: '7px',
        background: '#B0E0E6',
        borderRadius: '5px',
        fontSize: '12px',
      }}
    >
      Déposer ici
    </Box>
  </Box>
);

export default DropHere;
