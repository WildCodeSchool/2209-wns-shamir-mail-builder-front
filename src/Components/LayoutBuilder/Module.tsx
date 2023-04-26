import React from 'react';
import { useDrag } from 'react-dnd';
import { SIDEBAR_MODULE_ITEM } from './DraggablesSidebar/DraggableBuilderComponentList';
import { IRowComponent } from '../../types';

type IModule = {
  name: string;
  preview: string;
  render: IRowComponent[];
};

type IModuleProps = {
  data: IModule;
};

const Module = ({ data }: IModuleProps) => {
  const ref = React.useRef(null);

  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
  const [_, drag] = useDrag({
    type: SIDEBAR_MODULE_ITEM,
    item: { type: SIDEBAR_MODULE_ITEM, data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div ref={ref}>
      <img
        src={data.preview}
        alt={data.name}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'contain',
          border: '1px solid #000',
          borderRadius: '5px',
        }}
      />
    </div>
  );
};

export default Module;
