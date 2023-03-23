import React from 'react';
import { COLUMN } from '../DraggablesSidebar/DraggableBuilderComponentList';

interface IColumnDragOverOverlayProps {
  hoverPosition: string;
  type: string;
}

const ColumnDragOverOverlay = ({ hoverPosition, type }: IColumnDragOverOverlayProps) => {
  let indicatorStyle = {};
  let textIndicatorStyle = {};
  let indicatorText = 'Déposer ici';

  if (hoverPosition === 'left') {
    indicatorStyle = {
      width: '3px',
      background: '#ebb644',
      position: 'absolute',
      left: '-1px',
      top: 0,
      bottom: 0,
      zIndex: 9,
    };
    textIndicatorStyle = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '7px',
      background: '#ebb644',
      borderRadius: '5px',
      fontSize: '10px',
      zIndex: 9,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      color: '#FFF',
    };
  } else if (hoverPosition === 'top' || hoverPosition === 'bottom') {
    indicatorStyle = {
      position: 'absolute',
      [hoverPosition === 'top' ? 'top' : hoverPosition === 'bottom' ? 'bottom' : '']: '-2px',
      left: 0,
      right: 0,
      background: '#ebb644',
      height: '3px',
      zIndex: 9,
    };
    textIndicatorStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '7px',
      background: '#ebb644',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9,
      textAlign: 'center',
      color: '#FFF',
    };
  } else if (hoverPosition === 'right') {
    indicatorStyle = {
      width: '3px',
      background: '#ebb644',
      position: 'absolute',
      right: '-1px',
      top: 0,
      bottom: 0,
      zIndex: 9000,
    };
    textIndicatorStyle = {
      position: 'absolute',
      left: 'calc(50%)',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '7px',
      background: '#ebb644',
      borderRadius: '5px',
      fontSize: '10px',
      zIndex: 9,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      color: '#FFF',
    };
  }

  if (type === COLUMN) {
    indicatorText = 'Déplacer ici';
  }

  return (
    <div
      style={{
        ...indicatorStyle,
      }}
    >
      <span style={{
        ...textIndicatorStyle,
      }}
      >
        {
          indicatorText
        }
      </span>
    </div>
  );
};

export default ColumnDragOverOverlay;
