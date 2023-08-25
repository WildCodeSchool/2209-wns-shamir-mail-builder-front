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
import { IModule } from './Module';

export function renderReactToMjml(email: React.ReactElement): MJMLParseResults {
  return mjml2html(renderToMjml(email));
}

const SAVE_LAYOUT = gql`
  mutation SaveLayout($saveLayoutId: Float!, $layout: LayoutInput!, $preview: String) {
    saveLayout(id: $saveLayoutId, layout: $layout, preview: $preview) {
      name
    }
  }
`;

interface ILayoutBuilderProps {
  handleAddModule: (module: IModule) => void
}

const LayoutBuilder = ({ handleAddModule }: ILayoutBuilderProps) => {
  const layout = useSelector((state: any) => state.layout);
  const selectedLayout = useSelector((state: any) => state.selectedComponent);
  const [saveLayout] = useMutation(SAVE_LAYOUT);
  const ref = useRef<HTMLTableElement>(null);

  const exportAsImage = async (el: any) => {
    const canvas = await html2canvas(el, {
      allowTaint: true,
      useCORS: true,
      height: el.scrollHeight,
      width: el.scrollWidth,
    });
    const formData = new FormData();
    formData.append('file', canvas.toDataURL('image/png', 1.0));
    formData.append('upload_preset', 'zqtvcfio');
    formData.append('folder', 'layout-builder');
    formData.append('api_key', `${process.env.REACT_APP_CLOUDINARY_API_KEY}`);
    formData.append('timestamp', (Date.now() / 1000).toString());
    return fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res.secure_url);
  };

  useEffect(() => {
    (async () => {
      // const imageUrl = await exportAsImage(ref.current);
      // const payload: { layout: { layout: any }, saveLayoutId: string, preview: string } = { layout: { layout }, saveLayoutId: selectedLayout.layoutId, preview: imageUrl };
      const payload: { layout: { layout: any }, saveLayoutId: string, preview?: string } = { layout: { layout }, saveLayoutId: selectedLayout.layoutId };
      saveLayout({ variables: payload }).then(() => {
        // eslint-disable-next-line no-console
        console.log('Layout auto saved successfully');
      });
    })();
  }, [layout]);

  return (
    <>
      <Button
        variant={'contained'}
        color={'primary'}
        sx={{
          display: 'none',
        }}
        onClick={() => exportAsImage(ref.current)}
      >
        Save image preview
      </Button>
      <Box
        component={'div'}
        sx={{
          maxHeight: '100%',
          height: 'calc(100vh - 237px)',
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
              {<RowComponent key={item.id} data={item} path={index} handleAddModule={handleAddModule} />}
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
