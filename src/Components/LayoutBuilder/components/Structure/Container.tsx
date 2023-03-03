import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { COLUMN, CONTAINER, SIDEBAR_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import ColumnComponent from './ColumnComponent';
import { resetSelectedComponent, setSelectedComponent } from '../../../../features/sidebar/slidebarSlice';

const ContainerWrapper = styled('div')({
  maxWidth: 'calc(640px + 2rem)',
  margin: '0 auto',
});
const Container = ({ data, path }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  useEffect(() => {
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  const handleClickOutside = useCallback((e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    if (e.target !== ref.current && !sidebarOptionsWrapper && isSelected) {
      setIsSelected(false);
      dispatch(resetSelectedComponent());
    }
  }, [dispatch, isSelected]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <ContainerWrapper
      ref={ref}
      style={{
        outline: isSelected ? '1px solid #4cb9ea' : '0',
        ...renderPropsState.style,
      }}
      onMouseOver={(e) => {
        if (!isSelected) {
          if (e.target === ref.current) {
            ref.current!.style.outline = '1px solid #4cb9ea';
          } else {
            ref.current!.style.outline = '0';
          }
        } else {
          ref.current!.style.outline = '1px solid #4cb9ea';
        }
      }}
      onMouseLeave={() => {
        if (!isSelected) {
          ref.current!.style.outline = '0';
        }
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target === ref.current) {
          setIsSelected(true);
          dispatch(setSelectedComponent({
            path,
            type: CONTAINER,
            renderProps: renderPropsState,
          }));
        }
      }}
    >
      {
        data?.children?.map((child: any, index: number) => {
          const currentPath = `${path}-${index}`;
          return (
            <ColumnComponent
              key={child.id}
              data={{
                path: currentPath,
                childrenCount: data.children.length,
                children: child.children,
                type: COLUMN,
              }}
              renderProps={child.renderProps}
              accept={[SIDEBAR_ITEM, COLUMN]}
            />
          );
        })
      }
    </ContainerWrapper>
  );
};

export default Container;
