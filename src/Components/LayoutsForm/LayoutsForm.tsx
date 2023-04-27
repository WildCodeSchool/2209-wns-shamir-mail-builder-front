import React from 'react';
import { Box, Button, FormGroup, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LayoutsForm = ({ handleSubmit, companiesId }: { handleSubmit: (values: any) => void, companiesId: string }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      children: [],
      preview: '',
      companyId: companiesId,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Champ requis'),
      description: Yup.string().required('Champ requis'),
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
        Creer un template
      </Typography>
      <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item md={12}>
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
                Nom du template
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

          <Grid item md={12}>
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
                Description du layout
              </InputLabel>
              <TextField
                id="description"
                name="description"
                type="te"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
                multiline
                rows={4}
                error={!!(formik.touched.description && formik.errors.description)}
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

export default LayoutsForm;
