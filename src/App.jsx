import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Pages/Home/Home.jsx'
import Blog from "./Pages/Blog/Blog.jsx"




  const App = () => {
    return (
      <>
        <BrowserRouter>
        <Routes >
      <Route exact  path='/' element={<Layout/>} >

      <Route exact path='/' element={<Home/>} />

  <Route path='/blog' element={<Blog />} />
      <Route  path='*' element={<p>not found</p>}/>
      
      </Route>

      <Route path='*' element={<p>not found</p>}/>
        </Routes>
        </BrowserRouter>      
      </>
    )
  }

  export default App