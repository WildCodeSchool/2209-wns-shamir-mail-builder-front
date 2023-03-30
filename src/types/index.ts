export interface IColumnComponentRenderProps {
  style: {
    position: string
    backgroundColor: string
    paddingLeft: number
    paddingRight: number
    paddingTop: number
    paddingBottom: number
    flexBasis: number | string
    alignSelf: 'flex-start' | 'center' | 'flex-end'
    borderStyle: 'solid' | 'dashed' | 'dotted' | 'none'
    borderColor: string
    borderWidth: number
    borderRadius: number
  }
}

export interface IComponent {
  id: string
  type: string
  children: [] | ISocialItem[]
}

export interface ISocialItem {
  id: string
  type: string
  renderProps: ISocialItemRenderProps
}

export interface ISocialItemRenderProps {
  style: {
    width: number | string
    height: number | string
    href: string
    src: string
    alt: string
    label: string
  }
}

export interface IButtonComponentRenderProps {
  style: {
    href: string
    title: string
    justifyContent: 'flex-start' | 'center' | 'flex-end'
    fontFamily: string
    fontSize: number
    fontWeight: 'normal' | 'bold'
    letterSpacing: number
    lineHeight: number
    textAlign: 'left' | 'center' | 'right'
    textDecoration: 'none' | 'underline'
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    color: string
    backgroundColor: string
    paddingTop: number
    paddingBottom: number
    paddingLeft: number
    paddingRight: number
    innerPaddingTop: number
    innerPaddingBottom: number
    innerPaddingLeft: number
    innerPaddingRight: number
    borderWidth: number
    borderStyle: 'solid' | 'dashed' | 'dotted' | 'none'
    borderColor: string
    borderRadius: number
  },
  text: string,
}

export interface ISocialComponentRenderProps {
  style: {
    width: number | string
    gap: number | string
    justifyContent: 'flex-start' | 'center' | 'flex-end'
    backgroundColor: string
    paddingTop: number | string
    paddingBottom: number | string
    paddingLeft: number | string
    paddingRight: number | string
  }
}

export interface ITextComponentRenderProps {
  style: {
    [key: string]: string | number
  }
  render?: string
}

export interface IImageComponentRenderProps {
  style: {
    position: string
    width: string
    height: number | string
    outline: string
    borderStyle: 'solid' | 'dashed' | 'dotted' | 'none'
    borderColor: string
    borderWidth: number
    borderRadius: number
    paddingTop: number
    paddingBottom: number
    paddingLeft: number
    paddingRight: number
    backgroundUrl: string
    href: string
    alt: string
    fullWidth: boolean
  }
}

export interface IColumnComponent {
  id: string
  type: string
  initialType: 'grid' | 'grid2' | 'grid3' | 'grid2_1_3_l' | 'grid2_1_3_r'
  preview: string
  children: [] | IComponent[]
  renderProps: IColumnComponentRenderProps
}

export interface DragItem {
  id: string
  path: string | number
  type: string
}

export interface IContainer {
  id: string
  children: any
  renderProps: IContainerRenderProps
  path: number
  typeGrid: 'grid' | 'grid2' | 'grid3' | 'grid2_1_3_l' | 'grid2_1_3_r'
}

export interface IContainerRenderProps {
  style: {
    display: string
    flexWrap: 'wrap' | 'nowrap'
    alignItems: 'flex-start' | 'center' | 'flex-end'
    flex: number
    gap: string
    paddingTop: number
    paddingBottom: number
    paddingLeft: number
    paddingRight: number
    backgroundSize: 'cover' | 'contain'
    backgroundPosition: 'center' | 'left' | 'right' | 'top' | 'bottom'
    backgroundRepeat: 'no-repeat' | 'repeat'
    backgroundColor: string
    backgroundUrl: string
    borderStyle: 'solid' | 'dashed' | 'dotted' | 'none'
    borderWidth: number
    borderColor: string
    borderRadius: number
    fullWidth: boolean
  }
}

export interface IRowComponent {
  id: string
  type: string
  children: IContainer[]
  renderProps: {
    style: {
      position: string
      paddingBottom: number
      paddingTop: number
      backgroundUrl: string
      backgroundSize: 'cover' | 'contain'
      backgroundPosition: 'center' | 'left' | 'right' | 'top' | 'bottom'
      backgroundRepeat: 'no-repeat' | 'repeat'
      borderStyle: 'solid' | 'dashed' | 'dotted' | 'none'
      borderWidth: number
      borderColor: string
      borderRadius: number
    }
  }
  layoutId: number
}
