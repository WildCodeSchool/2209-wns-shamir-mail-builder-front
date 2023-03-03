import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import {
  GRID,
  GRID2,
  GRID3,
  SIDEBAR_IMAGE_ITEM,
  SIDEBAR_SOCIAL_ITEM,
  SIDEBAR_TEXT_ITEM,
} from './DraggableBuilderComponentList';
import Grid from './Render/Grid';
import Text from './Render/Text';
import Image from './Render/Image';
import Social from './Render/Social';

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
        return <Grid col={data.type === GRID2 ? 2 : data.type === GRID3 ? 3 : 1} />;
      case SIDEBAR_TEXT_ITEM:
        return <Text />;
      case SIDEBAR_IMAGE_ITEM:
        return <Image />;
      case SIDEBAR_SOCIAL_ITEM:
        return <Social />;
      default:
        return (
          <Box component={'div'} className="sideBarItem" ref={drag} sx={{ opacity }}>
            <Box component={'div'} className="text">
              <Typography
                variant={'inherit'}
              >
                Text
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
