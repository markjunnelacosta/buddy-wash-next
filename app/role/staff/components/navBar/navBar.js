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
  import QueryStatsIcon from '@mui/icons-material/QueryStats';

  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import PeopleIcon from "@mui/icons-material/People";
  import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
  import ListIcon from '@mui/icons-material/List';
  import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
  import BarChartIcon from '@mui/icons-material/BarChart';
  import LogoutIcon from '@mui/icons-material/Logout';

  
function NavBar(){
    return(
        <div className="side-nav-bar-container">
        <List component="nav">
          <React.Fragment>
            <ListItemButton className="button" href="/role/staff/components/main-content/dashBoard">
              <ListItemIcon className="button-content">
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>


           
            <p className='white-space'> </p>
            <span className="nav-section-text">Laundry Service</span>
            <ListItemButton className="button"  href="/role/staff/components/main-content/laundryBin" >
              <ListItemIcon className="button-content">
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText  primary="Laundry Bin" />
            </ListItemButton>

            <ListItemButton className="button" href="/role/staff/components/main-content/manageCustomer">
              <ListItemIcon className="button-content">
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText  primary="Manage Customer" />
            </ListItemButton >

            <ListItemButton className="button" href="/role/staff/components/main-content/machine">
              <ListItemIcon className="button-content">
                <LocalLaundryServiceIcon />
              </ListItemIcon>
              <ListItemText  primary="Machine" />
            </ListItemButton>

            <p className='white-space'> &nbsp; </p>
            
            <span className="nav-section-text">Inventory Management</span>
            <ListItemButton  className="button" href="/role/staff/components/main-content/supplyList">
              <ListItemIcon className="button-content">
                <ListIcon />
              </ListItemIcon>
              <ListItemText  primary="Supply List" />
            </ListItemButton>

            <ListItemButton  className="button" href="/role/staff/components/main-content/supplyInOut">
              <ListItemIcon className="button-content">
                <CompareArrowsIcon />
              </ListItemIcon>
              <ListItemText  primary="Supply In/Out" />
            </ListItemButton>
            
            <p className='white-space'> &nbsp; </p>

            <ListItemButton  className="button" href="/role/staff/components/main-content/reports">
              <ListItemIcon className="button-content">
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText  primary="Reports" />
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