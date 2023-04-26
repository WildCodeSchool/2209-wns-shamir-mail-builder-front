import { Backdrop, Box, Button, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Mjml,
  MjmlBody, MjmlButton,
  MjmlColumn, MjmlFont,
  MjmlHead,
  MjmlImage,
  MjmlSection,
  MjmlSocial, MjmlSocialElement,
  MjmlStyle,
  MjmlText,
} from '@faire/mjml-react';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Iconify from '../../Components/Iconify';
import DraggablesComponentList from '../../Components/LayoutBuilder/DraggablesSidebar/DraggablesComponentList';
import LayoutBuilder, { renderReactToMjml } from '../../Components/LayoutBuilder/LayoutBuilder';
import SidebarOptions from '../../Components/LayoutBuilder/SidebarOptions/SidebarOptions';
import {
  SIDEBAR_BUTTON_ITEM,
  SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM,
  SIDEBAR_TEXT_ITEM,
} from '../../Components/LayoutBuilder/DraggablesSidebar/DraggableBuilderComponentList';
import { ISocialItem } from '../../types';
import Module from '../../Components/LayoutBuilder/Module';

const AppWrapper = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  maxHeight: 'calc(100vh - 120px)',
  marginTop: '120px',
  '& > *': {
    padding: '1em',
  },
  '& > *:not(:last-child)': {
    borderRight: '1px solid #ccc',
  },
  '& > :nth-child(2)': {
    flexBasis: '60%',
    flexGrow: '1',
  },
  '& > :nth-child(1)': {
    flexBasis: '20%',
    flexGrow: '1',
    maxWidth: '350px',
  },
  '& > :nth-child(3)': {
    flexBasis: '20%',
    flexGrow: '1',
    maxWidth: '300px',
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const GET_MODULES = gql`
  query GetAllModules {
    getAllModules {
      id
      name
      preview
      render
    }
  } 
`;

export default function HomeBuilder() {
  const layout = useSelector((state: any) => state.layout);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [previewHtml, setPreviewHtml] = useState<string>('');

  const handleOpen = () => setOpenPreview(true);
  const handleClose = () => setOpenPreview(false);

  const [modules, setModules] = useState<any>([]);
  const [getModules] = useLazyQuery(GET_MODULES, {
    onCompleted: (data) => {
      setModules(data.getAllModules);
    },
  });

  useEffect(() => {
    (async () => getModules())();
  }, []);

  return (
    <Box
      component={'div'}
      className="App"
      sx={{ overflow: 'hidden' }}
    >
      <DndProvider backend={HTML5Backend}>
        <AppWrapper>
          <Box
            className="builder-sidebar"
          >
            <Typography
              variant="h6"
              component="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Iconify icon="fa-solid:th-list" />
              Liste des composants
            </Typography>
            <Box
              component={'div'}
              style={{
                width: '100%',
                overflowY: 'auto',
                height: 'calc(100vh - 200px)',
                paddingRight: '.5rem',
              }}
              mt={4}
            >
              <DraggablesComponentList />

              <Typography
                variant={'h6'}
                sx={{
                  marginBottom: '1rem',
                }}
              >
                Mes modules
                {
                  modules?.length > 0 && (
                    <Typography
                      sx={{
                        display: 'inline-block',
                        ml: '.5rem',
                      }}
                    >
                      (
                      {modules?.length}
                      {' '}
                      module
                      {
                        modules?.length > 1 ? 's' : ''
                      }
                      )
                    </Typography>
                  )
                }
              </Typography>

              <Box
                key={module.id}
                style={{
                  width: '100%',
                  flex: 'none',
                }}
              >
                {
                  modules.length > 0 ? modules.map((module: any) => (
                    <Module key={module.id} data={module} />
                  )) : (
                    <Typography
                      variant={'body1'}
                    >
                      Aucun module
                    </Typography>
                  )
                }
              </Box>
            </Box>
          </Box>
          <Box
            component={'div'}
            className="layout-builder"
          >
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Iconify icon="fa-solid:th-large" />
                Zone de construction
              </Typography>

              <Box
                component={'div'}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Iconify icon="mdi:responsive" />}
                  onClick={() => {
                    // @ts-ignore
                    const { html } = renderReactToMjml(
                      <Mjml>
                        <MjmlHead>
                          <MjmlFont
                            name="Roboto"
                            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
                          />
                          <MjmlStyle>
                            {`
                              p {
                              margin: 0 !important;
                              }
                              .button table td p {
                              }
                              @media screen and (max-width: 600px) {
                                .fluidOnMobile table,
                                .fluidOnMobile td,
                                .fluidOnMobile img {
                                  width: 100% !important;
                                  max-width: 100% !important;
                                  height: auto !important;
                                }
                              }
                              ::-webkit-scrollbar {
                                  width: 2px;
                              }
                              /* Track */
                              ::-webkit-scrollbar-track {
                                  background: transparent;
                              }
                              /* Handle */
                              ::-webkit-scrollbar-thumb {
                                  background: #ebb644;
                              }
                              /* Handle on hover */
                              ::-webkit-scrollbar-thumb:hover {
                                  background: #ebb64433;
                              }
                            `}
                          </MjmlStyle>
                        </MjmlHead>
                        <MjmlBody width={600 + 20}>
                          {
                            layout.map((row: any) => (
                              <MjmlSection
                                key={row.id}
                                paddingTop={`${row.children[0].renderProps.style.paddingTop}px`}
                                paddingBottom={`${row.children[0].renderProps.style.paddingBottom}px`}
                                paddingLeft={`${row.children[0].renderProps.style.paddingLeft}px`}
                                paddingRight={`${row.children[0].renderProps.style.paddingRight}px`}
                                backgroundColor={row.children[0].renderProps.style.backgroundColor}
                                {...row.children[0].renderProps.style.fullWidth && { fullWidth: true }}
                                backgroundUrl={row.children[0].renderProps.style.backgroundUrl}
                                backgroundRepeat={row.children[0].renderProps.style.backgroundRepeat}
                                backgroundSize={row.children[0].renderProps.style.backgroundSize}
                                backgroundPosition={row.children[0].renderProps.style.backgroundPosition}
                              >
                                {
                                  row.children[0].children.map((col: any) => (
                                    <MjmlColumn
                                      key={col.id}
                                      paddingTop={col.renderProps.style.paddingTop || '0px'}
                                      paddingBottom={col.renderProps.style.paddingBottom || '0px'}
                                      paddingLeft={col.renderProps.style.paddingLeft || '4px'}
                                      paddingRight={col.renderProps.style.paddingRight || '4px'}
                                      width={col.renderProps.style.flexBasis}
                                      verticalAlign={col.renderProps.style.alignSelf === 'flex-start' ? 'top' : col.renderProps.style.alignSelf === 'flex-end' ? 'bottom' : 'middle'}
                                    >
                                      {
                                        col.children.map((component: any) => {
                                          const { type } = component;
                                          switch (type) {
                                            case SIDEBAR_TEXT_ITEM:
                                              return (
                                                <MjmlText
                                                  key={component.id}
                                                  dangerouslySetInnerHTML={{ __html: component.renderProps.render }}
                                                  paddingLeft={0}
                                                  paddingRight={0}
                                                  paddingTop={'0.5rem'}
                                                  paddingBottom={'6px'}
                                                  lineHeight={component.renderProps.style.lineHeight || '1.5'}
                                                  fontSize={component.renderProps.style.fontSize || '16px'}
                                                />
                                              );
                                            case SIDEBAR_IMAGE_ITEM:
                                              return (
                                                <MjmlImage
                                                  key={component.id}
                                                  src={component.renderProps.style.backgroundUrl}
                                                  height={`${component.renderProps.style.height}px`}
                                                  paddingTop={component.renderProps.style.paddingTop}
                                                  paddingBottom={component.renderProps.style.paddingBottom}
                                                  paddingLeft={component.renderProps.style.paddingLeft}
                                                  paddingRight={component.renderProps.style.paddingRight}
                                                  cssClass={'fluidOnMobile'}
                                                />
                                              );
                                            case SIDEBAR_SOCIAL_ITEM:
                                              return (
                                                <MjmlSocial
                                                  key={component.id}
                                                  mode="horizontal"
                                                  paddingTop={component.renderProps.style.paddingTop || '0px'}
                                                  paddingBottom={component.renderProps.style.paddingBottom || '0px'}
                                                  paddingLeft={component.renderProps.style.paddingLeft || '8px'}
                                                  paddingRight={component.renderProps.style.paddingRight || '8px'}
                                                >
                                                  {
                                                    component.children.map((social: ISocialItem) => (
                                                      <MjmlSocialElement
                                                        key={social.id}
                                                        href={social.renderProps.style.href}
                                                        iconSize={`${component.renderProps.style.width}px`}
                                                        src={social.renderProps.style.src}
                                                      />
                                                    ))
                                                  }
                                                </MjmlSocial>
                                              );
                                            case SIDEBAR_BUTTON_ITEM:
                                              return (
                                                <MjmlButton
                                                  key={component.id}
                                                  backgroundColor={component.renderProps.style.backgroundColor}
                                                  color={component.renderProps.style.color}
                                                  fontFamily={`${component.renderProps.style.fontFamily}, sans-serif`}
                                                  fontSize={`${component.renderProps.style.fontSize}px`}
                                                  fontWeight={component.renderProps.style.fontWeight}
                                                  lineHeight={'16px'}
                                                  innerPadding={`${component.renderProps.style.innerPaddingTop}px ${component.renderProps.style.innerPaddingRight}px ${component.renderProps.style.innerPaddingBottom}px ${component.renderProps.style.innerPaddingLeft}px`}
                                                  padding={`${component.renderProps.style.paddingTop}px ${component.renderProps.style.paddingRight}px ${component.renderProps.style.paddingBottom}px ${component.renderProps.style.paddingLeft}px`}
                                                  href={component.renderProps.style.href}
                                                  cssClass={'button'}
                                                  align={component.renderProps.style.justifyContent === 'flex-start' ? 'left' : component.renderProps.style.justifyContent === 'flex-end' ? 'right' : 'center'}
                                                  borderRadius={`${component.renderProps.style.borderRadius}px`}
                                                  textTransform={component.renderProps.style.textTransform}
                                                >
                                                  {component.renderProps.text}
                                                </MjmlButton>
                                              );
                                            default:
                                              return null;
                                          }
                                        })
                                      }
                                    </MjmlColumn>
                                  ))
                                }
                              </MjmlSection>
                            ))
                          }
                        </MjmlBody>
                      </Mjml>,
                    );
                    handleOpen();
                    setPreviewHtml(html);
                  }}
                >
                  Apercu du mail
                </Button>
              </Box>
            </Stack>
            <LayoutBuilder />
          </Box>
          <Box
            component={'div'}
            className="sidebar-options"
            sx={{
              overflow: 'auto',
              height: '100%',
            }}
          >
            <Typography
              variant="h6"
              component="h6"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Iconify icon="fa-solid:sliders-h" />
              Options
            </Typography>
            <Box
              mt={2}
              component={'div'}
            >
              <SidebarOptions />
            </Box>
          </Box>
          {
            openPreview && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openPreview}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
              >
                <Fade in={openPreview}>
                  <Box sx={style}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleClose}
                      >
                        Fermer
                      </Button>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Box
                          sx={{
                            border: '1px solid #000',
                          }}
                        >
                          <iframe
                            srcDoc={previewHtml}
                            title="preview"
                            style={{
                              width: '100%',
                              height: '90vh',
                              outline: 'none',
                              border: 'none',
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            width: '336px',
                            height: '459px',
                            margin: '0 auto',
                            border: '1px solid #000',
                          }}
                        >
                          <iframe
                            srcDoc={previewHtml}
                            title="preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              outline: 'none',
                              border: 'none',
                            }}
                          />

                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Fade>
              </Modal>
            )
          }
        </AppWrapper>
      </DndProvider>
    </Box>
  );
}
