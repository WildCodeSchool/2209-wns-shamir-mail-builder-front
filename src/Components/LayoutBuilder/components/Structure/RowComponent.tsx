import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import {
  GRID,
  GRID2,
  GRID3,
  ROW_COMPONENT } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { addParentComponent, moveParentComponent } from '../../../../features/layout/layoutSlice';
import { resetSelectedComponent, setSelectedComponent } from '../../../../features/sidebar/slidebarSlice';
import Container from './Container';
import DropHere from '../DropHere';

interface DragItem {
  path: number
  id: string
  type: string
}

const rowWrapperStyle = (props: any) => ({
  position: 'relative',
  opacity: props.isDragging ? 0.5 : 1,
  backgroundColor: '#f5f5f5',
  cursor: 'grab',
  ...props.renderPropsState.style,
  padding: `${props.renderPropsState.style.padding}px`,
  margin: '2px 0',
  backgroundImage: props.renderPropsState.style.backgroundImage ? `url(${props.renderPropsState.style.backgroundImage})` : 'none',
  backgroundPositionX: props.renderPropsState.style.backgroundPositionX,
  backgroundPositionY: props.renderPropsState.style.backgroundPositionY,
  height: 'auto',
});

const RowComponent = ({ data, path }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const [hoverPosition, setHoverPosition] = React.useState<string>('');
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    canDrag: true,
    options: undefined,
    previewOptions: undefined,
    type: ROW_COMPONENT,
    item: {
      type: ROW_COMPONENT,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, item }, drop] = useDrop({
    accept: [GRID, GRID2, GRID3, ROW_COMPONENT],
    drop: (item: any) => {
      if (!ref.current) {
        return;
      }
      if (item.type !== ROW_COMPONENT) {
        dispatch(addParentComponent({ item, hoverPosition, path }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
      item: monitor.getItem(),
    }),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }

      // Si l'élement draggé n'est pas un composant ROW existant = (création)
      if (item.type !== ROW_COMPONENT) {
        // Positionne le hover au dessus ou en dessous de l'élément
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

        // Si on est au dessus de la moitié de l'élément
        if (hoverClientY < hoverMiddleY) {
          setHoverPosition('top');
          return;
        }
        // Si on est en dessous de la moitié de l'élément
        setHoverPosition('bottom');
      } else if (item.type === ROW_COMPONENT) { // Si l'item draggé est un composant existant (déplacement)
        const dragIndex = item.path;
        const hoverIndex = path;

        if (dragIndex === hoverIndex) {
          return;
        }

        if (!ref.current) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        dispatch(moveParentComponent({ sourceIndex: dragIndex, destinationIndex: hoverIndex }));

        item.path = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  const handleClickOutside = useCallback((e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    if (e.target !== ref.current && !sidebarOptionsWrapper && isSelected) {
      setIsSelected(false);
      dispatch(resetSelectedComponent());
    }
  }, [isSelected]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  useEffect(() => {
    if (ref.current) {
      setRenderPropsState({
        ...renderPropsState,
        style: {
          ...renderPropsState.style,
          height: ref.current.clientHeight + 2,
        },
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      sx={{
        ...rowWrapperStyle({ renderPropsState, isSelected, isDragging }),
      }}
      component={'div'}
      style={{
        outline: isSelected ? '1px solid #4cb9ea' : '0',
      }}
      className={'row-component'}
      ref={ref}
      onMouseOver={(e) => {
        if (!isSelected) {
          if (e.target === ref.current) {
            ref.current!.style.outline = '1px solid #4cb9ea';
          } else {
            ref.current!.style.outline = '0';
          }
        } else if (e.currentTarget !== ref.current) {
          ref.current!.style.outline = '0';
        } else {
          ref.current!.style.outline = '1px solid #4cb9ea';
        }
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          ref.current!.style.outline = '0';
        }
      }}
      // remove the component on ctrl + click
      onClick={(e) => {
        if (e.ctrlKey) {
          // const newLayout = [...layout];
          // newLayout.splice(path, 1);
          // setLayout(newLayout);
        }
        if (e.target === ref.current) {
          setIsSelected(true);
          dispatch(setSelectedComponent({
            id: data.id,
            path,
            type: ROW_COMPONENT,
            renderProps: renderPropsState,
          }));
        }
      }}
    >
      {
        data.children.map((child: any) => (
          <Container
            key={child.id}
            data={child}
            path={path}
          />
        ))
      }
      {
        isOver && item.type !== ROW_COMPONENT && (
          <DropHere
            hoverPosition={hoverPosition}
          />
        )
      }
    </Box>
  );
};

export default RowComponent;
