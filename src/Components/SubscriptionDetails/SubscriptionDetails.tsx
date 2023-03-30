import React from 'react';
import { Typography, Divider, Stack, Card, CardHeader, CardContent, Button } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { SubDetails } from '../../typeDefs/TypeDefs';

type SubscriptionDetailsProps = {
  subDetails: SubDetails;
};

export default function SubscriptionDetails({ subDetails }: SubscriptionDetailsProps) {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        sx={{ pr: 20 }}
        title="Récapitulatif"
        subheader="Votre abonnement en détail"
      />
      <Divider />
      <CardContent sx={{ pt: 5, pb: 5 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Statut de l&#39;abonnement:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {subDetails?.subscriptionStatus}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Type d&#39;abonnement:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {subDetails?.info}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Tarif:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {subDetails?.price}
            €
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Commence le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(subDetails?.subscriptionStart).toLocaleDateString('fr')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Termine le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(subDetails?.subscriptionEnd).toLocaleDateString('fr')}
          </Typography>
        </Stack>
      </CardContent>
      <Button variant="contained" sx={{ mb: 5 }}>Gérer mon abonnement</Button>
    </Card>
  );
}
