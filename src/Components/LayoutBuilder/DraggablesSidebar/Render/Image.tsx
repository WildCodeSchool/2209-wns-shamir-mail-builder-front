import React from 'react';
import { styled } from '@mui/material/styles';
import Iconify from '../../../Iconify';

const ImageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: '1px solid #c39d63',
  padding: '2rem',
  borderRadius: '4px',
  maxWidth: '100%',
});
const Image = () => (
  <ImageWrapper
    title={'Image'}
  >
    <Iconify icon="fa-solid:image" sx={{ color: '#c39d63', fontSize: '1.3rem' }} />
  </ImageWrapper>
);

export default Image;
