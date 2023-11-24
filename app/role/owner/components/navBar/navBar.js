"use client";
import React from "react";
import "./navBar.css";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupsIcon from "@mui/icons-material/Groups";
import SellIcon from "@mui/icons-material/Sell";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";

function NavBar() {
  const overlayStyle = {
    position: "center",
    zIndex: 1,
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  return (
    <div className="side-nav-bar-container">
      <List component="nav">
        <ListItemButton className="button" href="/role/owner/components/main/dashboard">
          <ListItemIcon className="button-content">
            <SpeedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton className="button" href="/role/owner/components/main/laundry-prices">
          <ListItemIcon className="button-content">
            <SettingsSuggestRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Laundry Modes" />
        </ListItemButton>

        <p className="white-space"> </p>
        <span className="nav-section-text">Branches</span>
        <p className="white-space"> </p>
        <Dropdown overlay={renderBranchDropdown("branch1")} animation="slide-up" trigger={["click"]}>
          <ListItemButton className="button">
            <ListItemIcon className="button-content">
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Branch 1" />
          </ListItemButton>
        </Dropdown>

        <Dropdown overlay={renderBranchDropdown("branch2")} animation="slide-up" trigger={["click"]}>
          <ListItemButton className="button">
            <ListItemIcon className="button-content">
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Branch 2" />
          </ListItemButton>
        </Dropdown>

        <Dropdown overlay={renderBranchDropdown("branch3")} animation="slide-up" trigger={["click"]}>
          <ListItemButton className="button">
            <ListItemIcon className="button-content">
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Branch 3" />
          </ListItemButton>
        </Dropdown>

        <p className="white-space"> &nbsp; </p>

        <ListItemButton className="button" href="/">
          <ListItemIcon className="button-content">
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );

  function renderBranchDropdown(branchName) {
    return (
      <div style={overlayStyle}>
        <List>
          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/transactions`}>
            <ListItemIcon className="button-content">
              <ReceiptLongIcon />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItemButton>

          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/staff`}>
            <ListItemIcon className="button-content">
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItemButton>

          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/prices`}>
            <ListItemIcon className="button-content">
              <SellIcon />
            </ListItemIcon>
            <ListItemText primary="Prices" />
          </ListItemButton>

          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/machines`}>
            <ListItemIcon className="button-content">
              <LocalLaundryServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Machines" />
          </ListItemButton>
        </List>
      </div>
    );
  }
}

export default NavBar;
