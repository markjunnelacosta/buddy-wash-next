import React from 'react';
import NavBar from './components/navBar/navBar';
import { Header } from './components/header/header';

const Layout = ({ children }) => {
    return (
      <div>
        <Header />
        <main>{children}</main>
        <NavBar />
      </div>
    );
  };
  
  export default Layout;