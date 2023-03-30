import React, { useState } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Stack, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Companies } from '../../typeDefs/TypeDefs';

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

const AccordionSummary = styled((props: AccordionSummaryProps) => (
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
  userCompanies: Companies[];
};

export default function CompanyDetails({ userCompanies }: CompanyDetailsComponentProps) {
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {userCompanies.length === 0 && <Typography>Vous n'avez pas renseigné de société.</Typography>}
      {userCompanies.map((company, index) => (
        <Accordion expanded={expanded === `panel${index}`} onChange={handleChange('panel0')} key={company.id}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{company.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {`Dernière modification le: ${new Date(company.updatedAt).toLocaleDateString('fr')}`}
            </Typography>
            <Typography>{`Numéro de Siret: ${company.siret}`}</Typography>
            <Card sx={{ elevation: 0 }}>
              <CardHeader
                sx={{ pr: 20 }}
                title="Coordonnées"
              />
              <CardContent>
                <Stack direction="row" spacing={1} justifyContent="space-around" alignItems="center">
                  <Typography>{`Téléphone: ${company.phone}`}</Typography>
                  <Typography>{`Courriel: ${company.email}`}</Typography>
                </Stack>
                <Typography>{`Adresse: ${company.address}`}</Typography>
                <Button>Modifier les coordonnées</Button>
              </CardContent>
            </Card>
            <Divider variant="middle" />
            <Card>
              <CardHeader
                sx={{ pr: 20 }}
                title="Liens divers"
              />
              <CardContent>
                <Stack direction="column" spacing={1} justifyContent="space-around" alignItems="center">
                  <Typography>{`Site web: ${company.website}`}</Typography>
                  <Typography>{`Facebook: ${company.facebook}`}</Typography>
                  <Typography>{`Instagram: ${company.instagram}`}</Typography>
                  <Typography>{`Twitter: ${company.twitter}`}</Typography>
                </Stack>
                <Button>Modifier les liens</Button>
              </CardContent>
            </Card>
            <Divider variant="middle" />
            <Card>
              <CardHeader
                sx={{ pr: 20 }}
                title="Description"
              />
              <CardContent>
                <Typography>{company.description}</Typography>
              </CardContent>
              <Button>Modifier la description</Button>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
