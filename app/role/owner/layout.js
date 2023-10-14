import React from 'react';
import NavBar from "./components/navBar/navBar";
import NavBarCopy from "./components/navBar/navBarCopy";
import { Header } from "@/app/role/owner/components/header/header";

const Layout = ({ children }) => {
    return (
      <div className="container">
        <Header />
        <main>{children}</main>
        <NavBar />
      </div>
    );
  };
  
  export default Layout; 
