import React from 'react';
import './page.css';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import RememberMeRoundedIcon from '@mui/icons-material/RememberMeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from "@mui/icons-material/Person";


function NavBar() {
  return (
    <>
         <Box sx={{ flexGrow: 1 }}>
          <AppBar className="header-appbar" position="static">
            <Toolbar className="header-toolbar">
              <div id="logoText">
                <span>B u d d y W a s h</span>
              </div>
              <div className="right-side">
              <h5 id= "staff" style={{color: "black"}}>Admin</h5>
              <IconButton>
                <Person />
              </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </Box>

      <div className="side-nav-bar-container">
        <List component="nav">
          <React.Fragment>
            <ListItemButton className="button" href="/role/admin/users">
              <ListItemIcon className="button-content">
                <GroupAddRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>

            <ListItemButton className="button" href="/role/admin/branches" >
              <ListItemIcon className="button-content">
                <AddLocationAltRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Branches" />
            </ListItemButton>

            <ListItemButton className="button" href="/role/admin/mobile-users">
              <ListItemIcon className="button-content">
                <RememberMeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Mobile Customer" />
            </ListItemButton >

            <p className='white-space'> &nbsp; </p>

            <ListItemButton className="button" href="/">
              <ListItemIcon className="button-content">
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </React.Fragment>
        </List>
      </div>

    </>
  )
}
export default NavBar;