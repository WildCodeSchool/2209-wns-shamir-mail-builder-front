import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import Iconify from '../../Components/Iconify';
import DraggablesComponentList
  from '../../Components/LayoutBuilder/components/DraggablesSidebar/DraggablesComponentList';
import LayoutBuilder from '../../Components/LayoutBuilder/components/LayoutBuilder';
import { store } from '../../app/store';
import SidebarOptions from '../../Components/LayoutBuilder/components/SidebarOptions/SidebarOptions';

const AppWrapper = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  height: '100vh',
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
    maxWidth: '300px',
  },
  '& > :nth-child(3)': {
    flexBasis: '20%',
    flexGrow: '1',
    maxWidth: '300px',
  },
});
export default function HomeBuilder() {
  return (
    <Provider store={store}>

      <Box component={'div'} className="App">
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
                {/* <AiOutlineSetting /> */}
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
    </Provider>
  );
}
