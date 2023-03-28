import { useContext, useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { Container, Typography, Button } from '@mui/material';
import { ContentStyle } from '../layouts/Main/UserLayoutConfig';
import { AuthContext } from '../AuthContext/Authcontext';
// eslint-disable-next-line import/no-cycle
import SubscriptionDetails from '../Components/SubscriptionDetails/SubscriptionDetails';
import Loader from '../layouts/Main/Loader';

export const SUBSCRIBE = gql`
query Query{
  createSubscriptionSession
}`;

export const GET_USER_SUBSTATUS = gql`
query Query($email: String!) {
  getUserWithSubStatus(email: $email) {
    email
    subscriptionId {
      name
      info
      price
      subscriptionStart
      subscriptionEnd
      subscriptionStatus
    }
  }
}`;

export type SubDetails = {
  info: string;
  price: number;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  subscriptionStatus: string;
};

export default function Subscription() {
  const [isSubbed, setIsSubbed] = useState<boolean>(false);
  const [subDetails, setSubDetails] = useState<SubDetails | null>(null);
  const { user } = useContext(AuthContext);
  const [startSubscribe, { loading, error }] = useLazyQuery(SUBSCRIBE, {
    onCompleted: (queryData) => {
      const subData = JSON.parse(queryData.createSubscriptionSession);
      const subscribeUrl = subData.url;
      window.location.assign(subscribeUrl);
    },
  });

  if (user !== null) {
    const { loading: getUserSubStatusLoading,
      error: getUserSubStatusError } = useQuery(GET_USER_SUBSTATUS, {
      variables: {
        email: user.email,
      },
      onCompleted: (data) => {
        if (data.getUserWithSubStatus.subscriptionId !== null) {
          setIsSubbed(true);
          setSubDetails(data.getUserWithSubStatus.subscriptionId);
        }
      },
    });
    if (loading || getUserSubStatusLoading) {
      return (
        <Loader />
      );
    }

    if (error) {
      return (`${error}`);
    }
    if (getUserSubStatusError) {
      return (`${getUserSubStatusError.message}`);
    }
  }

  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          {isSubbed && subDetails
          && <SubscriptionDetails subDetails={subDetails} /> }
          {!isSubbed
          && (
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
          )}
        </Typography>
      </Container>
    </ContentStyle>
  );
}
