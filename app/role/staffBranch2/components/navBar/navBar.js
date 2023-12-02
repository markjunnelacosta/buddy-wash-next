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
          <ListItemButton
            className="button"
            href="/role/staffBranch2/dashBoard"
          >
            <ListItemIcon className="button-content">
              <QueryStatsIcon className="navbar-text" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="navbar-text" />
          </ListItemButton>

          <ListItemButton className="button" href="/role/staffBranch2/reports">
            <ListItemIcon className="button-content">
              <BarChartIcon className="navbar-text" />
            </ListItemIcon>
            <ListItemText primary="Reports" className="navbar-text" />
          </ListItemButton>

          <p className="white-space"> </p>
          <span className="nav-section-text">Laundry Service</span>
          <Dropdown>
            <DropdownTrigger>
              <ListItemButton className="button">
                <ListItemIcon className="button-content">
                  <ShoppingCartIcon className="navbar-text" />
                </ListItemIcon>
                <ListItemText primary="Laundry Bin" className="navbar-text" />
              </ListItemButton>
            </DropdownTrigger>
            <DropdownMenu className="dropdown-item" aria-label="Static Actions">
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/staffBranch2/laundryBin"
                >
                  <ListItemText
                    primary="Manage Walk-In Orders"
                    className="navbar-text"
                  />
                </ListItemButton>
              </DropdownItem>
              <DropdownItem>
                <ListItemButton
                  className="button"
                  //  href="/role/staff/manageMobileCustomer"
                >
                  <ListItemText
                    primary="Manage Mobile Orders"
                    className="navbar-text"
                  />
                </ListItemButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <ListItemButton className="button">
                <ListItemIcon className="button-content">
                  <PeopleIcon className="navbar-text" />
                </ListItemIcon>
                <ListItemText
                  primary="Manage Customer"
                  className="navbar-text"
                />
              </ListItemButton>
            </DropdownTrigger>
            <DropdownMenu className="dropdown-item" aria-label="Static Actions">
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/staffBranch2/manageCustomer"
                >
                  <ListItemText
                    primary="Manage Walk-In Customer"
                    className="navbar-text"
                  />
                </ListItemButton>
              </DropdownItem>
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/staffBranch2/manageMobileCustomer"
                >
                  <ListItemText
                    primary="Manage Mobile Customer"
                    className="navbar-text"
                  />
                </ListItemButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ListItemButton className="button" href="/role/staffBranch2/machine">
            <ListItemIcon className="button-content">
              <LocalLaundryServiceIcon className="navbar-text" />
            </ListItemIcon>
            <ListItemText primary="Machine" className="navbar-text" />
          </ListItemButton>
          <br />

          {/* <p className="white-space"> &nbsp; </p> */}

          <span className="nav-section-text">Inventory Management</span>
          <ListItemButton
            className="button"
            href="/role/staffBranch2/supplyList"
          >
            <ListItemIcon className="button-content">
              <ListIcon className="navbar-text" />
            </ListItemIcon>
            <ListItemText primary="Supply List" className="navbar-text" />
          </ListItemButton>

          <ListItemButton
            className="button"
            href="/role/staffBranch2/supplyInOut"
          >
            <ListItemIcon className="button-content">
              <CompareArrowsIcon className="navbar-text" />
            </ListItemIcon>
            <ListItemText primary="Supply In/Out" className="navbar-text" />
          </ListItemButton>

          {/* <p className="white-space"> &nbsp; </p> */}

          <p className="white-space"> &nbsp; </p>

          <ListItemButton className="button" href="/">
            <ListItemIcon className="button-content">
              <LogoutIcon className="navbar-text" />
            </ListItemIcon>
            <ListItemText primary="Logout" className="navbar-text" />
          </ListItemButton>
        </React.Fragment>
      </List>
    </div>
  );
}
export default NavBar;
