import React from 'react';
import { Typography, Box, Card, CardHeader, Divider, CardContent } from '@mui/material';
import LayoutCard from '../LayoutCard/LayoutCard';
import { Company } from '../../typeDefs/TypeDefs';

type LayoutDetailsComponentProps = {
  companies: Company[];
};

export default function LayoutDetails({ companies }: LayoutDetailsComponentProps) {
  // console.log('layouts', layouts);
  return (
    <Box>
      <Typography variant="h5">Liste de vos maquettes</Typography>
      {companies.length === 0 && <Typography>Vous n'avez pas encore créé de maquette</Typography>}
      {companies.map((company) => (
        <Card elevation={0} sx={{ width: '100%', height: '100%' }} key={company.id}>
          <CardHeader
            sx={{ pr: 40 }}
            title={company.name}
            subheader="Vos maquettes pour cette société"
          />
          <Divider />
          <CardContent sx={{ pt: 5, pb: 5 }}>
            {company.layouts.length > 0
              ? company.layouts.map((layout) => (
                <LayoutCard
                  key={layout.id}
                  layout={layout}
                />
              ))
              : <Typography>Vous n'avez pas encore de maquette pour cette société</Typography>}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
