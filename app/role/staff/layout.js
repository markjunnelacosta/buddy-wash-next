import React from 'react';
import NavBar from "./components/navBar/navBar";
import { Header } from "@/app/role/staff/components/header/Header";

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