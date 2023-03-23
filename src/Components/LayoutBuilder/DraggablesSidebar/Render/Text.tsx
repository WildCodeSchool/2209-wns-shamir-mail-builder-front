import React from 'react';
import { styled } from '@mui/material/styles';
import Iconify from '../../../Iconify';

const TextWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: '1px solid #c39d63',
  padding: '2rem',
  borderRadius: '4px',
  maxWidth: '100%',
});

const Text = () => (
  <TextWrapper
    title={'Texte'}
  >
    <Iconify icon="fa-solid:font" sx={{ color: '#c39d63', fontSize: '1.3rem' }} />
  </TextWrapper>
);

export default Text;
