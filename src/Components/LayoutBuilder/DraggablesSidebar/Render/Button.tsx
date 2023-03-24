import React from 'react';
import { styled } from '@mui/material/styles';
import Iconify from '../../../Iconify';

const ButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: '1px solid #c39d63',
  padding: '2rem',
  borderRadius: '4px',
  maxWidth: '100%',
});
const Button = () => (
  <ButtonWrapper
    title={'Bouton'}
  >
    <Iconify
      icon="mdi:button-cursor"
      sx={{ color: '#c39d63', fontSize: '1.3rem' }}
    />

  </ButtonWrapper>
);

export default Button;
