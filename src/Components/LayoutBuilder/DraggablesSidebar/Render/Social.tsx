import React from 'react';
import { styled } from '@mui/material/styles';
import Iconify from '../../../Iconify';

const SocialWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: '1px solid #c39d63',
  padding: '2rem',
  borderRadius: '4px',
  maxWidth: '100%',
});
const Image = () => (
  <SocialWrapper
    title={'Réseaux sociaux'}
  >
    <Iconify icon="fa-brands:facebook" sx={{ color: '#c39d63', fontSize: '1.3rem' }} />
  </SocialWrapper>
);

export default Image;
