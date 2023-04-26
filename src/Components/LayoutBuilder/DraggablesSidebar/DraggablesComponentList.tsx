import { Box, Typography } from '@mui/material';
import {
  DRAGGABLE_COMPONENTS,
  GRID,
  GRID2,
  GRID2_1_3_L,
  GRID2_1_3_R,
  GRID3,
} from './DraggableBuilderComponentList';
import DraggableSidebarComponent from './DraggableSidebarComponent';

const DraggablesComponentList = () => (
  <Box>
    <Typography
      variant={'h6'}
      sx={{
        marginBottom: '1rem',
      }}
    >
      Blocs
    </Typography>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0 10px',
      }}
    >
      {Object.values(DRAGGABLE_COMPONENTS).map((componentDraggable, index) => (
        <Box
          key={`${componentDraggable.id + index + componentDraggable.component.type}`}
          style={{
            marginBottom: index === Object.values(DRAGGABLE_COMPONENTS).length - 1 ? '0' : '1rem',
            flexBasis: componentDraggable.component.type === GRID || componentDraggable.component.type === GRID2 || componentDraggable.component.type === GRID3 || componentDraggable.component.type === GRID2_1_3_L || componentDraggable.component.type === GRID2_1_3_R ? '100%' : 'calc(50% - 2.5%)',
            flexGrow: 1,
          }}
        >
          <DraggableSidebarComponent data={componentDraggable} />
        </Box>
      ))}
    </Box>
  </Box>
);
export default DraggablesComponentList;
