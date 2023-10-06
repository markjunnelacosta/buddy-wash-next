import React from 'react';
import Link from 'next/link';
import './page.css';


import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';

function NavBar() {
  return (
    <div>
      <div className="container">
        <div className="name">
          <p className="center-text-name">BuddyWash</p>
        </div>
        <div className="role">
          <Person2RoundedIcon className="user-icon" />
          <p className="center-text">Admin</p>
        </div>
      </div>

      <div className="sidebar">
        <ul className="sidebar-list">
          <li>
            <Link href="/role/admin/users">Users</Link>
          </li>
          <li>
            <Link href="/role/admin/branches">Branches</Link>
          </li>
          <li>
            <Link href="/role/admin/mobile-users">Mobile Users</Link>
          </li>
          <li>
            <Link href="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>

  )
}
export default NavBar;