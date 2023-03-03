import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useDrag } from 'react-dnd';
import { SIDEBAR_TEXT_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { resetSelectedComponent } from '../../../../features/sidebar/slidebarSlice';
import { handleStateComponentChange } from '../../../../features/layout/layoutSlice';

const TextComponent = ({ data, path, renderProps }: any) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderState, setRenderState] = useState(data.renderProps.render);

  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [, drag] = useDrag({
    canDrag: true,
    options: undefined,
    previewOptions: undefined,
    type: SIDEBAR_TEXT_ITEM,
    item: {
      type: SIDEBAR_TEXT_ITEM,
      id: data.id,
      children: data.children,
      path,
      renderProps: {
        ...renderPropsState,
        render: data.renderProps.render,
      },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      dragItem: monitor.getItem(),
    }),
  });

  // const [{isOver, item}, drop] = useDrop({
  //   accept: [COMPONENT],
  //   drop: (item: any, monitor) => {
  //     if (!ref.current) {
  //       return
  //     }
  //     const parentColumn = item.path.split('-')[1];
  //     const hoverColumn = path.split('-')[1];
  //     if (parentColumn !== hoverColumn) {
  //       console.log('move to another column')
  //     } else {
  //       console.log('move to another position')
  //     }
  //   },
  //   collect: (monitor: any) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //     handlerId: monitor.getHandlerId(),
  //     item: monitor.getItem(),
  //   }),
  //   hover: (item: any, monitor: any) => {
  //     if (!ref.current) {
  //       return
  //     }
  //
  //   }
  // });

  const handleClickOutside = (e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    const ckEditorWrapper = target.closest('.ck-dropdown.ck-toolbar__grouped-dropdown.ck-toolbar-dropdown');
    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !ckEditorWrapper) {
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

  drag(ref);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      style={{
        width: '100%',
        outline: isSelected ? '1px solid #4cb9ea' : '0',
        ...renderProps.style,
        height: 'auto',
      }}
      className={'component'}
      ref={ref}
      onMouseOver={(e) => {
        if (!isSelected) {
          const target = e.target as HTMLElement;
          if (target === ref.current || target.parentNode === ref.current || target.closest('.component ') === ref.current) {
            ref.current!.style.outline = '1px solid #4cb9ea';
          } else {
            ref.current!.style.outline = '1px solid #4cb9ea';
          }
        } else if (e.currentTarget !== ref.current) {
          ref.current!.style.outline = '0';
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
        if (target.closest('.component') === ref.current) {
          setIsSelected(true);
        }
      }}
    >
      <CKEditor
        editor={Editor}
        data={renderState}
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setRenderState(data);
          debounce(() => {
            dispatch(handleStateComponentChange({
              path,
              renderProps: {
                ...renderPropsState,
                render: data,
              },
            }));
          }, 1000)();
        }}
        onBlur={(event: any, editor: any) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
};

export default TextComponent;
