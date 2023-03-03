import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import EmptyLayout from './EmptyLayout';
import RowComponent from './Structure/RowComponent';

const LayoutBuilder = () => {
  const layout = useSelector((state: any) => state.layout);

  return (
    <Box
      component={'div'}
      sx={{
        maxHeight: '100%',
        height: 'calc(100vh - (88px + 28px + 64px))',
        overflowY: 'auto',
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
      }}
      className={'layout-wrapper'}
      mt={0}
    >
      <Box
        component={'div'}
        sx={{
          position: 'relative',
          height: 'calc(100%)',
          padding: '32px 0',
        }}
      >
        {layout.length > 0 ? layout.map((item: any, index: number) => (
          <React.Fragment key={item.id}>
            {<RowComponent key={item.id} data={item} path={index} />}
          </React.Fragment>
        )) : (
          <EmptyLayout />
        )}
      </Box>
    </Box>
  );
};

export default LayoutBuilder;
