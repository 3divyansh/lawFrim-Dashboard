import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOutOutline, IoArrowBackOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import "./Sidebar.css";

const SideBar = ({ collapsed, handleSidebaratmobile }) => {
  // State to track active page
  const [activePage, setActivePage] = useState('');


  const handleMenuItemClick = (page) => {
    setActivePage(page);  // Set the active page
    handleSidebaratmobile(); // Close the sidebar on mobile
  };

  return (
    <Sidebar collapsed={collapsed} className='sdiebarsection roundcard sidebar position-relative'>
      <Menu>
        {/* Sidebar logo */}
        <Link className="sidebarlogo w-100 d-flex justify-content-evenly pdding_for_section">
          <img
            className='me-4'
            src="https://tse4.mm.bing.net/th/id/OIP.ZcE2TWWZ8ohVWODy6aP4ywHaHa?pid=Api&P=0&h=220"
            alt=""
          />
          <IoArrowBackOutline
            className='d-flex d-md-none p-2 ms-5 d-flex align-items-center'
            onClick={handleSidebaratmobile}
          />
        </Link>

        {/* Dashboard Link */}
        <Link
          to="/"
          className={`menuitems ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('dashboard')}
        >
          <MenuItem className="itemscontent">
            <span><RiDashboardFill className="ms-2 me-5" /></span>
            <span>Dashboard</span>
          </MenuItem>
        </Link>

        
        
         <Link
          to="/blog"
          className={`menuitems ${activePage === 'Comment' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Comment')}
        >
          <MenuItem className="itemscontent">
            <span><BsPerson className="ms-2 me-5" /></span>
            <span>Blog</span>
          </MenuItem>
        </Link>  
      </Menu>

      {/* Logout Button */}
      <div className="logoutbtn w-100 text-center py-4 position-absolute bottom-0">
        <Link to="/login" className="theme-btn border-0 d-inline-block text-decoration-none">
          {collapsed ? <IoLogOutOutline /> : "Logout"}
        </Link>
      </div>
    </Sidebar>
  );
};

export default SideBar;
