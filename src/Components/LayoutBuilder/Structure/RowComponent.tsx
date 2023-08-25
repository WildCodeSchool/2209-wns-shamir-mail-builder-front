import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { DragPreviewImage, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import html2canvas from 'html2canvas';
import {
  GRID,
  GRID2, GRID2_1_3_L, GRID2_1_3_R,
  GRID3,
  ROW_COMPONENT, SIDEBAR_MODULE_ITEM,
} from '../DraggablesSidebar/DraggableBuilderComponentList';
import {
  addModuleComponent,
  addParentComponent, deleteRowComponent, duplicateRowComponent,
  moveParentComponent,
} from '../../../features/layout/layoutSlice';
import { resetSelectedComponent, setSelectedComponent } from '../../../features/sidebar/slidebarSlice';
// eslint-disable-next-line import/no-cycle
import Container from './Container';
import DropHere from '../DropHere';
import OverlayComponent from '../Overlay/OverlayComponent';
import { DragItem, IContainer, IRowComponent } from '../../../types';
import { AuthContext } from '../../../AuthContext/Authcontext';
import { generateNewIdInModule } from '../../../helpers';
import { IModule } from '../Module';

interface IRowComponentProps {
  data: IRowComponent
  path: number
  handleAddModule: (module: IModule) => void
}

const SAVE_MODULE_COMPONENT = gql`
  mutation Mutation($module: ModuleInput!) {
    createModule(module: $module) {
      id
      name
      preview
      render
    }
  }
`;

const RowComponent = ({ data, path, handleAddModule }: IRowComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);
  const [hoverPosition, setHoverPosition] = React.useState<string>('');
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [over, setOver] = React.useState<boolean>(false);
  const [openRowOptions, setOpenRowOptions] = React.useState<boolean>(false);
  const [saveModuleComponent] = useMutation(SAVE_MODULE_COMPONENT, {
    onCompleted: (moduleData) => {
      handleAddModule(moduleData.createModule);
    },
  });
  const dispatch = useDispatch();
  const layout = useSelector((state: any) => state.layout);
  const { user } = useContext(AuthContext);

  const [{ isDragging }, drag, connectDragPreview] = useDrag({
    canDrag: true,
    type: ROW_COMPONENT,
    item: {
      id: data.id,
      type: ROW_COMPONENT,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: [GRID, GRID2, GRID3, GRID2_1_3_R, GRID2_1_3_L, ROW_COMPONENT, SIDEBAR_MODULE_ITEM],
    drop: (item: DragItem) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.path;
      const hoverIndex = path;
      if (item.type === SIDEBAR_MODULE_ITEM) {
        dispatch(addModuleComponent({ item, hoverPosition, path }));
      } else if (item.type !== ROW_COMPONENT) {
        dispatch(addParentComponent({ item, hoverPosition, path }));
      } else if (item.type === ROW_COMPONENT && dragIndex !== hoverIndex) {
        dispatch(moveParentComponent({ sourceIndex: dragIndex, destinationIndex: hoverIndex, hoverPosition }));
      }
    },
    collect: (monitor: DropTargetMonitor<DragItem, void>) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: DragItem, monitor: DropTargetMonitor<DragItem, void>) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.path;
      const hoverIndex = path;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex !== hoverIndex) {
        if (hoverClientY < hoverMiddleY) {
          setHoverPosition('top');
          return;
        }
        setHoverPosition('bottom');
      }
    },
  });

  drag(drop(ref));

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const sidebarOptionsWrapper = target.closest('.sidebar-options');
    const materialPopover = target.closest('.MuiPopover-root');
    if (target !== ref.current && !sidebarOptionsWrapper && isSelected && !materialPopover && (!target.closest('.row-options') || target.closest('.row-options') !== ref.current?.querySelector('.row-options')) && (!target.closest('.row-name') || target.closest('.row-name') !== ref.current?.querySelector('.row-name')) && ((target.classList.contains('container') && target.closest('.row-component') !== ref.current) || target.closest('.row-component') !== ref.current)) {
      setIsSelected(false);
      setOver(false);
      setOpenRowOptions(false);
      dispatch(resetSelectedComponent());
    }
  }, [isSelected]);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) {
      const target = e.target as HTMLElement;
      if (target === ref.current || target === ref.current!.firstChild || target.closest('.row-options') || target.closest('.row-name')) {
        setOver(true);
        ref.current!.style.outline = '1px solid #ebb644';
      } else {
        setOver(false);
        ref.current!.style.outline = '0';
      }
    } else if (e.currentTarget !== ref.current) {
      ref.current!.style.outline = '0';
      setOver(false);
    } else {
      setOver(true);
      ref.current!.style.outline = '1px solid #ebb644';
    }
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      setOver(false);
      setOpenRowOptions(false);
      ref.current!.style.outline = '0';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target === ref.current || target === ref.current!.firstChild || target.closest('.row-options') || target.closest('.row-name')) {
      if (!isSelected) {
        setIsSelected(true);
        dispatch(setSelectedComponent({
          id: data.id,
          type: ROW_COMPONENT,
          path,
          columnCount: data.children[0].children.length,
          typeGrid: data.children[0].typeGrid,
          renderProps: layout[path].children[0].renderProps,
        }));
      }
    } else {
      setIsSelected(false);
      setOpenRowOptions(false);
      setOver(false);
    }
  };

  const handleOpenRowOptions = useCallback((isRowOptionsOpen: boolean) => {
    setOpenRowOptions(isRowOptionsOpen);
  }, [openRowOptions]);

  const handleDeleteRow = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Etes vous sûr de vouloir supprimer cette ligne ?')) {
      dispatch(deleteRowComponent({ path }));
      dispatch(resetSelectedComponent());
    }
    return false;
  }, [path]);

  const handleDuplicateRow = useCallback(() => {
    dispatch(duplicateRowComponent({ data, path }));
  }, [data, path]);

  const createPreviewImage = useCallback(async (el: HTMLDivElement | null) => {
    if (el) {
      setOver(false);
      setIsSelected(false);
      const canvas = await html2canvas(el, {
        allowTaint: true,
        useCORS: true,
        height: el.scrollHeight,
        width: el.scrollWidth,
      });
      setOver(true);
      setIsSelected(true);
      return canvas.toDataURL('image/png');
    }
    return null;
  }, [ref]);

  // eslint-disable-next-line consistent-return
  const handleSaveAsModule = useCallback(async () => {
    // eslint-disable-next-line no-restricted-globals,no-alert
    if (confirm('Etes vous sûr de vouloir sauvegarder cette ligne en tant que module ?')) {
      // Save image preview
      const image = await createPreviewImage(ref.current!.querySelector('.container'));
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'zqtvcfio');
        formData.append('folder', 'layout-builder');
        formData.append('api_key', `${process.env.REACT_APP_CLOUDINARY_API_KEY}`);
        formData.append('timestamp', (Date.now() / 1000).toString());
        fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then(async (res) => {
            const dataFormatted = generateNewIdInModule(data);
            await saveModuleComponent({
              variables: {
                module: {
                  name: data.type,
                  preview: res.secure_url,
                  render: [dataFormatted],
                  userId: `${user.id}`,
                },
              },
            });
          });
      }
    }
  }, [data, path]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  return (
    <>
      <DragPreviewImage src={data.children[0].children[0].preview} connect={connectDragPreview} />
      <Box
        component={'div'}
        style={{
          ...renderPropsState.style,
          position: 'relative',
          height: 'auto',
          paddingBottom: `${renderPropsState.style.paddingBottom}px`,
          paddingTop: `${renderPropsState.style.paddingTop}px`,
          backgroundImage: `url(${renderPropsState.style.backgroundUrl})`,
          backgroundSize: `${renderPropsState.style.backgroundSize}`,
          backgroundPosition: `${renderPropsState.style.backgroundPosition}`,
          backgroundRepeat: `${renderPropsState.style.backgroundRepeat}`,
          borderWidth: `${renderPropsState.style.borderWidth}px`,
          borderRadius: `${renderPropsState.style.borderRadius}px`,
          borderColor: `${renderPropsState.style.borderColor}`,
          borderStyle: `${renderPropsState.style.borderStyle}`,
          outline: isSelected ? '1px solid #ebb644' : '0',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        className={'row-component'}
        ref={ref}
        onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => handleMouseOver(e)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {
          data.children.map((child: IContainer) => (
            <Container
              key={child.id}
              data={child}
              path={path}
            />
          ))
        }

        {
          isOver && hoverPosition !== '' && (
            <DropHere
              hoverPosition={hoverPosition}
            />
          )
        }

        {
          (over || isSelected) && (
            <OverlayComponent
              handleOpenOptions={handleOpenRowOptions}
              handleDelete={handleDeleteRow}
              handleDuplicate={handleDuplicateRow}
              handleSaveAsModule={handleSaveAsModule}
              isOptionsOpen={openRowOptions}
              path={path}
              label={'Ligne'}
              type={data.type}
            />
          )
        }
      </Box>
    </>
  );
};

export default RowComponent;
