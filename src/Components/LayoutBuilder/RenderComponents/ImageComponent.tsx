import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import { resetSelectedComponent, setSelectedComponent } from '../../../features/sidebar/slidebarSlice';
import { SIDEBAR_IMAGE_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { deleteComponent } from '../../../features/layout/layoutSlice';
// eslint-disable-next-line import/no-cycle
import EmptyImage from '../Empty/EmptyImage';
import OverlayComponent from '../Overlay/OverlayComponent';
import { IComponent, IImageComponentRenderProps } from '../../../types';

interface IImageComponentProps {
  data: IComponent & { renderProps?: IImageComponentRenderProps };
  path: string;
}

const Image = ({ data, path }: IImageComponentProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [renderPropsState, setRenderPropsState] = React.useState<IImageComponentRenderProps>(data.renderProps!);
  const [over, setOver] = React.useState<boolean>(false);
  const [openImageOptions, setOpenImageOptions] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    canDrag: true,
    type: SIDEBAR_IMAGE_ITEM,
    item: {
      id: data.id,
      type: SIDEBAR_IMAGE_ITEM,
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
    const materialPopover = target.closest('.MuiPopover-root');

    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !materialPopover && target.closest('.component-image') !== ref.current && (!target.closest('.image-options') || target.closest('.image-options') !== ref.current?.querySelector('.image-options')) && (!target.closest('.image-name') || target.closest('.image-name') !== ref.current?.querySelector('.image-name'))) {
      setIsSelected(false);
      setOver(false);
      setOpenImageOptions(false);
      dispatch(resetSelectedComponent());
    }
  };

  const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target.parentNode === ref.current || target.closest('.component-image') === ref.current) {
        setOver(true);
        ref.current!.style.outline = '2px solid #ebb644';
      } else {
        setOver(false);
        ref.current!.style.outline = '1px dashed #ebb644';
      }
    }
  }, [isSelected]);

  const handleMouseLeave = useCallback(() => {
    if (!isSelected) {
      if (!renderPropsState.style.backgroundUrl) {
        ref.current!.style.outline = '1px dashed #ebb644';
      } else {
        ref.current!.style.outline = '0';
      }
      setOver(false);
      setOpenImageOptions(false);
    }
  }, [isSelected, renderPropsState.style.backgroundUrl]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.parentNode === ref.current || target.closest('.component-image') === ref.current) {
      if (!isSelected) {
        setIsSelected(true);
        dispatch(setSelectedComponent({
          id: data.id,
          path,
          type: SIDEBAR_IMAGE_ITEM,
          renderProps: renderPropsState,
        }));
      }
    } else {
      setIsSelected(false);
      setOpenImageOptions(false);
      setOver(false);
    }
  }, [isSelected, path, renderPropsState]);

  const handleOpenImageOptions = useCallback((isImageOptionsOpen: boolean) => {
    setOpenImageOptions(isImageOptionsOpen);
  }, [openImageOptions]);

  const handleDeleteImage = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Etes vous sûr de vouloir supprimer cette image ?')) {
      dispatch(deleteComponent({ path }));
      dispatch(resetSelectedComponent());
    }
    return false;
  }, [path]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelected]);

  useEffect(() => {
    setRenderPropsState(data.renderProps!);
  }, [data.renderProps]);

  drag(ref);

  return (
    <Box
      component={'div'}
      style={{
        ...renderPropsState?.style,
        width: '100%',
        height: renderPropsState?.style?.height ? `${renderPropsState?.style?.height}px` : 'auto',
        position: 'relative',
        outline: isSelected ? '2px solid #ebb644' : renderPropsState?.style.backgroundUrl ? '0' : '1px dashed #ebb644',
        borderWidth: `${renderPropsState?.style?.borderWidth}px`,
        borderColor: renderPropsState?.style?.borderColor,
        borderStyle: renderPropsState?.style?.borderStyle,
        borderRadius: `${renderPropsState?.style?.borderRadius}px`,
        paddingTop: `${renderPropsState?.style?.paddingTop}px`,
        paddingRight: `${renderPropsState?.style?.paddingRight}px`,
        paddingBottom: `${renderPropsState?.style?.paddingBottom}px`,
        paddingLeft: `${renderPropsState?.style?.paddingLeft}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={'component-image'}
      ref={ref}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleClick(e)}
    >
      {
        renderPropsState?.style?.backgroundUrl ? (
          <Box
            component={'img'}
            src={`https://corsproxy.io/?${renderPropsState.style.backgroundUrl}`}
            style={{
              ...renderPropsState.style,
              position: 'initial',
              width: '100%',
              height: '100%',
              borderRadius: `${Number(renderPropsState.style.borderRadius) - 17}px`,
              overflow: 'hidden',
            }}
            alt={renderPropsState.style.alt}
          />
        )
          : (
            <EmptyImage />
          )
      }

      {
        (over || isSelected) && (
          <OverlayComponent
            isOptionsOpen={openImageOptions}
            handleOpenOptions={handleOpenImageOptions}
            handleDelete={handleDeleteImage}
            label={'Image'}
            type={'image'}
            path={path}
          />
        )
      }
    </Box>
  );
};

export default Image;
