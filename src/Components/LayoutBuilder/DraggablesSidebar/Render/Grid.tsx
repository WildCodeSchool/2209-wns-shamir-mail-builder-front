import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { GRID2_1_3_L, GRID2_1_3_R } from '../DraggableBuilderComponentList';

const GridWrapper = styled('div')({
  display: 'flex',
  outline: '1px solid #c39d63',
  borderRadius: '4px',
  flexBasis: '100%',
});
const Grid = ({ col, type }: { col: number, type: string }) => (
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
          height: '45px',
          borderRight: index === col - 1 ? '0' : '1px solid #c39d63',
          flexBasis: (type === GRID2_1_3_L && index === 1) ? 'calc(100% / 3)' : (type === GRID2_1_3_R && index === 0) ? 'calc(100% / 3)' : undefined,
        }}
      />
    ))}
  </GridWrapper>
);

export default Grid;
