import React, { useContext } from 'react';
import { Box, Button, FormGroup, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../AuthContext/Authcontext';

const CompaniesForm = ({ handleSubmit }: { handleSubmit: (values: any) => void }) => {
  const { user } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      name: '',
      siret: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      facebook: '',
      instagram: '',
      twitter: '',
      description: '',
      logo: '',
      userId: `${user.id}`,
      subscribed: true,
    },
    onSubmit: (values) => {
      handleSubmit({
        name: values.name,
        siret: values.siret,
        address: values.address,
        phone: values.phone,
        email: values.email,
        website: values.website,
        facebook: values.facebook,
        instagram: values.instagram,
        twitter: values.twitter,
        description: values.description,
        logo: values.logo,
        userId: values.userId,
        subscribed: values.subscribed,
      });
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Champ requis'),
      siret: Yup.string()
        .required('Champ requis'),
      address: Yup.string()
        .required('Champ requis'),
      phone: Yup.string()
        .required('Champ requis'),
      email: Yup.string()
        .email('Email invalide')
        .required('Champ requis'),
      website: Yup.string()
        .required('Champ requis'),
      facebook: Yup.string()
        .required('Champ requis'),
      instagram: Yup.string()
        .required('Champ requis'),
      twitter: Yup.string()
        .required('Champ requis'),
      description: Yup.string()
        .required('Champ requis'),
      logo: Yup.string()
        .required('Champ requis'),
    }),
  });
  return (
    <>
      <Typography
        variant={'h1'}
        sx={{
          '@media screen and (max-width: 900px)': {
            fontSize: '1.5rem',
          },
        }}
      >
        Creer une compagnie
      </Typography>
      <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="name"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Nom de la compagnie
              </InputLabel>
              <TextField
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.name && formik.errors.name)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="siret"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                N° de SIRET
              </InputLabel>
              <TextField
                id="siret"
                name="siret"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.siret}
                helperText={formik.touched.siret && formik.errors.siret ? formik.errors.siret : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.siret && formik.errors.siret)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="address"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Adresse
              </InputLabel>
              <TextField
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                helperText={formik.touched.address && formik.errors.address ? formik.errors.address : null}
                sx={{
                  width: '100%',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.address && formik.errors.address)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="phone"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Téléphone
              </InputLabel>
              <TextField
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.phone && formik.errors.phone)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="email"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Email
              </InputLabel>
              <TextField
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.email && formik.errors.email)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="website"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Site internet
              </InputLabel>
              <TextField
                id="website"
                name="website"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.website}
                helperText={formik.touched.website && formik.errors.website ? formik.errors.website : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.website && formik.errors.website)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="facebook"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Facebook
              </InputLabel>
              <TextField
                id="facebook"
                name="facebook"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.facebook}
                helperText={formik.touched.facebook && formik.errors.facebook ? formik.errors.facebook : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.facebook && formik.errors.facebook)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="instagram"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Instagram
              </InputLabel>
              <TextField
                id="instagram"
                name="instagram"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instagram}
                helperText={formik.touched.instagram && formik.errors.instagram ? formik.errors.instagram : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.instagram && formik.errors.instagram)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="twitter"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Twitter
              </InputLabel>
              <TextField
                id="twitter"
                name="twitter"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twitter}
                helperText={formik.touched.twitter && formik.errors.twitter ? formik.errors.twitter : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.twitter && formik.errors.twitter)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="description"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Description
              </InputLabel>
              <TextField
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.description && formik.errors.description)}
              />
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <InputLabel
                htmlFor="logo"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Logo
              </InputLabel>
              <TextField
                id="logo"
                name="logo"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.logo}
                helperText={formik.touched.logo && formik.errors.logo ? formik.errors.logo : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.logo && formik.errors.logo)}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            type="submit"
          >
            Créer
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CompaniesForm;
