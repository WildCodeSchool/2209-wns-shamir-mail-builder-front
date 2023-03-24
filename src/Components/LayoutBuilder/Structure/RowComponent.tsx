import React, { useCallback, useEffect, useRef } from 'react';
import { DragPreviewImage, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import {
  GRID,
  GRID2, GRID2_1_3_L, GRID2_1_3_R,
  GRID3,
  ROW_COMPONENT,
} from '../DraggablesSidebar/DraggableBuilderComponentList';
import {
  addParentComponent, deleteRowComponent, duplicateRowComponent,
  moveParentComponent,
} from '../../../features/layout/layoutSlice';
import { resetSelectedComponent, setSelectedComponent } from '../../../features/sidebar/slidebarSlice';
// eslint-disable-next-line import/no-cycle
import Container from './Container';
import DropHere from '../DropHere';
import OverlayComponent from '../Overlay/OverlayComponent';
import { DragItem, IContainer, IRowComponent } from '../../../types';

interface IRowComponentProps {
  data: IRowComponent
  path: number
}

const RowComponent = ({ data, path }: IRowComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const [hoverPosition, setHoverPosition] = React.useState<string>('');
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [over, setOver] = React.useState<boolean>(false);
  const [openRowOptions, setOpenRowOptions] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const layout = useSelector((state: any) => state.layout);

  const [{ isDragging }, drag, connectDragPreview] = useDrag({
    canDrag: true,
    type: ROW_COMPONENT,
    item: {
      id: data.id,
      type: ROW_COMPONENT,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: [GRID, GRID2, GRID3, GRID2_1_3_R, GRID2_1_3_L, ROW_COMPONENT],
    drop: (item: DragItem) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.path;
      const hoverIndex = path;

      if (item.type !== ROW_COMPONENT) {
        dispatch(addParentComponent({ item, hoverPosition, path }));
      } else if (item.type === ROW_COMPONENT && dragIndex !== hoverIndex) {
        dispatch(moveParentComponent({ sourceIndex: dragIndex, destinationIndex: hoverIndex, hoverPosition }));
      }
    },
    collect: (monitor: DropTargetMonitor<DragItem, void>) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: DragItem, monitor:DropTargetMonitor<DragItem, void>) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.path;
      const hoverIndex = path;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex !== hoverIndex) {
        if (hoverClientY < hoverMiddleY) {
          setHoverPosition('top');
          return;
        }
        setHoverPosition('bottom');
      }
    },
  });

  drag(drop(ref));

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    const materialPopover = target.closest('.MuiPopover-root');
    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !materialPopover && (!target.closest('.row-options') || target.closest('.row-options') !== ref.current?.querySelector('.row-options')) && (!target.closest('.row-name') || target.closest('.row-name') !== ref.current?.querySelector('.row-name')) && ((target.classList.contains('container') && target.closest('.row-component') !== ref.current) || target.closest('.row-component') !== ref.current)) {
      setIsSelected(false);
      setOver(false);
      setOpenRowOptions(false);
      dispatch(resetSelectedComponent());
    }
  }, [isSelected]);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target === ref.current!.firstChild || target.closest('.row-options') || target.closest('.row-name')) {
        setOver(true);
        ref.current!.style.outline = '1px solid #ebb644';
      } else {
        setOver(false);
        ref.current!.style.outline = '0';
      }
    } else if (e.currentTarget !== ref.current) {
      ref.current!.style.outline = '0';
      setOver(false);
    } else {
      setOver(true);
      ref.current!.style.outline = '1px solid #ebb644';
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      setOver(false);
      setOpenRowOptions(false);
      ref.current!.style.outline = '0';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target === ref.current || target === ref.current!.firstChild || target.closest('.row-options') || target.closest('.row-name')) {
      if (!isSelected) {
        setIsSelected(true);
        dispatch(setSelectedComponent({
          id: data.id,
          type: ROW_COMPONENT,
          path,
          columnCount: data.children[0].children.length,
          typeGrid: data.children[0].typeGrid,
          renderProps: layout[path].children[0].renderProps,
        }));
      }
    } else {
      setIsSelected(false);
      setOpenRowOptions(false);
      setOver(false);
    }
  };

  const handleOpenRowOptions = useCallback((isRowOptionsOpen: boolean) => {
    setOpenRowOptions(isRowOptionsOpen);
  }, [openRowOptions]);

  const handleDeleteRow = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Etes vous sûr de vouloir supprimer cette ligne ?')) {
      dispatch(deleteRowComponent({ path }));
      dispatch(resetSelectedComponent());
    }
    return false;
  }, [path]);

  const handleDuplicateRow = useCallback(() => {
    dispatch(duplicateRowComponent({ data, path }));
  }, [data, path]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  return (
    <>
      <DragPreviewImage src={data.children[0].children[0].preview} connect={connectDragPreview} />
      <Box
        component={'div'}
        style={{
          ...renderPropsState.style,
          position: 'relative',
          height: 'auto',
          paddingBottom: `${renderPropsState.style.paddingBottom}px`,
          paddingTop: `${renderPropsState.style.paddingTop}px`,
          backgroundImage: `url(${renderPropsState.style.backgroundUrl})`,
          backgroundSize: `${renderPropsState.style.backgroundSize}`,
          backgroundPosition: `${renderPropsState.style.backgroundPosition}`,
          backgroundRepeat: `${renderPropsState.style.backgroundRepeat}`,
          borderWidth: `${renderPropsState.style.borderWidth}px`,
          borderRadius: `${renderPropsState.style.borderRadius}px`,
          borderColor: `${renderPropsState.style.borderColor}`,
          borderStyle: `${renderPropsState.style.borderStyle}`,
          outline: isSelected ? '1px solid #ebb644' : '0',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        className={'row-component'}
        ref={ref}
        onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => handleMouseOver(e)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {
          data.children.map((child: IContainer) => (
            <Container
              key={child.id}
              data={child}
              path={path}
            />
          ))
        }

        {
          isOver && hoverPosition !== '' && (
            <DropHere
              hoverPosition={hoverPosition}
            />
          )
        }

        {
          (over || isSelected) && (
            <OverlayComponent
              handleOpenOptions={handleOpenRowOptions}
              handleDelete={handleDeleteRow}
              handleDuplicate={handleDuplicateRow}
              isOptionsOpen={openRowOptions}
              path={path}
              label={'Ligne'}
              type={data.type}
            />
          )
        }
      </Box>
    </>
  );
};

export default RowComponent;
