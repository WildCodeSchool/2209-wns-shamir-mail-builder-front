import shortid from 'shortid';
// eslint-disable-next-line import/no-cycle
import { LayoutState } from '../features/layout/layoutSlice';
import {
  COLUMN, CONTAINER,
  GRID2,
  GRID3,
  PARENT_COMPONENT,
  ROW_COMPONENT, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM, SIDEBAR_TEXT_ITEM,
} from '../Components/LayoutBuilder/components/DraggablesSidebar/DraggableBuilderComponentList';

export function generateGridChildren(dragElement: any) {
  const numberOfColumns = dragElement.type === GRID2 ? 2 : dragElement.type === GRID3 ? 3 : 1;
  return Array.from({ length: numberOfColumns }, () => ({
    id: `column-${shortid.generate()}`,
    type: COLUMN,
    children: [],
    renderProps: {
      style: {
        flexBasis: `${100 / numberOfColumns}%`,
        flexGrow: 1,
        padding: '0px',
        position: 'relative',
      },
    },
  }));
}

export const generateContainerChildren = (dragElement: any) => [
  {
    id: `container-${shortid.generate()}`,
    type: CONTAINER,
    children: generateGridChildren(dragElement),
    renderProps: {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
        padding: '0px',
        paddingTop: '1px',
        paddingRight: '16px',
        paddingBottom: '1px',
        paddingLeft: '16px',
        gap: '2px',
      },
    },
  },
];

export function generateRowComponent(dragElement: any) {
  const children = generateContainerChildren(dragElement);
  const newComponent: LayoutState = {
    id: shortid.generate(),
    type: ROW_COMPONENT,
    children,
    renderProps: {
      style: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '',
        isBackgroundTransparent: true,
        padding: 0,
        margin: 0,
        backgroundImage: '',
        backgroundPosition: 'center',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
        backgroundPositionX: '0px',
        backgroundPositionY: '0px',
        height: '',
        marginTop: '0px',
        marginBottom: '0px',
      },
    },
  };
  return newComponent;
}

export const appendNewParentComponent = (dragElement: any, dropElement: any, hoverPosition: any, layout: any, path: any) => {
  const newComponent = generateRowComponent(dragElement);
  const layoutCopy: LayoutState[] = [...layout];

  if (hoverPosition === 'top') {
    layoutCopy.splice(path, 0, newComponent);
    return layoutCopy;
  } if (hoverPosition === 'bottom') {
    layoutCopy.splice(path + 1, 0, newComponent);
    return layoutCopy;
  }

  return layoutCopy;
};

export const generateComponentType = (dragElement: any) => {
  if (dragElement.component.type === SIDEBAR_TEXT_ITEM) {
    return {
      id: shortid.generate(),
      type: dragElement.component.type,
      children: [],
      renderProps: {
        style: {
          padding: 0,
          margin: 0,
          backgroundColor: '',
          isBackgroundTransparent: true,
          backgroundImage: '',
          backgroundPosition: '',
          backgroundSize: '',
          backgroundRepeat: '',
          backgroundPositionX: '',
          backgroundPositionY: '',
          height: '',
        },
      },
    };
  } if (dragElement.component.type === SIDEBAR_IMAGE_ITEM) {
    return {
      id: shortid.generate(),
      type: dragElement.component.type,
      children: [],
      renderProps: {
        style: {
          padding: 0,
          margin: 0,
          backgroundColor: null,
          isBackgroundTransparent: true,
          backgroundImage: null,
          backgroundPosition: null,
          backgroundSize: null,
          backgroundRepeat: null,
          backgroundPositionX: null,
          backgroundPositionY: null,
          height: '150px',
        },
      },
    };
  } if (dragElement.component.type === SIDEBAR_SOCIAL_ITEM) {
    return {
      id: shortid.generate(),
      type: dragElement.component.type,
      children: [],
      renderProps: {
        style: {
          padding: 0,
          margin: 0,
          backgroundColor: null,
          isBackgroundTransparent: true,
          backgroundImage: null,
          backgroundPosition: null,
          backgroundSize: null,
          backgroundRepeat: null,
          backgroundPositionX: null,
          backgroundPositionY: null,
          height: null,
        },
      },
    };
  }
  return {
    id: shortid.generate(),
    type: PARENT_COMPONENT,
    children: [],
    renderProps: {
      style: {
        padding: 0,
        margin: 0,
        backgroundColor: null,
        isBackgroundTransparent: true,
        backgroundImage: null,
        backgroundPosition: null,
        backgroundSize: null,
        backgroundRepeat: null,
        backgroundPositionX: null,
        backgroundPositionY: null,
        height: null,
      },
    },
  };
};
