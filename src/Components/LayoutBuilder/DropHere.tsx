import React from 'react';
import { Box } from '@mui/material';

const DropHere = ({ hoverPosition }: {
  hoverPosition: string;
}) => (
  <Box
    component={'div'}
    sx={{
      position: 'absolute',
      [hoverPosition || 'top']: '-1px',
      left: 0,
      right: 0,
      background: '#ebb644',
      height: '2px',
      zIndex: 1000,
    }}
  >
    <Box
      component={'span'}
      sx={{
        position: 'absolute',
        left: '50%',
        top: '-16px',
        transform: 'translateX(-50%)',
        padding: '7px',
        background: '#ebb644',
        borderRadius: '5px',
        fontSize: '12px',
        color: '#fff',
        zIndex: 1000,
      }}
    >
      Déposer ici
    </Box>
  </Box>
);

export default DropHere;
