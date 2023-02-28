import { useContext, useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Container, Typography, Button } from '@mui/material';
import { ContentStyle } from '../layouts/Main/UserLayoutConfig';
import { AuthContext } from '../AuthContext/Authcontext';

export const SUBSCRIBE = gql`
query Query{
  createSubscriptionSession
}`;

export const GET_USER_SUBSTATUS = gql`
query Query($email: String!) {
  getUserWithSubStatus(email: $email) {
    email
    subscriptionId {
      subscriptionStatus
    }
  }
}`;

export default function Subscription() {
  const [isSubbed, setIsSubbed] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const [startSubscribe, { loading, error }] = useLazyQuery(SUBSCRIBE, {
    onCompleted: (queryData) => {
      const subData = JSON.parse(queryData.createSubscriptionSession);
      const subscribeUrl = subData.url;
      window.location.assign(subscribeUrl);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (`${error}`);
  }

  const [getUserWithStatus] = useLazyQuery(GET_USER_SUBSTATUS, {
    onCompleted: (data) => {
      if (data.getUserWithSubStatus.subscriptionId.subscriptionStatus === 'active') {
        setIsSubbed(true);
      } else setIsSubbed(false);
    },
  });

  useEffect(() => {
    if (user !== null) {
      getUserWithStatus({ variables: { email: user.email } });
    }
  }, [user]);

  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          {!isSubbed
            ? (
              <>
                <p>Vous n&#39;êtes pas abonné</p>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => startSubscribe()}
                >
                  M&#39;abonner
                </Button>
              </>
            )
            : null}
        </Typography>
      </Container>
    </ContentStyle>
  );
}
