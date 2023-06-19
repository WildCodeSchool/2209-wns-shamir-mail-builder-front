import React, { useState } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Stack, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { formatPhoneNumber } from '../../helpers';
import { Company } from '../../typeDefs/TypeDefs';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary: any = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

type CompanyDetailsComponentProps = {
  userCompanies: Company[];
};

export default function CompanyDetails({ userCompanies }: CompanyDetailsComponentProps) {
  const [expanded, setExpanded] = useState<string | false>('panel100');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {userCompanies.length === 0 && <Typography>Vous n'avez pas renseigné de société.</Typography>}
      {userCompanies.map((company, index) => (
        <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={company.id}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{company.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {`Dernière modification le: ${new Date(company.updatedAt).toLocaleDateString('fr')}`}
            </Typography>
            <Typography>{`Numéro de Siret: ${company.siret}`}</Typography>
            <Card elevation={0}>
              <CardHeader
                sx={{ pr: 20 }}
                title="Coordonnées"
              />
              <CardContent>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Typography>{`Téléphone: ${formatPhoneNumber(company.phone)}`}</Typography>
                  <Typography>{`Courriel: ${company.email}`}</Typography>
                </Stack>
                <Typography sx={{ mt: 2 }}>{`Adresse: ${company.address}`}</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Modifier les coordonnées</Button>
              </CardContent>
            </Card>
            <Divider variant="middle" />
            <Card elevation={0}>
              <CardHeader
                sx={{ pr: 20 }}
                title="Liens divers"
              />
              <CardContent>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Typography>Site web: </Typography>
                  <Typography>{company.website}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Typography>Facebook:</Typography>
                  <Typography>{company.facebook}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Typography>Instagram:</Typography>
                  <Typography>{company.instagram}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                  <Typography>Twitter:</Typography>
                  <Typography>{company.twitter}</Typography>
                </Stack>
                <Button variant="contained" sx={{ mt: 2 }}>Modifier les liens</Button>
              </CardContent>
            </Card>
            <Divider variant="middle" />
            <Card elevation={0}>
              <CardHeader
                sx={{ pr: 20 }}
                title="Description"
              />
              <CardContent>
                <Typography>{company.description}</Typography>
              </CardContent>
              <Button variant="contained" sx={{ mt: 2, mb: 2, ml: 2 }}>Modifier la description</Button>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
