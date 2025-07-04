import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Navbar/SideBar/SideBar'
import Navbar from '../Navbar/Navbar/Navbar'
import "./Layout.css"
import { Container } from 'react-bootstrap'
const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [displaynav ,setdisplaynav] = useState(true);
 
  const handleSidebarCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const handleSidebaratmobile=()=>{
    setdisplaynav(!displaynav);
    setCollapsed(!collapsed);
  }
 
  return (
    <>
    <div className="layoutsection   position-relative d-flex overflow-x-hidden "> 
    <section className={`sidesection    pdding_for_section pe-0  ${displaynav?"d-flex":"  onlick"}`}>
  
   <SideBar className=" end-100   " collapsed={collapsed} handleSidebaratmobile={handleSidebaratmobile}  />
   </section>

   <div className="rightsection position-relative  ">
    <div className="navbarframe pdding_for_section pb-0 ">
   <Navbar className=" position-fixed top-0   "
    
    handleSidebarCollapse={handleSidebarCollapse} 
    handleSidebaratmobile={handleSidebaratmobile}
    displaynav={displaynav}
    collapsed={collapsed}
    
    /> 
    </div>
    <Container fluid className='layoutchildren w-100 overflow-x-hidden '>
      
      <Outlet/>
     
    </Container>
   </div>
   
  </div>
    </>
  )
}

export default Layout