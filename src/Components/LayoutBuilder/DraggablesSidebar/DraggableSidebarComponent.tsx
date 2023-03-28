import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import {
  GRID,
  GRID2, GRID2_1_3_L, GRID2_1_3_R,
  GRID3, SIDEBAR_BUTTON_ITEM,
  SIDEBAR_IMAGE_ITEM,
  SIDEBAR_SOCIAL_ITEM,
  SIDEBAR_TEXT_ITEM,
} from './DraggableBuilderComponentList';
import Grid from './Render/Grid';
import Text from './Render/Text';
import Image from './Render/Image';
import Social from './Render/Social';
import Button from './Render/Button';

const DraggableSidebarComponent = ({ data }: { data: any }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [{ opacity }, drag, preview] = useDrag({
    canDrag: true,
    type: data.type,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }, [data]);

  const renderComponent = (data: any) => {
    switch (data.component.type) {
      case GRID:
      case GRID2:
      case GRID3:
      case GRID2_1_3_L:
      case GRID2_1_3_R:
        return <Grid col={data.type === GRID2 ? 2 : data.type === GRID3 ? 3 : data.type === GRID2_1_3_L || data.type === GRID2_1_3_R ? 2 : 1} type={data.type} />;
      case SIDEBAR_TEXT_ITEM:
        return <Text />;
      case SIDEBAR_IMAGE_ITEM:
        return <Image />;
      case SIDEBAR_SOCIAL_ITEM:
        return <Social />;
      case SIDEBAR_BUTTON_ITEM:
        return <Button />;
      default:
        return (
          <Box component={'div'} className="sideBarItem" ref={drag} sx={{ opacity }}>
            <Box component={'div'} className="text">
              <Typography
                variant={'inherit'}
              >
                {data.component.type}
              </Typography>
            </Box>
          </Box>
        );
    }
  };

  drag(ref);

  return (
    <Box
      ref={ref}
      sx={{
        opacity,
        '&:hover': {
          cursor: 'move',
        },
      }}
    >
      <DragPreviewImage connect={preview} src={data.component.preview} />
      {renderComponent(data)}
    </Box>
  );
};

export default DraggableSidebarComponent;
