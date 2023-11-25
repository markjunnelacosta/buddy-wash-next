"use client";
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
  } from "@mui/material";
  import Person from "@mui/icons-material/Person";
  import MenuIcon from "@mui/icons-material/Menu";
  import React from "react";
  import "./header.css";
  
  export const Header = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar className="header-toolbar">
              <div id="logoText">
                <span>B u d d y W a s h</span>
              </div>
              <div className="right-side">
              <h5 id= "owner" style={{color: "black"}}>Owner</h5>
              <IconButton>
                <Person />
              </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </>
    );
  };
  