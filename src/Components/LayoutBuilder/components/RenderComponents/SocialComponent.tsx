import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { SIDEBAR_SOCIAL_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { resetSelectedComponent, setSelectedComponent } from '../../../../features/sidebar/slidebarSlice';

const SocialComponent = ({ data, path }: any) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const ref = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [, drag] = useDrag({
    canDrag: true,
    type: SIDEBAR_SOCIAL_ITEM,
    item: {
      type: SIDEBAR_SOCIAL_ITEM,
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

  drag(ref);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      style={{
        ...renderPropsState?.style,
        width: '100%',
        outline: isSelected ? '1px solid #4cb9ea' : '0',
      }}
      className={'component-social'}
      ref={ref}
      onMouseOver={(e) => {
        if (!isSelected) {
          const target = e.target as HTMLElement;
          if (target === ref.current || target.parentNode === ref.current || target.closest('.component-social') === ref.current) {
            ref.current!.style.outline = '1px solid #4cb9ea';
          } else {
            ref.current!.style.outline = '1px dashed #4cb9ea';
          }
        }
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          ref.current!.style.outline = '0';
        }
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.component-social') === ref.current) {
          setIsSelected(true);
          dispatch(setSelectedComponent({
            id: data.id,
            path,
            type: SIDEBAR_SOCIAL_ITEM,
            renderProps: renderPropsState,
          }));
        }
      }}
    >
      <ul style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
      >
        <li>
          <a rel={'noopener noreferrer'} href="https://www.facebook.com/" target={'_blank'}>
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt={''} />
          </a>
        </li>
        <li>
          <a rel={'noopener noreferrer'} href="https://www.twitter.com/" target={'_blank'}>
            <img src="https://img.icons8.com/color/48/000000/twitter.png" alt={''} />
          </a>
        </li>
        <li>
          <a rel={'noopener noreferrer'} href="https://www.instagram.com/" target={'_blank'}>
            <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt={''} />
          </a>
        </li>
        <li>
          <a rel={'noopener noreferrer'} href="https://www.linkedin.com/" target={'_blank'}>
            <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt={''} />
          </a>
        </li>

      </ul>
    </div>
  );
};

export default SocialComponent;
