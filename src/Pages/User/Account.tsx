import { useState, useContext } from 'react';
import { Container, Typography, Stack, Button } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import Loader from '../../layouts/Main/Loader';
import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import UserAccountModal from '../../Components/UserAccountModal/UserAccountModal';
import UserDetails from '../../Components/UserDetails/UserDetails';
import TemplateDetails from '../../Components/TemplateDetails/TemplateDetails';
import CompanyDetails from '../../Components/CompanyDetails/CompanyDetails';
import { UserInfos, Template, Companies } from '../../typeDefs/TypeDefs';
import { AuthContext } from '../../AuthContext/Authcontext';

const GET_USER = gql`
query GetUser($email: String!) {
    getOneUser(email: $email) {
      username
      email
      phone
      createdAt
      companies {
        id
        name
        siret
        phone
        email
        address
        website
        facebook
        instagram
        twitter
        description
        createdAt
        updatedAt
      }
    }
}`;

export const GET_USER_TEMPLATES = gql`
query Query($email: String!) {
    getUserTemplates(email: $email) {
        id
        name
        subject
        createdAt
        updatedAt
        companyId {
            name
        }

    }
}`;

export default function UserAccount() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const [userCompanies, setUserCompanies] = useState<Companies[] | null>(null);
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { loading, error } = useQuery(GET_USER, {
    variables: {
      email: user.email,
    },
    onCompleted: (data) => {
      setUserInfos(data.getOneUser);
      setUserCompanies(data.getOneUser.companies);
    },
  });

  const { loading: templatesLoading, error: templatesError } = useQuery(GET_USER_TEMPLATES, {
    variables: {
      email: user.email,
    },
    onCompleted: (data) => {
      setTemplates(data.getUserTemplates);
    },
  });

  if (loading || templatesLoading) return <Loader />;
  if (error) return <Typography>{error.message}</Typography>;
  if (templatesError) return <Typography>{templatesError.message}</Typography>;

  const handleModifyAccount = () => {
    setIsModalOpened(!isModalOpened);
  };

  return (
    <ContentStyle>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={1} justifyContent="space-evenly" alignItems="center" className="tabs-container">
          <Button onClick={() => setActiveTab(1)} className={activeTab === 1 ? '' : 'disabled'}>Utilisateur</Button>
          <Button onClick={() => setActiveTab(2)} className={activeTab === 2 ? '' : 'disabled'}>Templates</Button>
          <Button onClick={() => setActiveTab(3)} className={activeTab === 3 ? '' : 'disabled'}>Sociétés</Button>
        </Stack>
        {activeTab === 1 && userInfos && <UserDetails userInfos={userInfos} handleModifyAccount={handleModifyAccount} />}
        {activeTab === 2 && templates && <TemplateDetails templates={templates} />}
        {activeTab === 3 && userCompanies && <CompanyDetails userCompanies={userCompanies} />}
        {isModalOpened
        && userInfos
        && <UserAccountModal userInfos={userInfos} isModalOpened={isModalOpened} handleModifyAccount={handleModifyAccount} /> }
      </Container>
    </ContentStyle>
  );
}
