import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import { resetSelectedComponent, setSelectedComponent } from '../../../features/sidebar/slidebarSlice';
import { SIDEBAR_BUTTON_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { deleteComponent } from '../../../features/layout/layoutSlice';
// eslint-disable-next-line import/no-cycle
import OverlayComponent from '../Overlay/OverlayComponent';
import { IButtonComponentRenderProps, IComponent } from '../../../types';

interface IButtonComponentProps {
  data: IComponent & { renderProps?: IButtonComponentRenderProps };
  path: string;
}

const Button = ({ data, path }: IButtonComponentProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps!);
  const [over, setOver] = React.useState<boolean>(false);
  const [openButtonOptions, setOpenButtonOptions] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    canDrag: true,
    type: SIDEBAR_BUTTON_ITEM,
    item: {
      id: data.id,
      type: SIDEBAR_BUTTON_ITEM,
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

    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !materialPopover && target.closest('.component-button') !== ref.current && (!target.closest('.button-options') || target.closest('.button-options') !== ref.current?.querySelector('.button-options')) && (!target.closest('.button-name') || target.closest('.button-name') !== ref.current?.querySelector('.button-name'))) {
      setIsSelected(false);
      setOver(false);
      setOpenButtonOptions(false);
      dispatch(resetSelectedComponent());
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target.parentNode === ref.current || target.closest('.component-button') === ref.current) {
        setOver(true);
        ref.current!.style.outline = '2px solid #ebb644';
      } else {
        setOver(false);
        ref.current!.style.outline = '1px dashed #ebb644';
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      ref.current!.style.outline = '0';
      setOver(false);
      setOpenButtonOptions(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.parentNode === ref.current || target.closest('.component-button') === ref.current) {
      if (!isSelected) {
        setIsSelected(true);
        dispatch(setSelectedComponent({
          id: data.id,
          path,
          type: SIDEBAR_BUTTON_ITEM,
          renderProps: renderPropsState,
        }));
      }
    } else {
      setIsSelected(false);
      setOpenButtonOptions(false);
      setOver(false);
    }
  };

  const handleOpenButtonOptions = useCallback((isButtonOptionsOpen: boolean) => {
    setOpenButtonOptions(isButtonOptionsOpen);
  }, [openButtonOptions]);

  const handleButtonDelete = useCallback(() => {
    dispatch(deleteComponent({ path }));
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: renderPropsState.style.justifyContent,
        position: 'relative',
        outline: isSelected ? '2px solid #ebb644' : '0',
        opacity: isDragging ? 0.5 : 1,
      }}
      className={'component-button'}
      ref={ref}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleClick(e)}
    >
      <a
        href={renderPropsState?.style.href}
        title={renderPropsState?.style.title}
        style={{
          display: 'inline-block',
          paddingTop: `${renderPropsState.style.paddingTop}px`,
          paddingRight: `${renderPropsState.style.paddingRight}px`,
          paddingBottom: `${renderPropsState.style.paddingBottom}px`,
          paddingLeft: `${renderPropsState.style.paddingLeft}px`,
          backgroundColor: renderPropsState.style.backgroundColor,
          color: renderPropsState.style.color,
          borderRadius: `${renderPropsState.style.borderRadius}px`,
          border: `${renderPropsState.style.borderWidth}px ${renderPropsState.style.borderStyle} ${renderPropsState.style.borderColor}`,
          fontSize: `${renderPropsState.style.fontSize}px`,
          fontWeight: renderPropsState.style.fontWeight,
          textDecoration: renderPropsState.style.textDecoration,
          textTransform: renderPropsState.style.textTransform,
          letterSpacing: `${renderPropsState.style.letterSpacing}px`,
          fontFamily: renderPropsState.style.fontFamily,
          textAlign: renderPropsState.style.textAlign,
          cursor: 'pointer',
        }}
        onClick={(e) => e.preventDefault()}
      >
        {renderPropsState.text}
      </a>
      {
        (over || isSelected) && (
          <OverlayComponent
            isOptionsOpen={openButtonOptions}
            handleOpenOptions={handleOpenButtonOptions}
            handleDelete={handleButtonDelete}
            path={path}
            label={'Button'}
            type={'button'}
          />
        )
      }
    </Box>
  );
};

export default Button;
