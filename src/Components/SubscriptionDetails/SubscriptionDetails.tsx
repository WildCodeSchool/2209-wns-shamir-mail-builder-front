import { Card, CardContent, Typography, Divider } from '@mui/material';
import React from 'react';

export default function SubscriptionDetails() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">
          Mon abonnement
        </Typography>
        <Divider />
      </CardContent>
    </Card>
  );
}
