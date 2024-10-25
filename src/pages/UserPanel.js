import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faEdit, faCog } from '@fortawesome/free-solid-svg-icons';


// Import your components
import EditProfile from '../components/EditProfile';
import HistoryOrder from '../components/HistoryOrder';
import Setting from '../components/Setting';

import "./UserPanel.css";

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  // State to track active component (default to 'profile')
  const [activeComponent, setActiveComponent] = useState('profile');

  // State to manage edit profile modal

  // Update this effect to ensure correct access control
  useEffect(() => {
    if (user?.role !== ROLE.GENERAL) {
      navigate("/");
    }
  }, [user, navigate]);



  // Function to render the active component

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'editProfile':
        return (
          <EditProfile 
            userData={user} 
          />
        );
      case 'historyOrder':
        return (
          <HistoryOrder
          userId = {user?._id}
          
         />
        );
      case 'setting':
        return (
        <Setting
        userData={user}
         />
        );
      default:
        return (
          <div className="panel-body bio-graph-info">
            <h1>Bio Graph</h1>
            <div className="row">
              <div className="bio-row">
                <p>
                  <span>Full Name </span>: {user?.name}
                </p>
              </div>
              <div className="bio-row">
                <p>
                  <span>Email </span>: {user?.email}
                </p>
              </div>
              <div className="bio-row">
                <p>
                  <span>Country </span>: Viet Nam
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="profile-nav col-md-3">
          <div className="panel">
            <div className="user-heading round">
              <a href="#">
                <img src={user?.profilePic || "https://via.placeholder.com/150"} alt="User Avatar" />
              </a>
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
            </div>

            <div className="row">
              <div className="w-full">
                <div className="list-group" id="list-tab" role="tablist">
                  <a
                    className={`list-group-item list-group-item-action ${activeComponent === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('profile')}
                    role="tabpanel"
                    aria-controls="list-profile"
                  >
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} /> Profile
                  </a>
                  <a
                    className={`list-group-item list-group-item-action ${activeComponent === 'historyOrder' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('historyOrder')}
                    role="tabpanel"
                    aria-controls="list-history"
                  >
                    <FontAwesomeIcon icon={faHistory} style={{ marginRight: "10px" }} /> History Order
                  </a>
                  <a
                    className={`list-group-item list-group-item-action ${activeComponent === 'editProfile' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('editProfile')}
                    role="tabpanel"
                    aria-controls="list-edit"
                  >
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} /> Edit Profile
                  </a>
                  <a
                    className={`list-group-item list-group-item-action ${activeComponent === 'setting' ? 'active' : ''}`}
                    onClick={() => setActiveComponent('setting')}
                    role="tabpanel"
                    aria-controls="list-settings"
                  >
                    <FontAwesomeIcon icon={faCog} style={{ marginRight: "10px" }} /> Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info col-md-9">
          <div className="panel">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;