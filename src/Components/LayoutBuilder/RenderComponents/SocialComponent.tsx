import React, { useCallback, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { SIDEBAR_SOCIAL_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { resetSelectedComponent, setSelectedComponent } from '../../../features/sidebar/slidebarSlice';
import { deleteComponent } from '../../../features/layout/layoutSlice';
// eslint-disable-next-line import/no-cycle
import SocialItem from './SocialItem';
import EmptySocial from '../Empty/EmptySocial';
import OverlayComponent from '../Overlay/OverlayComponent';
import { IComponent, ISocialComponentRenderProps, ISocialItem } from '../../../types';

interface ISocialComponentProps {
  data: IComponent & { renderProps?: ISocialComponentRenderProps };
  path: string | number;
}

const SocialComponent = ({ data, path }: ISocialComponentProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps!);
  const [over, setOver] = React.useState<boolean>(false);
  const [openSocialOptions, setOpenSocialOptions] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    canDrag: true,
    type: SIDEBAR_SOCIAL_ITEM,
    item: {
      id: data.id,
      type: SIDEBAR_SOCIAL_ITEM,
      children: data.children,
      path,
      renderProps: renderPropsState,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    const materialModal = target.closest('.MuiModal-root');

    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !materialModal && target.closest('.component-social') !== ref.current && target.closest('.component-social') !== ref.current && (!target.closest('.social-options') || target.closest('.social-options') !== ref.current?.querySelector('.social-options')) && (!target.closest('.social-name') || target.closest('.social-name') !== ref.current?.querySelector('.social-name'))) {
      setIsSelected(false);
      setOver(false);
      setOpenSocialOptions(false);
      dispatch(resetSelectedComponent());
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target.parentNode === ref.current || target.closest('.component-social') === ref.current) {
        setOver(true);
        ref.current!.style.outline = '2px solid #ebb644';
      } else {
        setOver(false);
        ref.current!.style.outline = '0';
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      ref.current!.style.outline = '0';
      setOver(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.component-social') === ref.current && !isSelected) {
      if (!isSelected) {
        setIsSelected(true);
        dispatch(setSelectedComponent({
          id: data.id,
          path,
          type: SIDEBAR_SOCIAL_ITEM,
          renderProps: renderPropsState,
          children: data.children,
        }));
      }
    }
  };

  const handleOpenSocialOptions = useCallback((isSocialOptionsOpen: boolean) => {
    setOpenSocialOptions(isSocialOptionsOpen);
  }, [openSocialOptions]);

  const handleDeleteSocialOptions = useCallback(() => {
    dispatch(deleteComponent({ path }));
  }, [path]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelected]);

  useEffect(() => {
    if (renderPropsState !== data.renderProps) {
      setRenderPropsState(data.renderProps!);
    }
  }, [data.renderProps]);

  drag(ref);

  return (
    <Box
      component={'div'}
      style={{
        ...renderPropsState.style,
        position: 'relative',
        width: '100%',
        outline: isSelected ? '2px solid #ebb644' : '0',
        paddingTop: data.children.length > 0 ? `${renderPropsState.style.gap}px` : 0,
        paddingBottom: data.children.length > 0 ? `${renderPropsState.style.gap}px` : 0,
        paddingLeft: data.children.length > 0 ? `${renderPropsState.style.gap}px` : 0,
        paddingRight: data.children.length > 0 ? `${renderPropsState.style.gap}px` : 0,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={'component-social'}
      ref={ref}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleClick(e)}
    >
      {
        data.children.length > 0 ? (
          <ul style={{
            display: 'flex',
            justifyContent: renderPropsState.style.justifyContent,
            alignItems: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            gap: `${renderPropsState.style.gap}px`,
            margin: 0,
            padding: 0,
          }}
          >
            {data.children.map((child: ISocialItem) => (
              <SocialItem
                key={child.id}
                data={child}
                renderProps={renderPropsState}
                handleClick={(e) => e.preventDefault()}
              />
            ))}
          </ul>
        ) : (
          <EmptySocial />
        )
      }

      {
        (over || isSelected) && (
          <OverlayComponent
            path={path}
            isOptionsOpen={openSocialOptions}
            handleOpenOptions={handleOpenSocialOptions}
            handleDelete={handleDeleteSocialOptions}
            label={'Social'}
            type={'social'}
          />
        )
      }
    </Box>
  );
};

export default SocialComponent;
