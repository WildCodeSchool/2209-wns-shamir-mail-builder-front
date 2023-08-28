import React, { useContext } from 'react';
import { Box, Button, FormGroup, Grid, TextField, Typography } from '@mui/material';
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
      name: Yup.string().required('Champ requis'),
      siret: Yup.string()
        .length(14, '14 chiffres maximum')
        .matches(/^[0-9]{14}$/, 'Siret Invalide')
        .required('Champ requis'),
      address: Yup.string().required('Champ requis'),
      phone: Yup.string()
        .matches(/^[0]{1}[1-7]{1}[0-9]{8}$/, 'Numéro invalide')
        .required('Champ requis'),
      email: Yup.string().email('Email invalide').required('Champ requis'),
      website: Yup.string().required('Champ requis'),
      facebook: Yup.string().required('Champ requis'),
      instagram: Yup.string().required('Champ requis'),
      twitter: Yup.string().required('Champ requis'),
      description: Yup.string().required('Champ requis'),
      logo: Yup.string().required('Champ requis'),
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
          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="name"
                label="Nom de la compagnie"
                InputLabelProps={{
                  shrink: true,
                }}
                name="name"
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

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Siret"
                id="siret"
                name="siret"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.siret}
                helperText={
                  formik.touched.siret && formik.errors.siret ? formik.errors.siret : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.siret && formik.errors.siret)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="address"
                name="address"
                type="text"
                label="Adresse"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                helperText={
                  formik.touched.address && formik.errors.address ? formik.errors.address : null
                }
                sx={{
                  width: '100%',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                }}
                error={!!(formik.touched.address && formik.errors.address)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="phone"
                name="phone"
                type="text"
                label="Téléphone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                helperText={
                  formik.touched.phone && formik.errors.phone ? formik.errors.phone : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.phone && formik.errors.phone)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="email"
                name="email"
                type="text"
                label="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={
                  formik.touched.email && formik.errors.email ? formik.errors.email : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.email && formik.errors.email)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="website"
                name="website"
                type="text"
                label="Site web"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.website}
                helperText={
                  formik.touched.website && formik.errors.website ? formik.errors.website : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.website && formik.errors.website)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="facebook"
                name="facebook"
                type="text"
                label="Facebook"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.facebook}
                helperText={
                  formik.touched.facebook && formik.errors.facebook ? formik.errors.facebook : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.facebook && formik.errors.facebook)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="instagram"
                name="instagram"
                type="text"
                label="Instagram"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instagram}
                helperText={
                  formik.touched.instagram && formik.errors.instagram
                    ? formik.errors.instagram
                    : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.instagram && formik.errors.instagram)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="twitter"
                name="twitter"
                type="text"
                label="Twitter"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twitter}
                helperText={
                  formik.touched.twitter && formik.errors.twitter ? formik.errors.twitter : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.twitter && formik.errors.twitter)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="description"
                name="description"
                type="text"
                label="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : null
                }
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!(formik.touched.description && formik.errors.description)}
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <FormGroup
              sx={{
                marginBottom: '16px',
              }}
            >
              <TextField
                id="logo"
                name="logo"
                type="text"
                label="Logo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.logo}
                helperText={formik.touched.logo && formik.errors.logo ? formik.errors.logo : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                InputLabelProps={{
                  shrink: true,
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
          <Button variant="contained" type="submit">
            Créer
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CompaniesForm;
