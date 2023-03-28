import React from 'react';
import { Box } from '@mui/material';
import Iconify from '../../Iconify';

const EmptyImage = () => (
  <Box
    component="div"
    style={{
      background: '#ebb64433',
      width: 'calc(100%)',
      height: '100%',
    }}
  >
    <Box
      component={'div'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '12px',
      }}
    >
      Choisir une image
      <Iconify
        icon="bx:bx-image-add"
        style={{
          fontSize: '30px',
          color: '#ebb644',
        }}
      />
    </Box>
  </Box>
);

export default EmptyImage;
