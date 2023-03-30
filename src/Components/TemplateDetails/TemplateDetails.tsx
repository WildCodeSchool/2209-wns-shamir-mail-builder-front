import React from 'react';
import { Typography, Box } from '@mui/material';
import TemplateItem from '../Template/Template';
import { Template } from '../../typeDefs/TypeDefs';

type TemplateDetailsComponentProps = {
  templates: Template[];
};

export default function TemplateDetails({ templates }: TemplateDetailsComponentProps) {
  return (
    <Box>
      <Typography variant="h5">Liste de vos maquettes</Typography>
      {templates.length === 0 && <Typography>Vous n'avez pas encore créé de maquette</Typography>}
      {templates.map((template) => (
        <TemplateItem
          key={template.id}
          template={template}
        />
      ))}
    </Box>
  );
}
