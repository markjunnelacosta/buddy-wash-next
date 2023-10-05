import React from 'react'
import NavBar from '../page';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
