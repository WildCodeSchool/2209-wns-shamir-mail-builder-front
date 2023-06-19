import React, { useContext, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../Main/Header';
import { setLayout } from '../../features/layout/layoutSlice';
import { setSelectedLayout } from '../../features/layout/selectedComponent';
import { AuthContext } from '../../AuthContext/Authcontext';
import { NEW_COMPANY, NEW_LAYOUT } from '../../graphql/Mutations';
import { GET_COMPANIES_WITH_LAYOUTS } from '../../graphql/Queries';
import { Company } from '../../typeDefs/TypeDefs';
import CompaniesForm from '../../Components/CompaniesForm/CompaniesForm';
import LayoutsForm from '../../Components/LayoutsForm/LayoutsForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  maxWidth: '800px',
  p: 4,
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [userLayouts, setUserLayouts] = React.useState<any>([]);
  const [layoutSelected, setLayoutSelected] = React.useState<any>(false);
  const [openModalCompanies, setOpenModalCompanies] = React.useState(false);
  const [openModalLayouts, setOpenModalLayouts] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState<any>(null);
  const [getLayouts] = useLazyQuery(GET_COMPANIES_WITH_LAYOUTS, {
    onCompleted: (data: any) => {
      setUserLayouts(data.getCompaniesWithLayouts);
    },
  });
  const [createCompany] = useMutation(NEW_COMPANY, {
    onCompleted: (data: any) => {
      setOpenModalCompanies(false);
      setUserLayouts([
        ...userLayouts,
        {
          ...data.createCompany,
          layouts: [],
        },
      ]);
    },
  });
  const [createLayout] = useMutation(NEW_LAYOUT, {
    onCompleted: (data: any) => {
      setOpenModalLayouts(false);
      setUserLayouts((prev: any) => prev.map((company: any) => {
        if (company.id === selectedCompany) {
          return {
            ...company,
            layouts: [
              ...company.layouts,
              data.newLayout,
            ],
          };
        }
        return company;
      }));
    },
  });

  const handleSubmitFormCompany = (values: Company) => {
    createCompany({
      variables: {
        company: values,
        userEmail: user.email,
      },
    });
  };

  const handleOpenModalCompanies = () => {
    setOpenModalCompanies(true);
  };

  const handleOpenModalLayouts = (companyId: number) => {
    setOpenModalLayouts(true);
    setSelectedCompany(companyId);
  };

  const handleCloseModalLayouts = () => {
    setOpenModalLayouts(false);
  };

  const handleCloseModalCompanies = () => {
    setOpenModalCompanies(false);
  };

  const handleSubmitFormLayouts = (values: any) => {
    createLayout(
      {
        variables: {
          layout: {
            layout: {
              name: values.name,
              description: values.description,
            },
          },
          companyId: values.companyId,
        },
      },
    );
  };

  /*
  Récupération des layouts de l'utilisateur au montage du composant
   */
  useEffect(() => {
    (async () => getLayouts({
      variables: {
        userId: user.id,
      },
    }))();
  }, [user]);

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
                onClick={handleOpenModalCompanies}
              >
                Enregistrer votre société
              </Button>
              {
                openModalCompanies && (
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openModalCompanies}
                    onClose={handleCloseModalCompanies}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                  >
                    <Fade in={openModalCompanies}>
                      <Box sx={style}>
                        <CompaniesForm handleSubmit={handleSubmitFormCompany} />
                      </Box>
                    </Fade>
                  </Modal>
                )
              }
              <Box
                my={5}
              >
                {
                  openModalLayouts && (
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={openModalLayouts}
                      onClose={handleCloseModalLayouts}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                    >
                      <Fade in={openModalLayouts}>
                        <Box sx={style}>
                          <LayoutsForm handleSubmit={handleSubmitFormLayouts} companiesId={selectedCompany} />
                        </Box>
                      </Fade>
                    </Modal>
                  )
                }
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
                            {companies.id}
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
                              handleOpenModalLayouts(companies.id);
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
                          {companies.layouts.length > 0 ? companies?.layouts.map((companie: any) => (
                            <Box
                              key={companie.id}
                            >
                              <img
                                src={companie.preview !== '' ? companie.preview : 'http://fakeimg.pl/180x180'}
                                alt="layout"
                                style={{
                                  width: '100%',
                                  height: '180px',
                                  maxWidth: '180px',
                                  objectFit: 'cover',
                                  border: '1px solid #000',
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
