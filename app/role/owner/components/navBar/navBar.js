import React from 'react';
import './navBar.css';
import {
    List,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Grid,
    Paper,
  } from "@mui/material";
  import SpeedIcon from '@mui/icons-material/Speed';
  import LocationOnIcon from '@mui/icons-material/LocationOn';
  import LogoutIcon from '@mui/icons-material/Logout';

  
function NavBar(){
    return(
        <div className="side-nav-bar-container">
        <List component="nav">
          <React.Fragment>
            <ListItemButton className="button" href="/role/owner/components/main/dashboard">
              <ListItemIcon className="button-content">
                <SpeedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton className="button"  href="/role/owner/components/main/branch1" >
              <ListItemIcon className="button-content">
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText  primary="Branch 1" />
            </ListItemButton>

            <ListItemButton className="button"  href="/role/owner/components/main/branch2" >
              <ListItemIcon className="button-content">
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText  primary="Branch 2" />
            </ListItemButton>

            <ListItemButton className="button"  href="/role/owner/components/main/branch3" >
              <ListItemIcon className="button-content">
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText  primary="Branch 3" />
            </ListItemButton>
           
            <p className='white-space'> &nbsp; </p>

            <ListItemButton  className="button" href="/">
              <ListItemIcon className="button-content">
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText  primary="Logout" />
            </ListItemButton>
          </React.Fragment>
        </List>
      </div>
    )
}
export default NavBar;