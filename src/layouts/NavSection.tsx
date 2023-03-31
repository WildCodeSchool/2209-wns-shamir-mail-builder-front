import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { ListItemText, Collapse, List, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body1,
  height: 48,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 5,
    bottom: 0,
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: 'gold',
  },
  '&:hover': {
    color: theme.palette.text.primary,
    '&:before': {
      display: 'block',
    },
  },
}));

interface NavItemProps {
  items: any;
}
function NavItem({ items }: NavItemProps) {
  const [open, setOpen] = useState(false);
  const { component, descriptionComponent, children } = items;

  const handleClick = () => {
    setOpen(!open);
  };

  if (children) {
    return (
      <div>
        <ListItemStyle onClick={handleClick}>
          <Typography variant="h6" color="initial">
            {component && component}
          </Typography>
        </ListItemStyle>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {descriptionComponent && descriptionComponent}

          <List component="div" disablePadding>
            {children.map((item: any) => {
              /* eslint-disable-next-line */
              const { component, usageComponent } = item;

              return (
                <ListItemStyle>
                  <ListItemText key={item} primary={component} secondary={usageComponent} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </div>
    );
  }

  return (
    <ListItemStyle>
      <ListItemText primary={component} />
    </ListItemStyle>
  );
}

interface NavSectionProps {
  sidebarConfig: any;
}

export default function NavSection({ sidebarConfig }: NavSectionProps) {
  console.log('s', sidebarConfig);

  return (
    <div>
      {sidebarConfig.map((item: any) => (
        <NavItem key={item.nameComponent} items={item} />
      ))}
    </div>
  );
}
