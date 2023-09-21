import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';
import './App.css';
import SignIn from './pages/signin/sign';
import HomePage from './pages/Home/home';
import { useLocation } from 'react-router-dom';

function App () {
  const location = useLocation()
  return(
    
      <>
      
      <div className='dashboard-container'>
        {location.pathname === '/' ? <SignIn /> :<SideBar menu={sidebar_menu} />}
        
          
          <div className='dashboard-body'>
            
              <Routes>
                  <Route exact path="/dashboard" element={<HomePage />} />
                  <Route exact path="/earnings" element={<h1 ><center>My Earnings</center></h1>} />
                  <Route exact path="/assets" element={<h1><center>My Assets</center></h1>} />
                  <Route exact path="/services" element={<h1><center>My Services</center></h1>} />
              </Routes>
          </div>
      </div>
      
      </>
   
  )
}

export default App;