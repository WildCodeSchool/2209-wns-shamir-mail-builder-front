import React from 'react';
import { styled } from '@mui/material/styles';
import Iconify from '../../../../Iconify';

const ImageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: '1px solid #4cb9ea',
  padding: '2rem',
  borderRadius: '4px',
  maxWidth: '100%',
});
const Image = () => (
  <ImageWrapper
    title={'Image'}
  >
    <Iconify icon="fa-solid:image" sx={{ color: '#4cb9ea', fontSize: '1.3rem' }} />
  </ImageWrapper>
);

export default Image;
