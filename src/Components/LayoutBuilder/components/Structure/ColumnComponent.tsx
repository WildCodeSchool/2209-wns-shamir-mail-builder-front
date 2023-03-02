import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  COLUMN,
  PARENT_COMPONENT,
  SIDEBAR_IMAGE_ITEM,
  SIDEBAR_ITEM, SIDEBAR_SOCIAL_ITEM, SIDEBAR_TEXT_ITEM,
} from '../DraggablesSidebar/DraggableBuilderComponentList';
import {
  addNewComponentInColumn,
  LayoutState,
  moveExistChildrenInNewParentComponent, moveExistColumnInSameParent,
} from '../../../../features/layout/layoutSlice';
import { resetSelectedComponent, setSelectedComponent } from '../../../../features/sidebar/slidebarSlice';
import TextComponent from '../RenderComponents/TextComponent';
import ImageComponent from '../RenderComponents/ImageComponent';
import SocialComponent from '../RenderComponents/SocialComponent';

const ColumnComponent = ({ data, renderProps }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderPropsState, setRenderPropsState] = React.useState(renderProps);
  const [hoverPosition, setHoverPosition] = React.useState<string | null>('top');
  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  const layout = useSelector((state: any) => state.layout);
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: [COLUMN, SIDEBAR_ITEM, SIDEBAR_TEXT_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM],
    drop: (item: any) => {
      if (!ref.current) {
        return;
      }

      const acceptComponentList = [SIDEBAR_TEXT_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM];

      if (item.type === SIDEBAR_ITEM) {
        dispatch(addNewComponentInColumn({ item, hoverPosition, path: data.path }));
      }

      if (item.type !== PARENT_COMPONENT && !item.path) {
        // setLayout(appendNewChildrenInParentComponent(item, monitor, hoverPosition, layout, data.path));
      } else if (item.type !== PARENT_COMPONENT && item.path) {
        const dragParentPath = item.path.split('-').slice(0, -1).join('-');
        const dropParentPath = data.path;
        if (dragParentPath !== dropParentPath && acceptComponentList.includes(item.type)) {
          dispatch(moveExistChildrenInNewParentComponent({ item, hoverPosition, path: data.path }));
        }
        if (item.type === COLUMN) {
          const dragParentPath = item.path.split('-')[0];
          const dropParentPath = data.path.split('-')[0];

          if (dragParentPath !== dropParentPath) {
            alert('You can not move column to another parent component, wait this awesome feature coming soon!');
            // dispatch(moveExistColumnInNewParentComponent({item, hoverPosition, path: data.path}));
          } else if (dragParentPath === dropParentPath) {
            dispatch(moveExistColumnInSameParent({ item, hoverPosition, path: data.path }));
          }
          // setLayout(moveExistingColumn(item, data, hoverPosition, layout, data.path));
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      const acceptComponentList = [SIDEBAR_TEXT_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM];

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (acceptComponentList.includes(item.type) && item.path) {
        const parentPath = data.path;
        const itemPath = item.path.split('-').slice(0, -1).join('-');

        if (parentPath === itemPath && acceptComponentList.includes(item.type)) {
          setHoverPosition(null);
          return;
        } if (parentPath !== itemPath && acceptComponentList.includes(item.type) && data.children.length > 0) {
          if (hoverClientY > hoverMiddleY) {
            setHoverPosition('bottom');
            return;
          } if (hoverClientY < hoverMiddleY) {
            setHoverPosition('top');
            return;
          }
          return;
        } if (parentPath !== itemPath && acceptComponentList.includes(item.type) && data.children.length === 0) {
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

      if (item.type === COLUMN) {
        if (hoverClientX < hoverMiddleX) {
          setHoverPosition('left');
        } else if (hoverClientX > hoverMiddleX) {
          setHoverPosition('right');
        }
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
      path: data.path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleClickOutside = (e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');

    if ((target.closest('.draggable-column') !== ref.current && !target.classList.contains('component')) && !sidebarOptionsWrapper && isSelected) {
      setIsSelected(false);
      dispatch(resetSelectedComponent());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRenderPropsState(renderProps);
  }, [renderProps]);

  useEffect(() => {
    if (ref.current) {
      setRenderPropsState({
        ...renderPropsState,
        style: {
          ...renderPropsState.style,
        },
      });
    }
  }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderComponent = (component: LayoutState, currentPath: string) => (
    <div>
      {
          component.type === SIDEBAR_TEXT_ITEM ? (
            <TextComponent
              key={component.id}
              data={component}
              path={currentPath}
              renderProps={renderPropsState}
            />
          ) : component.type === SIDEBAR_IMAGE_ITEM ? (
            <ImageComponent
              key={component.id}
              data={component}
              path={currentPath}
              renderProps={renderPropsState}
            />
          ) : component.type === SIDEBAR_SOCIAL_ITEM ? (
            <SocialComponent
              key={component.id}
              data={component}
              path={currentPath}
              renderProps={renderPropsState}
            />
          ) : undefined
        }
    </div>
  );
  const hasRenderProps = renderProps ? renderPropsState.style : null;

  let indicatorStyle = {};
  let textIndicatorStyle = {};

  if (hoverPosition === 'left') {
    indicatorStyle = {
      outline: '2px solid #B0E0E6',
      height: '100%',
      position: 'absolute',
      left: '-1px',
      top: 0,
      zIndex: 9,
    };
    textIndicatorStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '7px',
      background: '#B0E0E6',
      borderRadius: '5px',
      fontSize: '10px',
      zIndex: 9,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      color: '#FFF',
    };
  } else if (hoverPosition === 'top' || hoverPosition === 'bottom') {
    indicatorStyle = {
      position: 'absolute',
      [hoverPosition === 'top' ? 'top' : hoverPosition === 'bottom' ? 'bottom' : '']: '-2px',
      left: 0,
      right: 0,
      background: '#B0E0E6',
      height: '4px',
      zIndex: 9,
    };
    textIndicatorStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '7px',
      background: '#B0E0E6',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9,
      textAlign: 'center',
      color: '#FFF',
    };
  } else if (hoverPosition === 'right') {
    indicatorStyle = {
      outline: '2px solid #B0E0E6',
      height: '100%',
      position: 'absolute',
      right: '-1px',
      top: 0,
      zIndex: 9,
    };
    textIndicatorStyle = {
      position: 'absolute',
      left: 'calc(50%)',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      marginLef: '7px',
      padding: '7px',
      background: '#B0E0E6',
      borderRadius: '5px',
      fontSize: '10px',
      zIndex: 9,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      color: '#FFF',
    };
  }

  let indicatorText = 'Déposer ici';

  if (data.type === COLUMN) {
    indicatorText = 'Déplacer ici';
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      style={{
        [layout[data.path.split('-')[0]].children[0].children.filter((el: any) => el.children.length).length < 1 ? 'minHeight' : 'height']: layout[data.path.split('-')[0]].children[0].children.filter((el: any) => el.children.length).length < 1 ? '150px' : 'auto',
        position: 'relative',
        outline: isSelected ? '1px solid #4cb9ea' : data.children.length ? 'none' : '1px dashed #4cb9ea',
        ...hasRenderProps,
        flexBasis: data.path ? `calc(${hasRenderProps.flexBasis} - ${layout[data.path.split('-')[0]].children[0].renderProps.style.gap})` : hasRenderProps.style.flexBasis,
        minWidth: 'inherit',
        padding: data.children.length ? '0px 4px' : '0',
      }}
      className="draggable-column"
      onMouseOver={(e) => {
        if (!isSelected) {
          const target = e.target as HTMLElement;
          if (target === ref.current || target.parentNode === ref.current || target.parentNode?.parentNode === ref.current) {
            ref.current!.style.outline = '1px solid #4cb9ea';
          } else {
            ref.current!.style.outline = '0';
          }
        }
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          if (!data.children.length) {
            ref.current!.style.outline = '1px dashed #4cb9ea';
          } else {
            ref.current!.style.outline = '0';
          }
        }
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.parentNode === ref.current || target.parentNode?.parentNode === ref.current || target === ref.current) {
          setIsSelected(true);
          dispatch(setSelectedComponent({
            id: data.id,
            path: data.path,
            type: COLUMN,
            renderProps: renderPropsState,
            isResizable: data.childrenCount !== 1,
          }));
        } else {
          setIsSelected(false);
        }
      }}
    >
      {data.children.length ? data.children.map((component: LayoutState, index: number) => {
        const currentPath = `${data.path}-${index}`;
        return (
          <span key={component.id} style={{}}>
            {renderComponent(component, currentPath)}
          </span>
        );
      }) : (
        <div style={{
          background: '#e8faff',
          width: '100%',
          minHeight: '150px',
          height: '100%',
        }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            fontSize: '12px',
          }}
          >
            Déposez un composant ici
          </div>
        </div>
      )}
      {
        isOver && hoverPosition && (
          <div
            style={{
              ...indicatorStyle,
            }}
          >
            <span style={{
              ...textIndicatorStyle,
            }}
            >
              {
                indicatorText
              }
            </span>
          </div>
        )
      }
    </div>
  );
};

export default ColumnComponent;
