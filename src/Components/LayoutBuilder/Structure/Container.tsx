import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import ColumnComponent from './ColumnComponent';
// eslint-disable-next-line import/no-cycle
import { IColumnComponent, IContainer } from '../../../types';

const ContainerWrapper = styled('div')({
  display: 'flex',
  width: '600px',
  maxWidth: 'calc(600px)',
  margin: '0 auto',
});

interface IContainerProps {
  data: IContainer
  path: number
}
const Container = ({ data, path }: IContainerProps) => {
  const [renderPropsState, setRenderPropsState] = React.useState(data.renderProps);

  useEffect(() => {
    setRenderPropsState(data.renderProps);
  }, [data.renderProps]);

  return (
    <Box
      component={'div'}
      style={{
        ...renderPropsState.style,
        width: renderPropsState.style.fullWidth ? '100%' : '600px',
        margin: '0 auto',
        backgroundImage: `url(${renderPropsState.style.backgroundUrl})`,
        paddingTop: renderPropsState.style.fullWidth ? '0' : `${renderPropsState.style.paddingTop}px`,
        paddingBottom: renderPropsState.style.fullWidth ? '0' : `${renderPropsState.style.paddingBottom}px`,
        paddingLeft: renderPropsState.style.fullWidth ? '0' : `${renderPropsState.style.paddingLeft}px`,
        paddingRight: renderPropsState.style.fullWidth ? '0' : `${renderPropsState.style.paddingRight}px`,
      }}
      className={'container'}
    >
      <ContainerWrapper
        style={{
          paddingTop: renderPropsState.style.fullWidth ? `${renderPropsState.style.paddingTop}px` : '0',
          paddingBottom: renderPropsState.style.fullWidth ? `${renderPropsState.style.paddingBottom}px` : '0',
          paddingLeft: renderPropsState.style.fullWidth ? `${renderPropsState.style.paddingLeft}px` : '0',
          paddingRight: renderPropsState.style.fullWidth ? `${renderPropsState.style.paddingRight}px` : '0',
        }}
      >
        {
        data?.children?.map((child: IColumnComponent, index: number) => {
          const currentPath = `${path}-${index}`;
          return (
            <ColumnComponent
              key={child.id}
              data={child}
              path={currentPath}
              rowTypeGrid={data.typeGrid}
            />
          );
        })
      }
      </ContainerWrapper>
    </Box>
  );
};

export default Container;
