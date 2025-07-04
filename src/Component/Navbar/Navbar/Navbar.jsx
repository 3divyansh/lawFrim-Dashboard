import React from 'react'
import { IoSettingsOutline,IoArrowBackOutline,IoArrowForward  } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdFullscreen } from "react-icons/md";
import { Form } from "react-bootstrap";
import "./Navbar.css"
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
const Navbar = ({handleSidebarCollapse,collapsed,handleSidebaratmobile,displaynav}) => {
  
  
  return (
    <>
   <div className="Navbar w-100 ">
  <div className="Navbarsection   d-flex justify-content-between align-items-center  ">
    
    <Link
      className="nav-bar-link d-none d-md-flex fs-3  p-2 d-flex  align-items-center"
      onClick={() => handleSidebarCollapse()}
    >
      {collapsed?<IoArrowForward />:<IoArrowBackOutline  />
 }
    </Link>
    
    <Link
      className="nav-bar-link d-flex d-md-none fs-3  p-2 d-flex  align-items-center"
      onClick={() => handleSidebaratmobile()}>
      <RxHamburgerMenu />

    </Link>
  
        </div>
</div>
    </>
  )
}

export default Navbar