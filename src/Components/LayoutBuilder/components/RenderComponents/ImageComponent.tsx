import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { resetSelectedComponent, setSelectedComponent } from '../../../../features/sidebar/slidebarSlice';
import { SIDEBAR_IMAGE_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import Iconify from '../../../Iconify';

const Image = ({ data, path }: any) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const ref = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [, drag] = useDrag({
    canDrag: true,
    options: undefined,
    previewOptions: undefined,
    type: SIDEBAR_IMAGE_ITEM,
    item: {
      type: SIDEBAR_IMAGE_ITEM,
      id: data.id,
      children: data.children,
      path,
      renderProps: {
        ...renderPropsState,
      },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      dragItem: monitor.getItem(),
    }),
  });

  const handleClickOutside = (e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    if (target !== ref.current && !sidebarOptionsWrapper && isSelected) {
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
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  drag(ref);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      style={{
        ...renderPropsState?.style,
        width: '100%',
        height: renderPropsState?.style?.height ? renderPropsState?.style?.height : 'auto',
        position: 'relative',
        outline: isSelected ? '1px solid #4cb9ea' : renderPropsState?.style.src ? '0' : '1px dashed #4cb9ea',
      }}
      className={'component-image'}
      ref={ref}
      onMouseOver={(e) => {
        if (!isSelected) {
          const target = e.target as HTMLElement;
          if (target === ref.current || target.parentNode === ref.current || target.closest('.component-image') === ref.current) {
            ref.current!.style.outline = '1px solid #4cb9ea';
          } else {
            ref.current!.style.outline = '1px dashed #4cb9ea';
          }
        }
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          if (renderPropsState?.style.src) {
            ref.current!.style.outline = '0';
            return;
          }
          ref.current!.style.outline = '1px dashed #4cb9ea';
        }
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.parentNode === ref.current || target.closest('.component-image') === ref.current) {
          setIsSelected(true);
          dispatch(setSelectedComponent({
            id: data.id,
            path,
            type: SIDEBAR_IMAGE_ITEM,
            renderProps: renderPropsState,
          }));
        }
      }}
    >
      {
        renderPropsState?.style?.src ? (
          <img
            src={renderPropsState?.style?.src}
            style={{
              ...renderPropsState?.style,
              width: '100%',
              height: renderPropsState?.style?.height ? renderPropsState?.style?.height : '100%',
              objectFit: 'cover',
            }}
            alt={''}
          />
        )
          : (
            <div style={{
              background: '#e8faff',
              width: 'calc(100%)',
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
                Choisir une image
                {' '}
                <br />
                <br />
                <Iconify icon="bx:bx-image-add" />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default Image;
