import React from 'react';
import { Box } from '@mui/material';
import Iconify from '../../Iconify';
import { COLUMN, ROW_COMPONENT } from '../DraggablesSidebar/DraggableBuilderComponentList';

interface IOverlayComponentProps {
  path?: string | number
  isOptionsOpen: boolean
  handleOpenOptions: (value: boolean) => void
  handleDelete: () => void
  handleDuplicate?: () => void
  handleSaveAsModule?: () => void
  label?: string
  type: string
  showLabel?: boolean
}

const OverlayComponent = ({ path, showLabel = true, isOptionsOpen, handleOpenOptions, handleDelete, handleDuplicate, label, type, handleSaveAsModule }: IOverlayComponentProps) => (
  <>
    {showLabel && (
    <Box
      component={'div'}
      style={{
        position: 'absolute',
        top: -14,
        left: 10,
      }}
      className={`${type.toLowerCase()}-name`}
    >
      <Box
        component={'div'}
        style={{
          backgroundColor: '#ebb644',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: 5,
          fontSize: 12,
        }}
      >
        {label}
        {' '}
        {
          path !== undefined && (type === ROW_COMPONENT ? Number(path) + 1 : type === COLUMN ? Number(typeof path !== 'number' && path.split('-')[1]) + 1 : null)
        }
      </Box>
    </Box>
    )}
    <Box
      component={'div'}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0,
      }}
    >
      <Box
        component={'div'}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ebb644',
          color: '#fff',
          position: 'relative',
          borderRadius: '5px 0 0 5px',
        }}
        className={`${type.toLowerCase()}-options`}
      >
        <Iconify
          icon="material-symbols:more-vert"
          style={{
            fontSize: 20,
            margin: 6,
            transform: isOptionsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
          onClick={() => {
            handleOpenOptions(!isOptionsOpen);
          }}
        />
        <Box
          component={'div'}
          style={{
            backgroundColor: '#c39d63',
          }}
        >
          {
              isOptionsOpen && (
                <ul
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: 8,
                    listStyle: 'none',
                  }}
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                  <li
                    style={{
                      display: 'flex',
                    }}
                    title="Supprimer"
                    onClick={handleDelete}
                  >
                    <Iconify
                      icon="mdi:delete"
                      style={{
                        fontSize: 16,
                      }}
                    />
                  </li>
                  {
                    type === ROW_COMPONENT && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                    <li
                      style={{
                        display: 'flex',
                      }}
                      title="Enregistrer en tant que module"
                      onClick={handleSaveAsModule}
                    >
                      <Iconify
                        icon="mdi:content-save"
                        style={{
                          fontSize: 16,
                        }}
                      />
                    </li>
                    )
                  }
                  {
                    type === ROW_COMPONENT && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                    <li
                      style={{
                        display: 'flex',
                      }}
                      title="Dupliquer"
                      onClick={handleDuplicate}
                    >
                      <Iconify
                        icon="mdi:content-copy"
                        style={{
                          fontSize: 16,
                        }}
                      />
                    </li>
                    )
                  }
                </ul>
              )
            }
        </Box>
      </Box>
    </Box>
  </>
);

export default OverlayComponent;
