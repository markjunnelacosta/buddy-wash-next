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
import SpeedIcon from "@mui/icons-material/Speed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupsIcon from "@mui/icons-material/Groups";
import SellIcon from "@mui/icons-material/Sell";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";

function NavBar() {
  return (
    <div className="side-nav-bar-container">
      <List component="nav">
        <React.Fragment>
          <ListItemButton
            className="button"
            href="/role/owner/components/main/dashboard"
          >
            <ListItemIcon className="button-content">
              <SpeedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <Dropdown>
            <DropdownTrigger>
              <ListItemButton className="button">
                <ListItemIcon className="button-content">
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Branch 1" />
              </ListItemButton>
            </DropdownTrigger>
            <DropdownMenu className="dropdown-item" aria-label="Static Actions">
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch1/transactions"
                >
                  <ListItemIcon className="button-content">
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch1/Staff"
                >
                  <ListItemIcon className="button-content">
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Staff" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch1/prices"
                >
                  <ListItemIcon className="button-content">
                    <SellIcon />
                  </ListItemIcon>
                  <ListItemText primary="Prices" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch1/machines"
                >
                  <ListItemIcon className="button-content">
                    <LocalLaundryServiceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Machines" />
                </ListItemButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <ListItemButton className="button">
                <ListItemIcon className="button-content">
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Branch 2" />
              </ListItemButton>
            </DropdownTrigger>
            <DropdownMenu className="dropdown-item" aria-label="Static Actions">
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch2/transactions"
                >
                  <ListItemIcon className="button-content">
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch2/Staff"
                >
                  <ListItemIcon className="button-content">
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Staff" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch2/prices"
                >
                  <ListItemIcon className="button-content">
                    <SellIcon />
                  </ListItemIcon>
                  <ListItemText primary="Prices" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch2/machines"
                >
                  <ListItemIcon className="button-content">
                    <LocalLaundryServiceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Machines" />
                </ListItemButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <ListItemButton className="button">
                <ListItemIcon className="button-content">
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Branch 3" />
              </ListItemButton>
            </DropdownTrigger>
            <DropdownMenu className="dropdown-item" aria-label="Static Actions">
              <DropdownItem>
                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch3/transactions"
                >
                  <ListItemIcon className="button-content">
                    <ReceiptLongIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transactions" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch3/Staff"
                >
                  <ListItemIcon className="button-content">
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Staff" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch3/prices"
                >
                  <ListItemIcon className="button-content">
                    <SellIcon />
                  </ListItemIcon>
                  <ListItemText primary="Prices" />
                </ListItemButton>

                <ListItemButton
                  className="button"
                  href="/role/owner/components/main/branch3/machines"
                >
                  <ListItemIcon className="button-content">
                    <LocalLaundryServiceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Machines" />
                </ListItemButton>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

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
