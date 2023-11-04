"use client";
import React from "react";
import "./navBar.css";
import {
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import ListIcon from "@mui/icons-material/List";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function NavBar() {
  return (
    <div className="side-nav-bar-container">
      <List component="nav">
        <React.Fragment>
          <ListItemButton className="button" href="/role/staff/dashBoard">
            <ListItemIcon className="button-content">
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton className="button" href="/role/staff/reports">
            <ListItemIcon className="button-content">
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>

          <p className="white-space"> </p>
          <span className="nav-section-text">Laundry Service</span>
          <ListItemButton className="button" href="/role/staff/laundryBin">
            <ListItemIcon className="button-content">
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Laundry Bin" />
          </ListItemButton>

          <Dropdown>
            <DropdownTrigger>
              <ListItemButton className="button">
                <ListItemIcon className="button-content">
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Customer" />
              </ListItemButton>
            </DropdownTrigger>
            <DropdownMenu className="dropdown-item" aria-label="Static Actions">
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/staff/manageCustomer"
                >
                  <ListItemText primary="Manage Walk-In Customer" />
                </ListItemButton>
              </DropdownItem>
              <DropdownItem>
                <ListItemButton
                  className="button"
                // href="/role/staff/components/main-content/manageCustomer"
                >
                  <ListItemText primary="Manage Customer" />
                </ListItemButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ListItemButton className="button" href="/role/staff/machine">
            <ListItemIcon className="button-content">
              <LocalLaundryServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Machine" />
          </ListItemButton>
          <br/>

          {/* <p className="white-space"> &nbsp; </p> */}

          <span className="nav-section-text">Inventory Management</span>
          <ListItemButton className="button" href="/role/staff/supplyList">
            <ListItemIcon className="button-content">
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Supply List" />
          </ListItemButton>

          <ListItemButton className="button" href="/role/staff/supplyInOut">
            <ListItemIcon className="button-content">
              <CompareArrowsIcon />
            </ListItemIcon>
            <ListItemText primary="Supply In/Out" />
          </ListItemButton>

          {/* <p className="white-space"> &nbsp; </p> */}

          <p className="white-space"> &nbsp; </p>

          <ListItemButton className="button" href="/">
            <ListItemIcon className="button-content">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </React.Fragment>
      </List>
    </div>
  );
}
export default NavBar;
