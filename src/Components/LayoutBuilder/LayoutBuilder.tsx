import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import html2canvas from 'html2canvas';
import { MJMLParseResults } from 'mjml-core';
// @ts-ignore
import mjml2html from 'mjml-browser';
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml';
import EmptyLayout from './Empty/EmptyLayout';
import RowComponent from './Structure/RowComponent';
import { IRowComponent } from '../../types';

export function renderReactToMjml(email: React.ReactElement): MJMLParseResults {
  return mjml2html(renderToMjml(email));
}

const SAVE_LAYOUT = gql`
  mutation SaveLayout($saveLayoutId: Float!, $layout: LayoutInput!) {
    saveLayout(id: $saveLayoutId, layout: $layout) {
      name
    }
  }
`;

const LayoutBuilder = () => {
  const layout = useSelector((state: any) => state.layout);
  const selectedLayout = useSelector((state: any) => state.selectedComponent);
  const [saveLayout] = useMutation(SAVE_LAYOUT);
  const ref = useRef<HTMLTableElement>(null);
  const downloadImage = (blob: string, fileName: string) => {
    const fakeLink: HTMLAnchorElement = window.document.createElement('a');
    fakeLink.setAttribute('display', 'none');
    fakeLink.download = fileName;

    fakeLink.href = `${blob}`;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };
  const exportAsImage = async (el: any, imageFileName: any) => {
    const canvas = await html2canvas(el, {
      allowTaint: true,
      useCORS: true,
      height: el.scrollHeight,
      width: el.offsetWidth,
    });
    const image = canvas.toDataURL('image/png', 1.0);
    downloadImage(image, imageFileName);
  };

  useEffect(() => {
    saveLayout({ variables: { layout: { layout }, saveLayoutId: selectedLayout.layoutId } }).then(() => {
      // eslint-disable-next-line no-console
      console.log('Layout auto saved successfully');
    });
  }, [layout]);

  return (
    <>
      <Button
        variant={'contained'}
        color={'primary'}
        sx={{
          display: 'none',
        }}
        onClick={() => exportAsImage(ref.current, 'test')}
      >
        Save image preview
      </Button>
      <Box
        component={'div'}
        sx={{
          maxHeight: '100%',
          height: 'calc(100vh - 220px)',
          overflowY: 'auto',
        }}
        className={'layout-wrapper'}
        mt={4}
      >
        <Box
          component={'div'}
          style={{
            position: 'relative',
            height: '100%',
            paddingTop: 17,
          }}
          className={'layout'}
          ref={ref}
        >
          {layout.length > 0 ? layout.map((item: IRowComponent, index: number) => (
            <React.Fragment key={item.id}>
              {<RowComponent key={item.id} data={item} path={index} />}
            </React.Fragment>
          )) : (
            <EmptyLayout />
          )}
        </Box>
      </Box>
    </>
  );
};

export default LayoutBuilder;
