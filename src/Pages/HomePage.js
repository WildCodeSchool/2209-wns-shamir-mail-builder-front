import { Box, Stack, Typography, Button } from '@mui/material';
import { ContentStyle } from '../layouts/Main/UserLayoutConfig';

export default function HomePage() {
  return (
    <ContentStyle>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 10 }}
        sx={{
          flexDirection: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '100%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            p: 5,
            gap: 5,
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            Dépassez les limites
          </Typography>

          <Stack direction={'row'} spacing={{ xs: 1, sm: 2, md: 10 }}>
            <Button variant="contained" color="primary" size="small">
              Essayer gratuitement
            </Button>
            <Button variant="outlined" color="primary" size="small">
              En savoir plus
            </Button>
          </Stack>
        </Box>
        <Box
          component="img"
          src="./static/app_mock.png"
          sx={{
            width: 'calc(100% - 90px)',
            height: 'auto',
          }}
        />
      </Stack>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80%',
          height: '100%',
          backgroundImage: 'url(./static/social_bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',

          backgroundPosition: 'right',
          filter: 'blur(1px)',
          zIndex: -1,
        }}
      />
    </ContentStyle>
  );
}
