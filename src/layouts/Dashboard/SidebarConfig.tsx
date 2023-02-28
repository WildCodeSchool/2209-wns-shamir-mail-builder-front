interface SidebarConfig {
  component: string;
  descriptionComponent: string;
  usageComponent: string;
  codeComponent?: number;
  children?: SidebarConfig[];
}

const sidebarConfig: SidebarConfig[] = [
  {
    component: 'Button',
    descriptionComponent: 'Liste composants librairie',
    usageComponent: 'Login',
    codeComponent: 11,
    children: [
      {
        component: 'Button',
        descriptionComponent: 'Bouton Submit',
        usageComponent: 'Bouton de validation',
      },
      {
        component: 'Button',
        descriptionComponent: 'Bouton template',
        usageComponent: 'Bouton template',
      },
      {
        component: 'Button',
        descriptionComponent: 'Bouton template',
        usageComponent: 'Bouton template',
      },
    ],
  },
  {
    component: 'Slider',
    descriptionComponent: 'Slider template',
    usageComponent: 'Slider Uncontrolled',
    codeComponent: 12,
    children: [
      {
        component: 'Slider',
        descriptionComponent: 'Slider template',
        usageComponent: 'Slider Uncontrolled',
      },
      {
        component: 'Slider',
        descriptionComponent: 'Slider template',
        usageComponent: 'Slider Uncontrolled',
      },
      {
        component: 'Slider',
        descriptionComponent: 'Slider template',
        usageComponent: 'Slider Uncontrolled',
      },
    ],
  },
  {
    component: 'Switch',
    descriptionComponent: 'Switch template',
    usageComponent: 'Switch Uncontrolled',
    codeComponent: 13,
    children: [
      {
        component: 'Switch',
        descriptionComponent: 'Switch template',
        usageComponent: 'Switch Uncontrolled',
      },

      {
        component: 'Switch',
        descriptionComponent: 'Switch template',
        usageComponent: 'Switch Uncontrolled',
      },
      {
        component: 'Switch',
        descriptionComponent: 'Switch template',
        usageComponent: 'Switch Uncontrolled',
      },
    ],
  },
];

export default sidebarConfig;
