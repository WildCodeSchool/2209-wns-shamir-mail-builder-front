import React, { useContext, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../Main/Header';
import { setLayout } from '../../features/layout/layoutSlice';
import { setSelectedLayout } from '../../features/layout/selectedComponent';
import { AuthContext } from '../../AuthContext/Authcontext';

const GET_LAYOUT = gql`
query GetUserLayout($userId: Float!) {
  getUserLayout(userId: $userId) {
    companies {
      id
      name
      layouts {
        id
        name
        children
        createdAt
        updatedAt
      }
    }
  }
}
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [userLayouts, setUserLayouts] = React.useState([]);
  const [layoutSelected, setLayoutSelected] = React.useState<any>(false);
  const [getLayout] = useLazyQuery(GET_LAYOUT, {
    onCompleted: (data: any) => {
      setUserLayouts(data.getUserLayout.companies);
    },
  });

  /*
  Récupération des layouts de l'utilisateur au montage du composant
   */
  useEffect(() => {
    (async () => getLayout(
      {
        variables: {
          userId: user.id,
        },
      },
    ))();
  }, []);

  return (
    <>
      <Header />
      {
          layoutSelected ? (
            <Outlet />
          ) : (
            <Container
              maxWidth={'lg'}
              sx={{
                marginTop: 'calc(88px + 32px)',
              }}
            >
              <Typography
                variant="h1"
              >
                Mes layouts
              </Typography>
              <Button
                variant="contained"
                size={'small'}
              >
                Créer une nouvelle compagnie
              </Button>
              <Box
                my={5}
              >
                {
            userLayouts?.map((companies: any) => (
              <Box
                key={companies.id}
                sx={
                  {
                    border: '1px solid #000',
                    borderRadius: '5px',
                    p: 2,
                    my: 2,
                  }
                }
              >
                <Accordion sx={{
                  boxShadow: 'none',
                }}
                >
                  <AccordionSummary>
                    <Stack
                      direction="row"
                      alignItems={'center'}
                      spacing={2}
                      justifyContent={'space-between'}
                      flexGrow={1}
                    >
                      <Typography
                        variant="h4"
                      >
                        {companies.name}
                        {' '}
                        <Typography>
                          {companies.layouts.length}
                          {' '}
                          layout(s)
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Ajouter un template
                      </Button>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider />
                    <Stack
                      direction="row"
                      alignItems={'center'}
                      spacing={2}
                      sx={{
                        my: 5,
                      }}
                    >
                      {companies?.layouts.length > 0 ? companies?.layouts.map((companie: any) => (
                        <Box
                          key={companie.id}
                        >
                          <img
                            src="https://via.placeholder.com/150"
                            alt="layout"
                            style={{
                              borderRadius: '5px',
                            }}
                          />
                          <Typography
                            variant="h6"
                          >
                            {companie.name}
                          </Typography>
                          <Button
                            variant={'contained'}
                            size={'small'}
                            sx={{
                              mt: 1,
                            }}
                            onClick={() => {
                              dispatch(setLayout({
                                layout: companie.children,
                                layoutId: companie.id,
                              }));
                              dispatch(setSelectedLayout({ layoutId: companie.id }));
                              setLayoutSelected(true);
                            }}
                          >
                            Choisir ce layout
                          </Button>
                        </Box>
                      )) : (
                        <Typography
                          variant="h6"
                        >
                          Aucun layout
                        </Typography>
                      )}
                    </Stack>
                  </AccordionDetails>
                </Accordion>

              </Box>
            ))
              }
              </Box>

            </Container>
          )
        }
    </>
  );
};

export default Dashboard;
