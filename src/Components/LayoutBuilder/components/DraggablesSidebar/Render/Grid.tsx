import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const GridWrapper = styled('div')({
  display: 'flex',
  outline: '1px solid #4cb9ea',
  borderRadius: '4px',
  flexBasis: '100%',
});
const Grid = ({ col }: any) => (
  <GridWrapper
    title={
        `Grille de ${col} colonne${col > 1 ? 's' : ''}`
      }
  >
    {[...Array(col)].map((_, index) => (
      <Box
        component={'div'}
        key={`grid_item-${Math.random()}`}
        style={{
          flexGrow: 1,
          height: '34px',
          borderRight: index === col - 1 ? '0' : '1px solid #4cb9ea',
        }}
      />
    ))}
  </GridWrapper>
);

export default Grid;
