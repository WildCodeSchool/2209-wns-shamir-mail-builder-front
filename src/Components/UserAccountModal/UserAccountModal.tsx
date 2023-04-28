import React, { useState } from 'react';
import { Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { UserInfos } from '../../typeDefs/TypeDefs';

type UserAccountModalComponentProps = {
  userInfos: UserInfos;
  isModalOpened: boolean;
  handleModifyAccount: () => void;
  handleUpdateUser: (id: number, username: string, phone: string) => void;
};

export default function UserAccountModal({ userInfos, isModalOpened, handleModifyAccount, handleUpdateUser }: UserAccountModalComponentProps) {
  const [state, setState] = useState({
    username: '',
    phone: '',
  });

  const handleChange = (e: any) => {
    const { value } = e.target;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const updateUser = (id: number, username: string, phone: string) => {
    if (username === '') {
      username = userInfos.username;
    } else {
      username = state.username;
    }
    if (phone === '') {
      phone = userInfos.phone;
    } else {
      phone = state.phone;
    }
    handleUpdateUser(id, username, phone);
  };

  return (
    <Dialog
      open={isModalOpened}
      sx={{ width: '80%', m: 'auto' }}
    >
      <DialogTitle gutterBottom>Modifier vos informations?</DialogTitle>
      <Divider variant="middle" />
      <DialogContent sx={{ height: 200, width: 300, display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', mt: 5, flexDirection: 'column' }}>
        <TextField
          id="outlined-required-1"
          label="Nom d'utilisateur"
          InputLabelProps={{
            shrink: true,
          }}
          name="username"
          defaultValue={userInfos.username}
          onChange={handleChange}
        />
        <TextField
          id="outlined-number"
          label="Téléphone"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          name="phone"
          defaultValue={userInfos.phone}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 5 }}>
        <Button autoFocus sx={{ mr: 4 }} onClick={handleModifyAccount}>Annuler</Button>
        <Button onClick={() => updateUser(userInfos.id, state.username, state.phone)}>Valider</Button>
      </DialogActions>
    </Dialog>
  );
}
