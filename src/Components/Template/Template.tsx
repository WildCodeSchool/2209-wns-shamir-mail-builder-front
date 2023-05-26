import React from 'react';
import { Card, CardHeader, CardContent, Typography, Stack, Button } from '@mui/material';
import { Template } from '../../typeDefs/TypeDefs';

type TemplateComponentProps = {
  template: Template;
};

export default function TemplateItem({ template }: TemplateComponentProps) {
  return (
    <Card elevation={0}>
      <CardHeader
        sx={{ pr: 20 }}
        title={template.name}
        subheader={template.subject}
      />
      <CardContent>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Société:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {template.companyId.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Créé le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(template.createdAt).toLocaleDateString('fr')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Modifié le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(template.updatedAt).toLocaleDateString('fr')}
          </Typography>
        </Stack>
        <Button>Créer une maquette</Button>
      </CardContent>
    </Card>
  );
}
