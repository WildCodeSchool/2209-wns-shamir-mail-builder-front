import React from 'react';
import { ISocialComponentRenderProps, ISocialItem } from '../../../types';
// eslint-disable-next-line import/no-cycle

interface ISocialItemProps {
  data: ISocialItem
  renderProps: ISocialComponentRenderProps
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const SocialItem = ({ data, renderProps, handleClick }: ISocialItemProps) => (
  <li key={data.id}>
    <a href={data.renderProps.style.href} style={{ display: 'flex' }} target="_blank" rel="noreferrer" onClick={handleClick}>
      <img
        src={data.renderProps.style.src}
        alt={data.renderProps.style.alt}
        style={{
          width: `${renderProps.style.width}px`,
          height: `${renderProps.style.width}px`,
        }}
      />
    </a>
  </li>
);

export default SocialItem;
