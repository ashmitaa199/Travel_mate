import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useCookies } from 'react-cookie';

export default function TemporaryDrawer() {

  const [cookies, , removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const logout = () => {
    removeCookie('UserId');
    removeCookie('AuthToken');
    navigate('/'); // Redirect to home or login page
    window.location.reload(); // Reload to ensure state is cleared
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const icons = {
    Post: <PostAddIcon className="text-#161616" />,
    Logout: <LogoutIcon className="text-#212121" />,
  };

  const DrawerList = (
    <Box
      className="w-48 h-full bg-gradient-to-r from-gray-400 to-blue-200 "
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {[
          { text: 'Post', path: '/post' },
          { text: 'DisplayPosts ', path: '/posts' },
          { text: 'Logout', action: logout } 
        ].map(({ text, path, action }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={path ? Link : 'div'} // Render as Link if path is provided, else 'div'
              to={path}
              onClick={action} // Call action if provided
              className="hover:bg-blue-600"
            >
              <ListItemIcon>
                {icons[text]}
              </ListItemIcon>
              <ListItemText primary={text} primaryTypographyProps={{ className: 'text-#353131' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider className="bg-white" />
    </Box>
  );

  return (
    <div>
      <MenuIcon
        onClick={toggleDrawer(true)}
        className="text-3xl cursor-pointer"
        style={{ color: 'black' }}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
