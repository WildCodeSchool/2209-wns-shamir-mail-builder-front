import shortid from 'shortid';

export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW_COMPONENT = 'row';
export const COLUMN = 'column';
export const COMPONENT = 'component';
export const CONTAINER = 'container';
export const PARENT_COMPONENT = 'parentComponent';
export const GRID = 'grid1';
export const GRID2 = 'grid2';
export const GRID3 = 'grid3';
export const SIDEBAR_TEXT_ITEM = 'sidebarTextItem';
export const SIDEBAR_IMAGE_ITEM = 'sidebarImageItem';
export const SIDEBAR_SOCIAL_ITEM = 'sidebarSocialItem';
export const DRAGGABLE_COMPONENTS = [
  {
    id: shortid.generate(),
    type: GRID,
    component: {
      type: GRID,
      content: 'Grille 1 colonnes',
    },
  },
  {
    id: shortid.generate(),
    type: GRID2,
    component: {
      type: GRID2,
      content: 'Grille 2 colonnes',
    },
  },
  {
    id: shortid.generate(),
    type: GRID3,
    component: {
      type: GRID3,
      content: 'Grille 3 colonnes',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: SIDEBAR_TEXT_ITEM,
      content: 'Texte',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: SIDEBAR_IMAGE_ITEM,
      content: 'Image',
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: SIDEBAR_SOCIAL_ITEM,
      content: 'Social',
    },
  },
];
