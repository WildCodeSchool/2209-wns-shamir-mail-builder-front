import React from 'react';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { SIDEBAR_MODULE_ITEM } from './DraggablesSidebar/DraggableBuilderComponentList';
import { IRowComponent } from '../../types';
import OverlayComponent from './Overlay/OverlayComponent';

type IModule = {
  id: number;
  name: string;
  preview: string;
  render: IRowComponent[];
};

type IModuleProps = {
  data: IModule;
  handleRemoveModule: (id: number) => void;
};

const REMOVE_MODULE = gql`
mutation Mutation($removeModuleId: Float!) {
  removeModule(id: $removeModuleId) {
    id
  }
}
`;

const Module = ({ data, handleRemoveModule }: IModuleProps) => {
  const ref = React.useRef(null);
  const [openRowOptions, setOpenRowOptions] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [removeModule] = useMutation(REMOVE_MODULE, {
    onCompleted: () => {
      handleRemoveModule(data.id);
    },
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
  const [_, drag] = useDrag({
    type: SIDEBAR_MODULE_ITEM,
    item: { type: SIDEBAR_MODULE_ITEM, data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if ((target === ref.current || target.closest('.module-item') === ref.current || target.closest('.sidebarModuleItem-options')) && !over) {
      setOver(true);
    }
  };

  const handleOpenRowOptions = (isRowOptionsOpen: boolean) => {
    setOpenRowOptions(isRowOptionsOpen);
  };

  const handleDeleteModule = async () => {
    await removeModule({
      variables: {
        removeModuleId: data.id,
      },
    });
  };

  drag(ref);

  return (
    <Box
      sx={{ position: 'relative' }}
      component={'div'}
      className={'module-item'}
      ref={ref}
      onMouseOver={(e) => handleMouseOver(e)}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.module-options')) {
          setOver(false);
        }
      }}
      onMouseUp={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('.module-item') === ref.current) {
          setOver(true);
        }
      }}
      onMouseLeave={
      () => {
        if (over) {
          setOver(false);
          setOpenRowOptions(false);
        }
      }
    }
    >
      <img
        src={data.preview}
        alt={data.name}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'contain',
          border: '1px solid #c39d63',
          borderRadius: '5px',
        }}
      />
      {
        over && (
          <OverlayComponent
            handleOpenOptions={handleOpenRowOptions}
            handleDelete={handleDeleteModule}
            showLabel={false}
            isOptionsOpen={openRowOptions}
            type={'module'}
          />
        )
      }
    </Box>
  );
};

export default Module;
