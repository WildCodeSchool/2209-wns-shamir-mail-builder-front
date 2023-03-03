import { useState, useEffect, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContentStyle } from '../../../layouts/Main/UserLayoutConfig';
import { AuthContext } from '../../../AuthContext/Authcontext';

type ISubInfos = {
  username: string;
  subscriptionId: ISubscription;
};

type ISubscription = {
  name: string;
  info: string;
  price: number;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  subscriptionStatus: string;
};

export const SAVE_USER_SUB = gql`
mutation SaveUserSub($email: String!, $subscription: SubscriptionInput!) {
  saveUserSub(email: $email, subscription: $subscription) {
    username
  }
}`;

export default function StripeSuccess() {
  const { user } = useContext(AuthContext);
  const [subInfos, setSubInfos] = useState<ISubInfos | null>(null);

  const [saveSub] = useMutation(SAVE_USER_SUB, {
    onCompleted: (data) => {
      setSubInfos(data.saveUserSub);
    },
  });

  const nextMonth = new Date().getMonth() + 1;

  const newSubscription: ISubscription = {
    name: 'abonnement',
    info: 'mensuel',
    price: 9.99,
    subscriptionStart: new Date(),
    subscriptionEnd: new Date(new Date().setMonth(nextMonth)),
    subscriptionStatus: 'actif',
  };

  useEffect(() => {
    saveSub({ variables: { email: user.email, subscription: newSubscription } });
  }, []);

  return (
    <ContentStyle>
      <Container>
        <Typography variant="body1">
          {`Merci de vous être abonné
          ${subInfos?.username}
          .
          Profitez au mieux de notre outil.`}
        </Typography>
      </Container>
      <Link to="/">Back to Home page</Link>
    </ContentStyle>
  );
}
