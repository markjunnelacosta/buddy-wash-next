import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
  } from "@mui/material";
  import Person from "@mui/icons-material/Person";
  import React from "react";
  import "./header-owner.css";
  
  export const Header = () => {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar className="header-toolbar-owner">
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
  