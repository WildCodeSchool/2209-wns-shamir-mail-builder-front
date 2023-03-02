import { Box } from '@mui/material';
import { DRAGGABLE_COMPONENTS, GRID, GRID2, GRID3 } from './DraggableBuilderComponentList';
import DraggableSidebarComponent from './DraggableSidebarComponent';

const DraggablesComponentList = () => (
  <>
    {Object.values(DRAGGABLE_COMPONENTS).map((componentDraggable, index) => (
      <Box
        key={`${componentDraggable.id + index + componentDraggable.component.type}`}
        style={{
          marginBottom: index === Object.values(DRAGGABLE_COMPONENTS).length - 1 ? '0' : '1rem',
          flexBasis: componentDraggable.component.type === GRID || componentDraggable.component.type === GRID2 || componentDraggable.component.type === GRID3 ? '100%' : 'calc(50% - 2.5%)',
          flexGrow: 1,
        }}
      >
        <DraggableSidebarComponent data={componentDraggable} />
      </Box>
    ))}
  </>
);
export default DraggablesComponentList;
