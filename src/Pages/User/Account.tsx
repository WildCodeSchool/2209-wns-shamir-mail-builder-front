import { useState, useContext } from 'react';
import { Typography, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loader from '../../layouts/Main/Loader';
// import { ContentStyle } from '../../layouts/Main/UserLayoutConfig';
import UserAccountModal from '../../Components/UserAccountModal/UserAccountModal';
import UserDetails from '../../Components/UserDetails/UserDetails';
import TemplateDetails from '../../Components/TemplateDetails/TemplateDetails';
import CompanyDetails from '../../Components/CompanyDetails/CompanyDetails';
import { UserInfos, Template, Companies } from '../../typeDefs/TypeDefs';
import { AuthContext } from '../../AuthContext/Authcontext';

const GET_USER = gql`
query GetUser($email: String!) {
    getOneUser(email: $email) {
      id
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

export const UPDATE_USER = gql`
mutation Mutation($id: Float!, $username: String!, $phone: String!) {
  updateUser(id: $id, username: $username, phone: $phone) {
    id
    username
    email
    phone
    createdAt
  }
}`;

export default function UserAccount() {
  const { user } = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const [userCompanies, setUserCompanies] = useState<Companies[] | null>(null);
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { loading, error } = useQuery(GET_USER, {
    variables: {
      email: user.email,
    },
    onCompleted: (data) => {
      setUserInfos(data?.getOneUser);
      setUserCompanies(data?.getOneUser.companies);
    },
  });

  const { loading: templatesLoading, error: templatesError } = useQuery(GET_USER_TEMPLATES, {
    variables: {
      email: user.email,
    },
    onCompleted: (data) => {
      setTemplates(data?.getUserTemplates);
    },
  });

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER, {
    onCompleted: (updateUserData) => {
      setUserInfos(updateUserData.updateUser);
      setIsModalOpened(false);
    },
  });

  if (loading || templatesLoading || updateUserLoading) return <Loader />;
  if (error) return <Typography>{error.message}</Typography>;
  if (templatesError) return <Typography>{templatesError.message}</Typography>;
  if (updateUserError) return <Typography>{updateUserError.message}</Typography>;

  const handleModifyAccount = () => {
    setIsModalOpened(!isModalOpened);
  };

  const handleUpdateUser = (id: number, username: string, phone: string) => {
    updateUser({ variables: { id, username, phone } });
  };

  return (
    <Box sx={{ width: '60%', height: '70%', typography: 'body1', mt: 12, ml: 'auto', mr: 'auto' }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Utilisateur" value="1" />
            <Tab label="Maquettes" value="2" />
            <Tab label="Sociétés" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">{userInfos && <UserDetails userInfos={userInfos} handleModifyAccount={handleModifyAccount} />}</TabPanel>
        <TabPanel value="2">{templates && <TemplateDetails templates={templates} />}</TabPanel>
        <TabPanel value="3">{userCompanies && <CompanyDetails userCompanies={userCompanies} />}</TabPanel>
      </TabContext>
      {isModalOpened
&& userInfos
&& <UserAccountModal userInfos={userInfos} isModalOpened={isModalOpened} handleModifyAccount={handleModifyAccount} handleUpdateUser={handleUpdateUser} /> }
    </Box>
  );
}
