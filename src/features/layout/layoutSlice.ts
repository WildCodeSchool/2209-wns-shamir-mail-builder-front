import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import shortid from 'shortid';
import {
  COLUMN,
  CONTAINER, GRID2, GRID2_1_3_L, GRID2_1_3_R,
  ROW_COMPONENT, SIDEBAR_BUTTON_ITEM,
  SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM,
} from '../../Components/LayoutBuilder/DraggablesSidebar/DraggableBuilderComponentList';
// eslint-disable-next-line import/no-cycle
import { generateComponentType, generateRowComponent } from '../../helpers';

export interface IComponentRenderProps {
  style?: {
    [key: string]: string | number | boolean | null;
  },
  text?: string,
}

export interface LayoutState {
  id: string;
  type: string;
  typeGrid?: string;
  children: LayoutState[];
  renderProps?: IComponentRenderProps;
  renderState?: any
  layoutId?: string;
}

const initialState: LayoutState[] = [];

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    addParentComponent: (state, action: PayloadAction<any>) => {
      const newComponent = generateRowComponent(action.payload.item);
      if (action.payload.hoverPosition === 'top') {
        state.splice(action.payload.path, 0, newComponent);
      } else if (action.payload.hoverPosition === 'bottom') {
        state.splice(action.payload.path + 1, 0, newComponent);
      }
    },
    moveParentComponent: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      const [removed] = layoutCopy.splice(action.payload.sourceIndex, 1);
      if (action.payload.hoverPosition === 'top') {
        if (action.payload.sourceIndex > action.payload.destinationIndex) {
          layoutCopy.splice(action.payload.destinationIndex, 0, removed);
        } else {
          layoutCopy.splice(action.payload.destinationIndex - 1, 0, removed);
        }
      } else if (action.payload.hoverPosition === 'bottom') {
        if (action.payload.sourceIndex > action.payload.destinationIndex) {
          layoutCopy.splice(action.payload.destinationIndex + 1, 0, removed);
        } else {
          layoutCopy.splice(action.payload.destinationIndex, 0, removed);
        }
      }
      return layoutCopy;
    },
    // eslint-disable-next-line consistent-return
    change: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      switch (action.payload.type) {
        case ROW_COMPONENT:
          layoutCopy[action.payload.path].children[0].renderProps!.style = {
            ...layoutCopy[action.payload.path].children[0].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        case COLUMN:
          const parentPath = action.payload.path.split('-')[0];

          layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].renderProps!.style = { // On applique les nouvelles propriétés a la colonne concernée
            ...layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        case CONTAINER:

          // Si on change l'alignement des colonnes
          if (action.payload.renderProps.style.alignItems) {
            layoutCopy[action.payload.path].children[0].children.forEach((child) => {
              child.renderProps!.style!.alignSelf = action.payload.renderProps.style.alignItems;
            });
          }

          layoutCopy[action.payload.path].children[0].renderProps!.style = {
            ...layoutCopy[action.payload.path].children[0].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        case SIDEBAR_IMAGE_ITEM:

          layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].renderProps!.style = {
            ...layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        case SIDEBAR_SOCIAL_ITEM:
          if (action.payload.changeType === 'children') { // Si on modifie les propriétés d'un social Item et non du wrapper des socials items
            layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].children[action.payload.itemPath].renderProps!.style = {
              ...layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].children[action.payload.itemPath].renderProps!.style,
              ...action.payload.renderProps.style,
            };
          }
          layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].renderProps!.style = {
            ...layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        case SIDEBAR_BUTTON_ITEM:
          layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].renderProps!.style = {
            ...layoutCopy[action.payload.path.split('-')[0]].children[0].children[action.payload.path.split('-')[1]].children[action.payload.path.split('-')[2]].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        default:
          return layoutCopy;
      }
    },
    addNewComponentInColumn: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      const newComponent = generateComponentType(action.payload.item);
      const parentPath = action.payload.path.split('-')[0];
      if (action.payload.hoverPosition === 'top') { // @ts-ignore
        layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].children.splice(0, 0, newComponent);
      } else if (action.payload.hoverPosition === 'bottom') { // @ts-ignore
        layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].children.splice(layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].children.length, 0, newComponent);
      }
    },
    changeColumnHeight: (state, action: PayloadAction<any>) => {
      const layoutCopy = [...state];
      const parentPath = action.payload.path.split('-')[0];
      const columnPath = action.payload.path.split('-')[1];
      layoutCopy[parentPath].children[0].children[columnPath].renderProps!.style!.height = action.payload.value ?? '150px';
    },
    moveExistChildrenInNewParentComponent: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      const dragElement = action.payload.item;
      const { path } = action.payload;

      const parentComponentPath = action.payload.path.split('-')[0];
      const olderParentComponentPath = action.payload.item.path.split('-')[0];
      const childrenInParentComponent = layoutCopy[parentComponentPath].children[0].children[path.split('-')[1]];

      if (action.payload.hoverPosition === 'top') {
        layoutCopy[parentComponentPath].children[0].children[path.split('-')[1]].children.splice(0, 0, dragElement); // add to new parent component at top
        layoutCopy[olderParentComponentPath].children[0].children[dragElement.path.split('-')[1]].children.splice(dragElement.path.split('-')[2], 1); // remove from old parent component
      } else if (action.payload.hoverPosition === 'bottom') {
        layoutCopy[parentComponentPath].children[0].children[path.split('-')[1]].children.splice(childrenInParentComponent.children.length, 0, dragElement); // add to new parent component at end
        layoutCopy[olderParentComponentPath].children[0].children[dragElement.path.split('-')[1]].children.splice(dragElement.path.split('-')[2], 1); // remove from old parent component
      }
    },
    moveExistColumnInSameParent: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      const { path, hoverPosition, item, initialType } = action.payload;
      const sourcePath = item.path.split('-')[1];
      const targetPath = path.split('-')[1];

      if (sourcePath === targetPath) return;

      let dragElement = layoutCopy[path.split('-')[0]].children[0].children[sourcePath];

      if (hoverPosition === 'left') {
        if (sourcePath > targetPath) {
          if (initialType === GRID2_1_3_L || initialType === GRID2_1_3_R) {
            if (dragElement.renderProps!.style!.flexBasis === 200) {
              dragElement = { ...dragElement, renderProps: { ...dragElement.renderProps, style: { ...dragElement.renderProps!.style, flexBasis: dragElement.renderProps!.style!.flexBasis = 400 } } };
              layoutCopy[path.split('-')[0]].children[0].children[targetPath].renderProps!.style!.flexBasis = 200;
            } else if (dragElement.renderProps!.style!.flexBasis === 400) {
              dragElement = { ...dragElement, renderProps: { ...dragElement.renderProps, style: { ...dragElement.renderProps!.style, flexBasis: dragElement.renderProps!.style!.flexBasis = 200 } } };
              layoutCopy[path.split('-')[0]].children[0].children[targetPath].renderProps!.style!.flexBasis = 400;
            }
          }
          layoutCopy[path.split('-')[0]].children[0].children.splice(sourcePath, 1);
          layoutCopy[path.split('-')[0]].children[0].children.splice(targetPath, 0, dragElement);
        } else {
          layoutCopy[path.split('-')[0]].children[0].children.splice(sourcePath, 1);
          layoutCopy[path.split('-')[0]].children[0].children.splice(targetPath - 1, 0, dragElement);
        }
      } else if (hoverPosition === 'right') {
        if (sourcePath > targetPath) {
          layoutCopy[path.split('-')[0]].children[0].children.splice(sourcePath, 1);
          layoutCopy[path.split('-')[0]].children[0].children.splice(targetPath + 1, 0, dragElement);
        } else {
          if (initialType === GRID2_1_3_L || initialType === GRID2_1_3_R) {
            if (dragElement.renderProps!.style!.flexBasis === 200) {
              layoutCopy[path.split('-')[0]].children[0].children[targetPath].renderProps!.style!.flexBasis = 200;
              dragElement.renderProps!.style!.flexBasis = 400;
            } else if (dragElement.renderProps!.style!.flexBasis === 400) {
              layoutCopy[path.split('-')[0]].children[0].children[targetPath].renderProps!.style!.flexBasis = 400;
              dragElement.renderProps!.style!.flexBasis = 200;
            }
          }
          layoutCopy[path.split('-')[0]].children[0].children.splice(sourcePath, 1);
          layoutCopy[path.split('-')[0]].children[0].children.splice(targetPath, 0, dragElement);
        }
      }
    },
    handleStateComponentChange: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      const { path } = action.payload;
      layoutCopy[path.split('-')[0]].children[0].children[path.split('-')[1]].children[path.split('-')[2]].renderProps = {
        ...layoutCopy[path.split('-')[0]].children[0].children[path.split('-')[1]].children[path.split('-')[2]].renderProps,
        ...action.payload.renderProps,
      };
    },
    resetLayout: () => ([]),
    setLayout: (state, action: PayloadAction<any>) =>
      (action.payload.layout.map((el: any) => ({ ...el, layoutId: action.payload.layoutId }))),
    deleteRowComponent: (state, action: PayloadAction<any>) => {
      const { path } = action.payload;
      state.splice(path, 1);
    },
    duplicateRowComponent: (state, action: PayloadAction<any>) => {
      const { data, path } = action.payload;
      const newId = shortid.generate();
      state.splice(path + 1, 0, {
        ...data,
        id: newId,
      });
    },
    changeGridInRowComponent: (state, action: PayloadAction<any>) => {
      const { path, typeGrid, columnCount } = action.payload;
      if (columnCount === 2) {
        state[path].children[0].children.forEach((el: any, index: number) => {
          if (typeGrid === GRID2_1_3_L) {
            state[path].children[0].typeGrid = GRID2_1_3_L;
            el.preview = '/static/dragPreview/grid-1-3-2-3.png';
            if (index === 0) {
              el.renderProps.style.flexBasis = 600 / 3;
            } else if (index === 1) {
              el.renderProps.style.flexBasis = 600 - (600 / 3);
            }
          } else if (typeGrid === GRID2_1_3_R) {
            state[path].children[0].typeGrid = GRID2_1_3_R;
            el.preview = '/static/dragPreview/grid-2-3-1-3.png';
            if (index === 0) {
              el.renderProps.style.flexBasis = 600 - (600 / 3);
            } else if (index === 1) {
              el.renderProps.style.flexBasis = 600 / 3;
            }
          } else if (typeGrid === GRID2) {
            state[path].children[0].typeGrid = GRID2;
            el.preview = '/static/dragPreview/grid-2.png';
            el.renderProps.style.flexBasis = 600 / 2;
          }
        });
      }
    },
    clearColumn: (state, action: PayloadAction<any>) => {
      const { path } = action.payload;
      state[path.split('-')[0]].children[0].children[path.split('-')[1]].children = [];
    },
    removeSocialItem: (state, action: PayloadAction<any>) => {
      const { itemPath, path } = action.payload;
      state[path.split('-')[0]].children[0].children[path.split('-')[1]].children[path.split('-')[2]].children.splice(itemPath, 1);
    },
    addSocialItem: (state, action: PayloadAction<any>) => {
      const { socialItem, path } = action.payload;
      state[path.split('-')[0]].children[0].children[path.split('-')[1]].children[path.split('-')[2]].children.push(socialItem);
    },
    updateTextValueButton: (state, action: PayloadAction<any>) => {
      const { path, value } = action.payload;
      state[path.split('-')[0]].children[0].children[path.split('-')[1]].children[path.split('-')[2]].renderProps!.text = value;
    },
    deleteComponent: (state, action: PayloadAction<any>) => {
      const { path } = action.payload;
      state[path.split('-')[0]].children[0].children[path.split('-')[1]].children.splice(path.split('-')[2], 1);
    },
  },
});
export const {
  addParentComponent,
  moveParentComponent,
  change,
  addNewComponentInColumn,
  moveExistChildrenInNewParentComponent,
  moveExistColumnInSameParent,
  handleStateComponentChange,
  resetLayout,
  setLayout,
  deleteRowComponent,
  duplicateRowComponent,
  changeGridInRowComponent,
  clearColumn,
  removeSocialItem,
  addSocialItem,
  updateTextValueButton,
  deleteComponent,
} = layoutSlice.actions;
export default layoutSlice.reducer;
