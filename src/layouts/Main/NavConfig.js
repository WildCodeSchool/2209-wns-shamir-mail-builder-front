import Iconify from '../../Components/Iconify';

import { PATH_PUBLIC, PATH_USER } from '../../routes/paths';

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const ICONS = {
  home: getIcon('line-md:home-twotone'),
  documentation: getIcon('ic:baseline-apps'),
  shop: getIcon('ps:cart-supermarket'),
  account: getIcon('ic:baseline-account-circle'),
};

const NavConfig = [
  {
    title: 'Acceuil',
    icon: ICONS.home,
    path: '/',
  },

  {
    title: 'Documentation',
    icon: ICONS.documentation,
    path: PATH_PUBLIC.documentation,
  },
  {
    title: 'Abonnement',
    icon: ICONS.shop,
    path: PATH_PUBLIC.subscription,
  },
  {
    title: 'MON COMPTE',
    icon: ICONS.account,
    path: PATH_USER.account,
    children: [
      {
        title: 'Mes informations',
        subheader: 'Mon Compte Pro',
        items: [{ title: 'Mes informations', path: PATH_PUBLIC.root }],
      },
      {
        title: 'Mes abonnements',
        subheader: 'Application Mail',
        items: [
          {
            title: 'MailBuilder',
            subheader: 'Application de création de mail',
            path: PATH_PUBLIC.root,
            icon: ICONS.account,
          },
        ],
      },
    ],
  },
];
export default NavConfig;
