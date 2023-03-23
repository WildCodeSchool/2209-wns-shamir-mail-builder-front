import React from 'react';
import { Box } from '@mui/material';
import Iconify from '../../Iconify';

const EmptySocial = () => (
  <Box
    component={'div'}
    style={{
      background: '#fbf0da',
      width: '100%',
      minHeight: '150px',
      height: '100%',
      outline: '1px dashed #ebb644',
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
      Ajouter de nouveaux réseaux sociaux
      <Iconify
        icon={'mdi:plus'}
        style={{
          fontSize: '20px',
          color: '#ebb644',
        }}
      />
    </Box>
  </Box>
);

export default EmptySocial;
