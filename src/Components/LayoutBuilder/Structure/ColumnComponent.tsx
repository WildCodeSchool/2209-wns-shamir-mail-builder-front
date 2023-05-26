import React, { useCallback, useEffect, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import {
  COLUMN,
  SIDEBAR_BUTTON_ITEM,
  SIDEBAR_IMAGE_ITEM,
  SIDEBAR_ITEM,
  SIDEBAR_SOCIAL_ITEM,
  SIDEBAR_TEXT_ITEM,
} from '../DraggablesSidebar/DraggableBuilderComponentList';
import {
  addNewComponentInColumn,
  clearColumn,
  moveExistChildrenInNewParentComponent,
  moveExistColumnInSameParent,
} from '../../../features/layout/layoutSlice';
import { resetSelectedComponent, setSelectedComponent } from '../../../features/sidebar/slidebarSlice';
// eslint-disable-next-line import/no-cycle
import TextComponent from '../RenderComponents/TextComponent';
// eslint-disable-next-line import/no-cycle
import ImageComponent from '../RenderComponents/ImageComponent';
// eslint-disable-next-line import/no-cycle
import SocialComponent from '../RenderComponents/SocialComponent';
// eslint-disable-next-line import/no-cycle
import ButtonComponent from '../RenderComponents/ButtonComponent';
import ColumnDragOverOverlay from '../Overlay/ColumnDragOverOverlay';
import EmptyColumn from '../Empty/EmptyColumn';
import OverlayComponent from '../Overlay/OverlayComponent';
import { IColumnComponent, IComponent } from '../../../types';

interface IColumnComponentProps {
  data: IColumnComponent
  path: string
  rowTypeGrid: string
}

const renderComponent = (component: IComponent, currentPath: string) => (
  <div>
    {
      component.type === SIDEBAR_TEXT_ITEM ? (
        <TextComponent
          key={component.id}
          data={component}
          path={currentPath}
        />
      ) : component.type === SIDEBAR_IMAGE_ITEM ? (
        <ImageComponent
          key={component.id}
          data={component}
          path={currentPath}
        />
      ) : component.type === SIDEBAR_SOCIAL_ITEM ? (
        <SocialComponent
          key={component.id}
          data={component}
          path={currentPath}
        />
      ) : component.type === SIDEBAR_BUTTON_ITEM ? (
        <ButtonComponent
          key={component.id}
          data={component}
          path={currentPath}
        />
      ) : undefined
    }
  </div>
);

const ColumnComponent = ({ data, path, rowTypeGrid }: IColumnComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const [hoverPosition, setHoverPosition] = React.useState<string | null>('top');
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [over, setOver] = React.useState<boolean>(false);
  const [openRowOptions, setOpenRowOptions] = React.useState<boolean>(false);

  const layout = useSelector((state: any) => state.layout);
  const dispatch = useDispatch();

  const [{ isOver, itemOver }, drop] = useDrop({
    accept: [COLUMN, SIDEBAR_ITEM, SIDEBAR_TEXT_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM, SIDEBAR_BUTTON_ITEM],
    drop: (item: any) => {
      if (!ref.current) {
        return;
      }

      const acceptComponentList = [SIDEBAR_TEXT_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM, SIDEBAR_BUTTON_ITEM];

      if (item.type === SIDEBAR_ITEM) { // Si le composant droppé est un composant vierge
        dispatch(addNewComponentInColumn({ item, hoverPosition, path }));
      } else if (item.path) { // Si le composant droppé est un composant existant
        const dragParentPath = item.path.split('-').slice(0, -1).join('-');
        if (dragParentPath !== path && acceptComponentList.includes(item.type)) {
          dispatch(moveExistChildrenInNewParentComponent({ item, hoverPosition, path }));
        }
        if (item.type === COLUMN) { // Si on drop une colonne sur une colonne pour le déplacement
          const dragParentPath = item.path.split('-')[0];
          const dropParentPath = path.split('-')[0];

          if (dragParentPath !== dropParentPath) {
            alert('You cannot move column to another parent component, wait this awesome feature coming soon!');
          } else {
            dispatch(moveExistColumnInSameParent({ item, hoverPosition, path, initialType: rowTypeGrid }));
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      itemOver: monitor.getItem(),
    }),
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }

      const acceptComponentList = [SIDEBAR_TEXT_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM, SIDEBAR_BUTTON_ITEM];

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (acceptComponentList.includes(item.type) && item.path) {
        const parentPath = path;
        const itemPath = item.path.split('-').slice(0, -1).join('-');
        if (parentPath === itemPath && acceptComponentList.includes(item.type)) {
          setHoverPosition(null);
          return;
        }
        if (parentPath !== itemPath && acceptComponentList.includes(item.type) && data.children.length > 0) {
          if (hoverClientY > hoverMiddleY) {
            setHoverPosition('bottom');
            return;
          } if (hoverClientY < hoverMiddleY) {
            setHoverPosition('top');
            return;
          }
        }
        if (parentPath !== itemPath && acceptComponentList.includes(item.type) && data.children.length === 0) {
          setHoverPosition('top');
          return;
        }
      } else if (acceptComponentList.includes(item.type) && data.children.length < 1) {
        setHoverPosition('top');
        return;
      }

      if (item.type === SIDEBAR_ITEM && hoverClientY > hoverMiddleY) {
        setHoverPosition('bottom');
        return;
      } if (item.type === SIDEBAR_ITEM && hoverClientY < hoverMiddleY) {
        setHoverPosition('top');
        return;
      }

      if (item.type === COLUMN && path.split('-')[1] !== item.path.split('-')[1]) {
        if (hoverClientX < hoverMiddleX) {
          setHoverPosition('left');
        } else if (hoverClientX > hoverMiddleX) {
          setHoverPosition('right');
        }
      } else if (item.type === COLUMN && path.split('-')[1] === item.path.split('-')[1]) {
        setHoverPosition(null);
      }
    },
  });

  // eslint-disable-next-line
  const [_, drag] = useDrag({
    canDrag: true,
    type: COLUMN,
    item: {
      type: data.type,
      id: data.id,
      children: data.children,
      path,
    },
  });

  drag(drop(ref));

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    const materialPopover = target.closest('.MuiPopover-root') || target.closest('.MuiPopper-root');

    if ((target.closest('.draggable-column') !== ref.current && !target.classList.contains('component')) && !materialPopover && !sidebarOptionsWrapper && isSelected && (target.closest('.column-options') !== ref.current?.querySelector('.column-options')) && (target.closest('.column-name') !== ref.current?.querySelector('.column-name'))) {
      setOver(false);
      setIsSelected(false);
      setOpenRowOptions(false);
      dispatch(resetSelectedComponent());
    }
  }, [isSelected]);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target.parentNode === ref.current || target.parentNode?.parentNode === ref.current || target.closest('.column-options') || target.closest('.column-name')) {
        setOver(true);
        ref.current!.style.outline = '1px solid #ebb644';
      } else {
        setOver(false);
        ref.current!.style.outline = '0';
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      setOver(false);
      setOpenRowOptions(false);
      if (!data.children.length) {
        ref.current!.style.outline = '1px dashed #ebb644';
      } else {
        ref.current!.style.outline = '0';
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.parentNode === ref.current || target.parentNode?.parentNode === ref.current || target === ref.current || target.closest('.column-options') || target.closest('.column-name')) {
      if (!isSelected) {
        setIsSelected(true);
        dispatch(setSelectedComponent({
          id: data.id,
          type: COLUMN,
          renderProps: renderPropsState,
          path,
        }));
      }
    } else {
      setOver(false);
      setOpenRowOptions(false);
      setIsSelected(false);
    }
  };

  const handleOpenColumnOptions = useCallback((isColumnOptionsOpen: boolean) => {
    setOpenRowOptions(isColumnOptionsOpen);
  }, [openRowOptions]);

  const handleClearColumn = useCallback(() => {
    dispatch(clearColumn({
      path,
    }));
  }, [path]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelected]);

  useEffect(() => {
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  return (
    <Box
      component={'div'}
      ref={ref}
      style={{
        ...renderPropsState.style,
        [layout[path.split('-')[0]].children[0].children.filter((el: any) => el.children.length).length < 1 ? 'minHeight' : 'height']: layout[path.split('-')[0]].children[0].children.filter((el: any) => el.children.length).length < 1 ? '150px' : 'auto',
        position: 'relative',
        outline: isSelected ? '1px solid #ebb644' : data.children.length ? 'none' : '1px dashed #ebb644',
        flexBasis: renderPropsState.style.flexBasis,
        minWidth: 'inherit',
        padding: data.children.length ? '0px 4px' : '0',
        backgroundColor: renderPropsState.style.backgroundColor,
        borderStyle: renderPropsState.style.borderStyle,
        borderColor: renderPropsState.style.borderColor,
        borderWidth: `${renderPropsState.style.borderWidth}px`,
        borderRadius: `${renderPropsState.style.borderRadius}px`,
        paddingTop: `${renderPropsState.style.paddingTop}px`,
        paddingRight: `${renderPropsState.style.paddingRight}px`,
        paddingBottom: `${renderPropsState.style.paddingBottom}px`,
        paddingLeft: `${renderPropsState.style.paddingLeft}px`,
      }}
      className="draggable-column"
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleClick(e)}
    >
      {
        data.children.length ? data.children.map((component, index: number) => {
          const currentPath = `${path}-${index}`;
          return (
            <div key={component.id}>
              {renderComponent(component, currentPath)}
            </div>
          );
        }) : (
          <EmptyColumn />
        )
      }

      {
        isOver && hoverPosition && (
          <ColumnDragOverOverlay
            type={itemOver.type}
            hoverPosition={hoverPosition}
          />
        )
      }

      {
        (over || isSelected) && (
          <OverlayComponent
            isOptionsOpen={openRowOptions}
            handleOpenOptions={handleOpenColumnOptions}
            handleDelete={handleClearColumn}
            path={path}
            type={data.type}
            showLabel
            label={'Colonne'}
          />
        )
      }
    </Box>
  );
};

export default ColumnComponent;
