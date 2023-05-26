import { Typography, Stack, Divider, CardContent, CardHeader, Card, Button } from '@mui/material';
import { UserInfos } from '../../typeDefs/TypeDefs';
import { formatPhoneNumber } from '../../helpers';

type UserDetailsComponentProps = {
  userInfos: UserInfos;
  handleModifyAccount: () => void;
};

export default function UserDetails({ userInfos, handleModifyAccount }: UserDetailsComponentProps) {
  const formattedPhoneNumber = formatPhoneNumber(userInfos.phone);

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardHeader
        sx={{ pr: 40 }}
        title={userInfos?.username}
        subheader="Vos informations"
      />
      <Divider />
      <CardContent sx={{ pt: 5, pb: 5 }}>
        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Compte créé le:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(userInfos?.createdAt).toLocaleDateString('fr')}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Adresse mail:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {userInfos?.email}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Téléphone:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formattedPhoneNumber}
          </Typography>
        </Stack>
        <Button variant="contained" sx={{ mt: 5 }} onClick={() => handleModifyAccount()}>Gérer mon compte</Button>
      </CardContent>
    </Card>
  );
}
