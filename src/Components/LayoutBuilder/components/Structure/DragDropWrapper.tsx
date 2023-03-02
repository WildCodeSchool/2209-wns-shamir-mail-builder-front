import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetSelectedComponent } from '../../../../features/sidebar/slidebarSlice';
import { COLUMN } from '../DraggablesSidebar/DraggableBuilderComponentList';

const DragDropWrapper = React.forwardRef(({
  renderPropsState,
  isSelected,
  handleSelected,
  data,
  children,
  isDragging,
  handleMouseOver,
  handleMouseLeave,
  handleClick,
  className,
}: any, ref: any) => {
  const dispatch = useDispatch();
  const opacity = isDragging ? 0 : 1;

  const handleClickOutside = (e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    if (target !== ref.current && !sidebarOptionsWrapper && isSelected) {
      handleSelected(false);
      dispatch(resetSelectedComponent());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelected]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      style={{
        ...renderPropsState.style,
        cursor: 'grab',
        opacity,
        outline: isSelected ? '1px solid #4cb9ea' : data.type === COLUMN && data.children.length < 1 ? '1px dashed #4cb9ea' : '0',
      }}
      className={className}
      ref={ref}
      onMouseOver={(e) => handleMouseOver(e, ref, isSelected)}
      onMouseLeave={(e) => handleMouseLeave(e, ref, isSelected)}
      onClick={(e) => handleClick(e, ref)}
    >
      {children}
    </div>
  );
});

export default DragDropWrapper;
