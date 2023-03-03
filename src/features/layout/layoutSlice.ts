import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { generateComponentType, generateRowComponent } from '../../helpers';
import {
  COLUMN,
  CONTAINER,
  ROW_COMPONENT,
  SIDEBAR_IMAGE_ITEM,
} from '../../Components/LayoutBuilder/components/DraggablesSidebar/DraggableBuilderComponentList';

export interface IComponentRenderProps {
  style?: {
    [key: string]: string | number | boolean | null;
  }
}

export interface LayoutState {
  type: string;
  id: string;
  children: LayoutState[];
  renderProps?: IComponentRenderProps;
  renderState?: any
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
      layoutCopy.splice(action.payload.destinationIndex, 0, removed);
      return layoutCopy;
    },
    // eslint-disable-next-line consistent-return
    change: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      switch (action.payload.type) {
        case ROW_COMPONENT:
          layoutCopy[action.payload.path].renderProps!.style = {
            ...layoutCopy[action.payload.path].renderProps!.style,
            ...action.payload.renderProps.style,
          };
          break;
        case COLUMN:
          const parentPath = action.payload.path.split('-')[0];
          const newFlexBasis = Number(action.payload.renderProps.style.flexBasis.split('%')[0]);
          const currentFlexBasis = Number(String(layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].renderProps!.style!.flexBasis!).split('%')[0]);

          // Si on change la taille de la colonne
          if (newFlexBasis !== currentFlexBasis) {
            if (newFlexBasis > currentFlexBasis) { // Si on agrandit la colonne
              if (Number(action.payload.path.split('-')[1]) !== layoutCopy[parentPath].children[0].children.length - 1) { // Si ce n'est pas la dernière colonne
                layoutCopy[parentPath].children[0].children.forEach((child, index) => { // On parcourt les enfants
                  if (index === (Number(action.payload.path.split('-')[1]) + 1)) { // Si on est sur l'enfant suivant
                    const diff = (newFlexBasis - currentFlexBasis); // On calcule la différence
                    layoutCopy[parentPath].children[0].children[index].renderProps!.style!.flexBasis = `${Number(String(child.renderProps!.style!.flexBasis!).split('%')[0]) - diff}%`; // On applique la différence à l'enfant suivant
                  }
                });
              } else { // Si c'est la dernière colonne
                layoutCopy[parentPath].children[0].children.forEach((child, index) => { // On parcourt les enfants
                  if (index === Number(action.payload.path.split('-')[1]) - 1) { // Si on est sur l'enfant précédent
                    const diff = (newFlexBasis - currentFlexBasis); // On calcule la différence
                    layoutCopy[parentPath].children[0].children[index].renderProps!.style!.flexBasis = `${Number(String(child.renderProps!.style!.flexBasis!).split('%')[0]) - diff}%`; // On applique la différence à l'enfant précédent
                  }
                });
              }
            } else if (newFlexBasis < currentFlexBasis) { // Si on réduit la colonne
              if (Number(action.payload.path.split('-')[1]) !== layoutCopy[parentPath].children[0].children.length - 1) {
                layoutCopy[parentPath].children[0].children.forEach((child, index) => {
                  if (index === (Number(action.payload.path.split('-')[1]) + 1)) {
                    const diff = (currentFlexBasis - newFlexBasis);
                    layoutCopy[parentPath].children[0].children[index].renderProps!.style!.flexBasis = `${Number(String(child.renderProps!.style!.flexBasis!).split('%')[0]) + diff}%`;
                  }
                });
              } else {
                layoutCopy[parentPath].children[0].children.forEach((child, index) => {
                  if (index === Number(action.payload.path.split('-')[1]) - 1) {
                    const diff = (currentFlexBasis - newFlexBasis);
                    layoutCopy[parentPath].children[0].children[index].renderProps!.style!.flexBasis = `${Number(String(child.renderProps!.style!.flexBasis!).split('%')[0]) + diff}%`;
                  }
                });
              }
            }
          }

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
        default:
          return layoutCopy;
      }
    },
    addNewComponentInColumn: (state, action: PayloadAction<any>) => {
      const layoutCopy: LayoutState[] = [...state];
      const newComponent = generateComponentType(action.payload.item);
      const parentPath = action.payload.path.split('-')[0];
      if (action.payload.hoverPosition === 'top') layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].children.splice(0, 0, newComponent);
      else if (action.payload.hoverPosition === 'bottom') layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].children.splice(layoutCopy[parentPath].children[0].children[action.payload.path.split('-')[1]].children.length, 0, newComponent);
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
      const dragElement = action.payload.item;
      const dragElementPath = dragElement.path.split('-');
      const dragElementCopy = layoutCopy[dragElement.path.split('-')[0]].children[0].children[Number(dragElement.path.split('-')[1])];
      const { path } = action.payload;

      if (action.payload.hoverPosition === 'left') {
        layoutCopy[dragElementPath[0]].children[0].children.splice(Number(dragElementPath[1]), 1); // remove from old position
        layoutCopy[path.split('-')[0]].children[0].children.splice(path.split('-')[1], 0, dragElementCopy); // add to new position
        if (layoutCopy[dragElementPath[0]].children[0].children.length < 1) { // remove parent component if no more children
          layoutCopy.splice(Number(dragElementPath[0]), 1);
        }
      } else if (action.payload.hoverPosition === 'right') {
        layoutCopy[dragElementPath[0]].children[0].children.splice(Number(dragElementPath[1]), 1); // remove from old position
        layoutCopy[path.split('-')[0]].children[0].children.splice(Number(path.split('-')[1]) + 1, 0, dragElementCopy); // add to new position
        if (layoutCopy[dragElementPath[0]].children[0].children.length < 1) { // remove parent component if no more children
          layoutCopy.splice(Number(dragElementPath[0]), 1);
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
    resetLayout: () => initialState,
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
} = layoutSlice.actions;
export default layoutSlice.reducer;
