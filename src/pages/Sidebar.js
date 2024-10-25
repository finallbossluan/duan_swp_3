import React from 'react';
import Draggable from 'react-draggable';
import { FaNewspaper, FaRobot, FaTimes } from 'react-icons/fa';
import './Sidebar.css';

import { Link, Routes, Route } from 'react-router-dom';
import SupportCustomer from '../components/Support'; // Component Support

const Sidebar = ({ onClose }) => {
  return (
    <Draggable>  
      <div className="sidebar"> 
      
      <div className="icon-list">
          <Link to="/News">
            <FaNewspaper className="icon" />
          </Link>
          <Routes>
          <Route path="/" element={<SupportCustomer />} />
        </Routes>
        </div>

       
      
      </div>
     
    </Draggable>
  );
};

export default Sidebar;
