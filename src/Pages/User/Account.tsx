import { useState, useContext } from 'react';
import { Typography, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useQuery, useMutation } from '@apollo/client';
import Loader from '../../layouts/Main/Loader';
import UserAccountModal from '../../Components/UserAccountModal/UserAccountModal';
import UserDetails from '../../Components/UserDetails/UserDetails';
import LayoutDetails from '../../Components/LayoutDetails/LayoutDetails';
import CompanyDetails from '../../Components/CompanyDetails/CompanyDetails';
import { UserInfos, Company } from '../../typeDefs/TypeDefs';
import { AuthContext } from '../../AuthContext/Authcontext';
import { GET_USER, GET_USER_COMPANIES, GET_COMPANIES_WITH_LAYOUTS } from '../../graphql/Queries';
import { UPDATE_USER } from '../../graphql/Mutations';

export default function UserAccount() {
  const { user } = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const [userCompanies, setUserCompanies] = useState<Company[] | null>(null);
  const [companies, setCompanies] = useState<Company[] | null>(null);
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
    },
  });

  const { loading: userCompaniesLoading, error: userCompaniesError } = useQuery(GET_USER_COMPANIES, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setUserCompanies(data?.getUserCompanies);
    },
  });

  const { loading: layoutsLoading, error: layoutsError } = useQuery(GET_COMPANIES_WITH_LAYOUTS, {
    variables: {
      userId: user.id,
    },
    onCompleted: (data) => {
      setCompanies(data?.getCompaniesWithLayouts);
    },
  });

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER, {
    onCompleted: (updateUserData) => {
      setUserInfos(updateUserData.updateUser);
      setIsModalOpened(false);
    },
  });

  if (loading || userCompaniesLoading || layoutsLoading || updateUserLoading) return <Loader />;
  if (error) return <Typography>{error.message}</Typography>;
  if (userCompaniesError) return <Typography>{userCompaniesError.message}</Typography>;
  if (layoutsError) return <Typography>{layoutsError.message}</Typography>;
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
        <TabPanel value="2">{companies && <LayoutDetails companies={companies} />}</TabPanel>
        <TabPanel value="3">{userCompanies && <CompanyDetails userCompanies={userCompanies} />}</TabPanel>
      </TabContext>
      {isModalOpened
        && userInfos
        && <UserAccountModal userInfos={userInfos} isModalOpened={isModalOpened} handleModifyAccount={handleModifyAccount} handleUpdateUser={handleUpdateUser} />}
    </Box>
  );
}
