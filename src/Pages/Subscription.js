import { gql, useLazyQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import { ContentStyle } from '../layouts/Main/UserLayoutConfig';

export const SUBSCRIBE = gql`
query Query{
  createSubscriptionSession
}`;

export default function Subscription() {
  const [startSubscribe, { loading, error, data }] = useLazyQuery(SUBSCRIBE, {
    onCompleted: (queryData) => {
      console.log(queryData, data);
      const subData = JSON.parse(queryData.createSubscriptionSession);
      console.log(subData);
      const subscribeUrl = subData.url;
      window.location.assign(subscribeUrl);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (`${error}`);
  }

  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          <p>Vous n&#39;êtes pas abonné</p>
          <button type="button" onClick={() => startSubscribe()}>M&#39;abonner</button>
        </Typography>
      </Container>
    </ContentStyle>
  );
}
