import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import { SIDEBAR_TEXT_ITEM } from '../DraggablesSidebar/DraggableBuilderComponentList';
import { resetSelectedComponent } from '../../../features/sidebar/slidebarSlice';
import { handleStateComponentChange } from '../../../features/layout/layoutSlice';
import { IComponent, ITextComponentRenderProps } from '../../../types';
// eslint-disable-next-line import/no-cycle

interface ITextComponentProps {
  data: IComponent & { renderProps?: ITextComponentRenderProps };
  path: string;
}

const TextComponent = ({ data, path }: ITextComponentProps) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps!);
  const [text, setText] = React.useState(renderPropsState!.render);

  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    canDrag: true,
    type: SIDEBAR_TEXT_ITEM,
    item: {
      id: data.id,
      type: SIDEBAR_TEXT_ITEM,
      children: data.children,
      path,
      renderProps: renderPropsState,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClickOutside = (e: any) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    const ckEditorWrapper = target.closest('.ck-dropdown.ck-toolbar__grouped-dropdown.ck-toolbar-dropdown');
    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !ckEditorWrapper) {
      setIsSelected(false);
      dispatch(resetSelectedComponent());
    }
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target.parentNode === ref.current || target.closest('.component ') === ref.current) {
        ref.current!.style.outline = '1px solid #ebb644';
      } else {
        ref.current!.style.outline = '1px solid #ebb644';
      }
    } else if (e.currentTarget !== ref.current) {
      ref.current!.style.outline = '0';
    } else {
      ref.current!.style.outline = '1px solid #ebb644';
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      ref.current!.style.outline = '0';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.component') === ref.current) {
      setIsSelected(true);
    }
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData('text/html');
    setText(data);
    debounce(() => {
      dispatch(handleStateComponentChange({
        path,
        renderProps: {
          ...renderPropsState,
          render: data,
        },
      }));
    }, 1000)();
  };

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
        ...data.renderProps!.style,
        position: 'relative',
        width: '100%',
        height: 'auto',
        opacity: isDragging ? 0.5 : 1,
        outline: isSelected ? '1px solid #ebb644' : '0',
      }}
      className={'component'}
      ref={ref}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleClick(e)}
    >
      <CKEditor
        editor={Editor}
        data={text}
        style={{ width: '100%', height: 'auto' }}
        onReady={() => {
          console.log('Editor is ready to use!'); // eslint-disable-line no-console
        }}
        onChange={(event: any, editor: any) => handleEditorChange(event, editor)}
      />
    </Box>
  );
};

export default TextComponent;
