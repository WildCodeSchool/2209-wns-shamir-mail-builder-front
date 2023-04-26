import shortid from 'shortid';

export const SIDEBAR_ITEM = 'sidebarItem';
export const ROW_COMPONENT = 'row';
export const COLUMN = 'column';
export const CONTAINER = 'container';
export const PARENT_COMPONENT = 'parentComponent';
export const GRID = 'grid1';
export const GRID2 = 'grid2';
export const GRID2_1_3_L = 'grid2_1_3_L';
export const GRID2_1_3_R = 'grid2_1_3_R';
export const GRID3 = 'grid3';
export const SIDEBAR_TEXT_ITEM = 'sidebarTextItem';
export const SIDEBAR_IMAGE_ITEM = 'sidebarImageItem';
export const SIDEBAR_SOCIAL_ITEM = 'sidebarSocialItem';
export const SIDEBAR_BUTTON_ITEM = 'sidebarButtonItem';
export const SIDEBAR_MODULE_ITEM = 'sidebarModuleItem';
export const DRAGGABLE_COMPONENTS = [
  {
    id: shortid.generate(),
    type: GRID,
    preview: '/static/dragPreview/grid-1.png',
    component: {
      type: GRID,
      content: 'Grille 1 colonnes',
    },
  },
  {
    id: shortid.generate(),
    type: GRID2,
    preview: '/static/dragPreview/grid-2.png',
    component: {
      type: GRID2,
      content: 'Grille 2 colonnes',
    },
  },
  {
    id: shortid.generate(),
    type: GRID2_1_3_L,
    preview: '/static/dragPreview/grid-1-3-2-3.png',
    component: {
      type: GRID2_1_3_L,
      content: 'Grille 2 colonnes ( 1/3 - 2/3 )',
    },
  },
  {
    id: shortid.generate(),
    type: GRID2_1_3_R,
    preview: '/static/dragPreview/grid-2-3-1-3.png',
    component: {
      type: GRID2_1_3_R,
      content: 'Grille 2 colonnes ( 2/3 - 1/3 )',
    },
  },
  {
    id: shortid.generate(),
    type: GRID3,
    preview: '/static/dragPreview/grid-3.png',
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
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: SIDEBAR_BUTTON_ITEM,
      content: 'Bouton',
    },
  },
];
