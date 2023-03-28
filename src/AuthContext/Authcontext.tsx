import React, { useReducer, createContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Loader from '../layouts/Main/Loader';

const initialState = {
  user: null,
};

export const GET_TOKEN = gql`
mutation GetToken($email: String!, $password: String!) {
  getToken(email: $email, password: $password)
}`;

export type AuthContextType = {
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const token = localStorage.getItem('token');

if (token !== null) {
  const decodedToken: any = jwt_decode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const [loadToken, { loading, error }] = useMutation(GET_TOKEN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.getToken);
      navigate('/app/home');
    },
  });

  if (loading) return <Loader />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const login = (email: string, password: string) => {
    loadToken({ variables: { email, password } });
    dispatch({
      type: 'LOGIN',
      payload: { email },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
