import React from 'react';
import { Card, CardHeader, CardContent, Typography, Stack, Button } from '@mui/material';
import { Layout } from '../../typeDefs/TypeDefs';

type LayoutCardComponentProps = {
  layout: Layout;
};

export default function LayoutCard({ layout }: LayoutCardComponentProps) {
  return (
    <Card elevation={0}>
      <CardHeader
        sx={{ pr: 20 }}
        title={layout.name}
      />
      <CardContent>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Description:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {layout.description}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Créé le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(layout.createdAt).toLocaleDateString('fr')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Modifié le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(layout.updatedAt).toLocaleDateString('fr')}
          </Typography>
        </Stack>
        <Button
          variant="contained"
        >
          Créer une maquette
        </Button>
      </CardContent>
    </Card>
  );
}
