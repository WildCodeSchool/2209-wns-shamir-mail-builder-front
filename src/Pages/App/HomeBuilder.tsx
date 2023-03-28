import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Mjml,
  MjmlBody, MjmlButton,
  MjmlColumn,
  MjmlHead,
  MjmlImage,
  MjmlSection,
  MjmlSocial, MjmlSocialElement,
  MjmlStyle,
  MjmlText,
} from '@faire/mjml-react';
import { useSelector } from 'react-redux';
import Iconify from '../../Components/Iconify';
import DraggablesComponentList
  from '../../Components/LayoutBuilder/DraggablesSidebar/DraggablesComponentList';
import LayoutBuilder, { renderReactToMjml } from '../../Components/LayoutBuilder/LayoutBuilder';
import SidebarOptions from '../../Components/LayoutBuilder/SidebarOptions/SidebarOptions';
import {
  SIDEBAR_BUTTON_ITEM,
  SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM,
  SIDEBAR_TEXT_ITEM,
} from '../../Components/LayoutBuilder/DraggablesSidebar/DraggableBuilderComponentList';

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
export default function HomeBuilder() {
  const layout = useSelector((state: any) => state.layout);
  return (
    <Box
      component={'div'}
      className="App"
      sx={{ overflow: 'hidden' }}
    >
      <DndProvider backend={HTML5Backend}>
        <AppWrapper>
          <Box className="builder-sidebar">
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
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0 10px',
              }}
              mt={4}
            >
              <DraggablesComponentList />
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
                  startIcon={<Iconify icon="fa-solid:save" />}
                  onClick={() => {
                    const { html } = renderReactToMjml(
                      <Mjml>
                        <MjmlHead>
                          <MjmlStyle>
                            {`
                              p {
                                margin-left: 0 !important;
                                margin-right: 0 !important;
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
                            `}
                          </MjmlStyle>
                        </MjmlHead>
                        <MjmlBody>
                          {
                            layout.map((row: any) => (
                              <MjmlSection
                                paddingTop={`${row.children[0].renderProps.style.paddingTop}px`}
                                paddingBottom={`${row.children[0].renderProps.style.paddingBottom}px`}
                                paddingLeft={`${row.children[0].renderProps.style.paddingLeft}px`}
                                paddingRight={`${row.children[0].renderProps.style.paddingRight}px`}
                                backgroundColor={row.children[0].renderProps.style.backgroundColor}
                                backgroundUrl={row.children[0].renderProps.style.backgroundUrl}
                                backgroundRepeat={row.children[0].renderProps.style.backgroundRepeat}
                                backgroundSize={row.children[0].renderProps.style.backgroundSize}
                                backgroundPosition={row.children[0].renderProps.style.backgroundPosition}
                                fullWidth={row.children[0].renderProps.style.fullWidth}
                              >
                                {
                                  row.children[0].children.map((col: any) => (
                                    <MjmlColumn
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
                                                  dangerouslySetInnerHTML={{ __html: component.renderProps.render }}
                                                  paddingLeft={component.renderProps.style.paddingLeft}
                                                  paddingRight={component.renderProps.style.paddingRight}
                                                  paddingTop={component.renderProps.style.paddingTop}
                                                  paddingBottom={component.renderProps.style.paddingBottom}
                                                />
                                              );
                                            case SIDEBAR_IMAGE_ITEM:
                                              return (
                                                <MjmlImage
                                                  src={component.renderProps.style.backgroundUrl}
                                                  height={component.renderProps.style.height}
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
                                                  mode="horizontal"
                                                  paddingTop={component.renderProps.style.paddingTop || '0px'}
                                                  paddingBottom={component.renderProps.style.paddingBottom || '0px'}
                                                  paddingLeft={component.renderProps.style.paddingLeft || '8px'}
                                                  paddingRight={component.renderProps.style.paddingRight || '8px'}
                                                >
                                                  <MjmlSocialElement
                                                    name="facebook"
                                                    href={component.renderProps.style.facebook}
                                                  />
                                                  <MjmlSocialElement
                                                    name="twitter"
                                                    href={component.renderProps.style.twitter}
                                                  />
                                                  <MjmlSocialElement
                                                    name="instagram"
                                                    href={component.renderProps.style.instagram}
                                                  />
                                                </MjmlSocial>
                                              );
                                            case SIDEBAR_BUTTON_ITEM:
                                              return (
                                                <MjmlButton
                                                  backgroundColor={component.renderProps.style.backgroundColor}
                                                  color={component.renderProps.style.color}
                                                  fontFamily={`${component.renderProps.style.fontFamily}, Helvetica, Arial, sans-serif`}
                                                  fontSize={`${component.renderProps.style.fontSize}px`}
                                                  fontWeight={component.renderProps.style.fontWeight}
                                                  lineHeight={`${component.renderProps.style.fontSize}px`}
                                                  innerPadding={`${component.renderProps.style.paddingTop}px ${component.renderProps.style.paddingRight}px ${component.renderProps.style.paddingBottom}px ${component.renderProps.style.paddingLeft}px`}
                                                  href={component.renderProps.style.href}
                                                  cssClass={'fluidOnMobile button'}
                                                  align={component.renderProps.style.justifyContent === 'flex-start' ? 'left' : component.renderProps.style.justifyContent === 'flex-end' ? 'right' : 'center'}
                                                  borderRadius={`${component.renderProps.style.borderRadius}px`}
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
                    console.log(html);
                  }}
                >
                  Preview
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
        </AppWrapper>
      </DndProvider>
    </Box>
  );
}
