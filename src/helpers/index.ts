import shortid from 'shortid';
// eslint-disable-next-line import/no-cycle
import { LayoutState } from '../features/layout/layoutSlice';
import {
  COLUMN, CONTAINER,
  GRID2, GRID2_1_3_L, GRID2_1_3_R,
  GRID3,
  PARENT_COMPONENT,
  ROW_COMPONENT, SIDEBAR_BUTTON_ITEM, SIDEBAR_IMAGE_ITEM, SIDEBAR_SOCIAL_ITEM, SIDEBAR_TEXT_ITEM,
} from '../Components/LayoutBuilder/DraggablesSidebar/DraggableBuilderComponentList';

export function generateGridChildren(dragElement: any) {
  const numberOfColumns = (dragElement.type === GRID2 || dragElement.type === GRID2_1_3_R || dragElement.type === GRID2_1_3_L) ? 2 : dragElement.type === GRID3 ? 3 : 1;
  return Array.from({ length: numberOfColumns }, (_, index) => ({
    id: `column-${shortid.generate()}`,
    type: COLUMN,
    initialType: dragElement.type,
    preview: dragElement.preview,
    children: [],
    renderProps: {
      style: {
        flexBasis: dragElement.type === GRID2_1_3_L && index === 0 ? 600 / 3 : dragElement.type === GRID2_1_3_R && index === 1 ? 600 / 3 : dragElement.type === GRID2_1_3_L && index === 1 ? 600 - (600 / 3) : dragElement.type === GRID2_1_3_R && index === 0 ? 600 - (600 / 3) : `${600 / numberOfColumns}px`,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        alignSelf: 'center',
        position: 'relative',
        backgroundColor: 'transparent',
      },
    },
  }));
}

export const generateContainerChildren = (dragElement: any) => [
  {
    id: `container-${shortid.generate()}`,
    type: CONTAINER,
    children: generateGridChildren(dragElement),
    typeGrid: dragElement.type,
    renderProps: {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        gap: '2px',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderColor: 'transparent',
        borderStyle: 'none',
        borderWidth: 1,
        borderRadius: 0,
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
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          margin: 0,
          backgroundColor: null,
          isBackgroundTransparent: true,
          backgroundImage: null,
          backgroundPosition: null,
          backgroundSize: null,
          backgroundRepeat: null,
          backgroundPositionX: null,
          backgroundPositionY: null,
          height: 150,
        },
      },
    };
  } if (dragElement.component.type === SIDEBAR_SOCIAL_ITEM) {
    return {
      id: shortid.generate(),
      type: dragElement.component.type,
      children: [
        {
          id: shortid.generate(),
          type: 'social-item',
          renderProps: {
            style: {
              width: 30,
              height: 30,
              href: 'https://www.facebook.com/',
              src: 'https://www.facebook.com/images/fb_icon_325x325.png',
              alt: 'facebook',
              label: 'Facebook',
            },
          },
        },
        {
          id: shortid.generate(),
          type: 'social-item',
          renderProps: {
            style: {
              width: 30,
              height: 30,
              href: 'https://www.instagram.com/',
              src: 'https://img.icons8.com/color/452/instagram-new.png',
              alt: 'instagram',
              label: 'Instagram',
            },
          },
        },
        {
          id: shortid.generate(),
          type: 'social-item',
          renderProps: {
            style: {
              width: 30,
              height: 30,
              href: 'https://www.twitter.com/',
              src: 'https://img.icons8.com/color/452/twitter-circled.png',
              alt: 'twitter',
              label: 'Twitter',
            },
          },
        },
      ],
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
          gap: 5,
          width: 30,
          justifyContent: 'center',
          paddingTop: 15,
          paddingRight: 0,
          paddingBottom: 15,
          paddingLeft: 0,
        },
      },
    };
  } if (dragElement.component.type === SIDEBAR_BUTTON_ITEM) {
    return {
      id: shortid.generate(),
      type: dragElement.component.type,
      children: [],
      renderProps: {
        style: {
          fontFamily: 'Arial',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: 'normal',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: 5,
          borderStyle: 'none',
          borderWidth: 1,
          paddingTop: 10,
          paddingRight: 20,
          paddingBottom: 10,
          paddingLeft: 20,
          href: '',
          letterSpacing: 0,
          lineHeight: 1,
          textAlign: 'center',
          textDecoration: 'none',
          textTransform: 'uppercase',
          title: '',
          verticalAlign: 'middle',
          width: 'auto',
        },
        text: 'Mon texte',
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

export const socialItems = [
  {
    label: 'Facebook',
    image: 'https://img.icons8.com/color/452/facebook-circled.png',
    type: 'facebook',
  },
  {
    label: 'Instagram',
    image: 'https://img.icons8.com/color/452/instagram-new.png',
    type: 'instagram',
  },
  {
    label: 'Twitter',
    image: 'https://img.icons8.com/color/452/twitter-circled.png',
    type: 'twitter',
  },
  {
    label: 'LinkedIn',
    image: 'https://img.icons8.com/color/452/linkedin.png',
    type: 'linkedin',
  },
  {
    label: 'Pinterest',
    image: 'https://img.icons8.com/color/452/pinterest.png',
    type: 'pinterest',
  },
  {
    label: 'Youtube',
    image: 'https://img.icons8.com/color/452/youtube-play.png',
    type: 'youtube',
  },
];

export const generateSocialItem = (socialName: string) => {
  if (socialName === 'facebook') {
    return {
      id: shortid.generate(),
      type: 'social-item',
      renderProps: {
        style: {
          width: 30,
          height: 30,
          href: 'https://www.facebook.com/',
          src: 'https://img.icons8.com/color/452/facebook-circled.png',
          alt: 'facebook',
          label: 'Facebook',
        },
      },
    };
  } if (socialName === 'instagram') {
    return {
      id: shortid.generate(),
      type: 'social-item',
      renderProps: {
        style: {
          width: 30,
          height: 30,
          href: 'https://www.instagram.com/',
          src: 'https://img.icons8.com/color/452/instagram-new.png',
          alt: 'instagram',
          label: 'Instagram',
        },
      },
    };
  } if (socialName === 'twitter') {
    return {
      id: shortid.generate(),
      type: 'social-item',
      renderProps: {
        style: {
          width: 30,
          height: 30,
          href: 'https://www.twitter.com/',
          src: 'https://img.icons8.com/color/452/twitter-circled.png',
          alt: 'twitter',
          label: 'Twitter',
        },
      },
    };
  }
  if (socialName === 'youtube') {
    return {
      id: shortid.generate(),
      type: 'social-item',
      renderProps: {
        style: {
          width: 30,
          height: 30,
          href: 'https://www.youtube.com/',
          src: 'https://img.icons8.com/color/452/youtube-play.png',
          alt: 'youtube',
          label: 'Youtube',
        },
      },
    };
  }
  if (socialName === 'linkedin') {
    return {
      id: shortid.generate(),
      type: 'social-item',
      renderProps: {
        style: {
          width: 30,
          height: 30,
          href: 'https://www.linkedin.com/',
          src: 'https://img.icons8.com/color/452/linkedin.png',
          alt: 'linkedin',
          label: 'Linkedin',
        },
      },
    };
  }
  if (socialName === 'pinterest') {
    return {
      id: shortid.generate(),
      type: 'social-item',
      renderProps: {
        style: {
          width: 30,
          height: 30,
          href: 'https://www.pinterest.com/',
          src: 'https://img.icons8.com/color/452/pinterest.png',
          alt: 'pinterest',
          label: 'Pinterest',
        },
      },
    };
  }
  return {
    id: shortid.generate(),
    type: 'social-item',
    renderProps: {
      style: {
        width: 30,
        height: 30,
        href: 'https://www.facebook.com/',
        src: 'https://img.icons8.com/color/452/facebook-circled.png',
        alt: 'facebook',
        label: 'Facebook',
      },
    },
  };
};
