import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { GRID, GRID2, GRID2_1_3_L, GRID2_1_3_R, GRID3 } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { addParentComponent } from '../../../features/layout/layoutSlice';

const EmptyLayout = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const layout = useSelector((state: any) => state.layout);
  const dispatch = useDispatch();

  const path = 0;

  const [{ isOver }, drop] = useDrop({
    accept: [GRID, GRID2, GRID3, GRID2_1_3_L, GRID2_1_3_R],
    drop: (item: any) => {
      if (!ref.current) {
        return;
      }
      dispatch(addParentComponent({ item, hoverPosition: 'top', layout, path }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(ref);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        position: 'relative',
      }}
      ref={ref}
    >
      {
        isOver && (
          <Box
            component={'div'}
            sx={{
              position: 'absolute',
              top: '-1px',
              left: 0,
              right: 0,
              background: '#ebb644',
              height: '2px',
              zIndex: 1000,
            }}
          >
            <Box
              component={'span'}
              style={{
                position: 'absolute',
                left: '50%',
                top: '-10px',
                transform: 'translateX(-50%)',
                padding: '7px',
                background: '#ebb644',
                borderRadius: '5px',
                fontSize: '12px',
                zIndex: 10,
                color: '#fff',
              }}
            >
              Déposer ici
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default EmptyLayout;
