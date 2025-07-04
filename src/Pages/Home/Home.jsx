import React, { useEffect, useState } from 'react'
import { FaChevronDown ,FaChevronRight } from "react-icons/fa6";
import { MdOutlineDriveFileMove } from "react-icons/md";


import '@schedule-x/theme-default/dist/index.css'

import "./Home.css"

const Home = () => {
  // const eventsService = useState(() => createEventsServicePlugin())[0]
 
  

  return (
    <div className='homedashboard   '>
      <div className="dashboard heading w-100 d-flex justify-content-between pdding_for_section pt-1 pb-2">
  <p className="mb-0 d-flex align-items-center ">
  Dashboard <FaChevronRight className="mx-2 d-flex my-1" /> <span className=' cursor-pointer' >Home</span>
  </p>
  <div className="dashboard d-none  dates d-md-flex gap-3">
    <p className="datetiming mb-0   d-flex align-items-center">
      Feb 11, 2025 - Mar 12, 2026 <FaChevronDown className="ms-2 d-flex align-items-center cursor-pointer" />
    </p>
    <span className="gotoicon accordionfle d-flex align-items-center ">
      <MdOutlineDriveFileMove  className=' d-flex align-items-center fs-6 cursor-pointer '/>
    </span>
  </div>
</div>


    </div>
  )
}

export default Home