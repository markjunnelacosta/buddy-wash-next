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
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
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
            <SpeedIcon className="navbar-text"/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" className="navbar-text"/>
        </ListItemButton>

        <ListItemButton className="button" href="/role/owner/components/main/laundry-prices">
          <ListItemIcon className="button-content">
            <SettingsSuggestRoundedIcon className="navbar-text"/>
          </ListItemIcon>
          <ListItemText primary="Laundry Modes" className="navbar-text"/>
        </ListItemButton>

        <ListItemButton className="button" href="/role/owner/components/main/promotions">
          <ListItemIcon className="button-content">
            <ConfirmationNumberIcon className="navbar-text"/>
          </ListItemIcon>
          <ListItemText primary="Promotions" className="navbar-text"/>
        </ListItemButton>

        <p className="white-space"> </p>
        <span className="nav-section-text">Branches</span>
        <p className="white-space"> </p>
        <Dropdown overlay={renderBranchDropdown("branch1")} animation="slide-up" trigger={["click"]}>
          <ListItemButton className="button">
            <ListItemIcon className="button-content">
              <LocationOnIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Branch 1" className="navbar-text"/>
          </ListItemButton>
        </Dropdown>

        <Dropdown overlay={renderBranchDropdown("branch2")} animation="slide-up" trigger={["click"]}>
          <ListItemButton className="button">
            <ListItemIcon className="button-content">
              <LocationOnIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Branch 2" className="navbar-text"/>
          </ListItemButton>
        </Dropdown>

        <Dropdown overlay={renderBranchDropdown("branch3")} animation="slide-up" trigger={["click"]}>
          <ListItemButton className="button">
            <ListItemIcon className="button-content">
              <LocationOnIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Branch 3" className="navbar-text"/>
          </ListItemButton>
        </Dropdown>

        <p className="white-space"> &nbsp; </p>

        <ListItemButton className="button" href="/">
          <ListItemIcon className="button-content">
            <LogoutIcon className="navbar-text"/>
          </ListItemIcon>
          <ListItemText primary="Logout" className="navbar-text"/>
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
              <ReceiptLongIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Transactions" className="navbar-text"/>
          </ListItemButton>

          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/staff`}>
            <ListItemIcon className="button-content">
              <GroupsIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Staff" className="navbar-text"/>
          </ListItemButton>

          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/prices`}>
            <ListItemIcon className="button-content">
              <SellIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Prices" className="navbar-text"/>
          </ListItemButton>

          <ListItemButton className="button" href={`/role/owner/components/main/${branchName}/machines`}>
            <ListItemIcon className="button-content">
              <LocalLaundryServiceIcon className="navbar-text"/>
            </ListItemIcon>
            <ListItemText primary="Machines" className="navbar-text"/>
          </ListItemButton>
        </List>
      </div>
    );
  }
}

export default NavBar;
