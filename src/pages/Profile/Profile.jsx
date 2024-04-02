import React, { useContext, useEffect, useState } from "react";

import "./Profile.css";
import { UserContext } from "../../Context/User.jsx";
import { NavLink, Outlet } from "react-router-dom";
function Profile() {
  const { userName } = useContext(UserContext);

  return (
    <>
      <div className="container">
      <div className="about d-flex gap-5 flex-row flex-wrap align-items-start">
       {/* <nav className="sideBar row p-5 w-50   btn btn-outline-secondary">
           <span className="name fs-3 mb-3">{userName}</span>
          <NavLink className="nav-link" to="About" aria-current="page">
            about
          </NavLink>
          <NavLink className="nav-link" to="Contact">
            contact
          </NavLink>
          <NavLink className="nav-link" to="Orders">
            orders
          </NavLink>
        </nav> */}
       <nav className="navbar text-light ">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="offcanvas offcanvas-end text-bg-light" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">welcome {userName}</h5>
        <button type="button" className="btn-close btn-close-warning" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
          <NavLink className="nav-link" to="About" aria-current="page">
            about
          </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="Contact">
            contact
          </NavLink>
          </li>
          <li className="nav-item dropdown">
          <NavLink className="nav-link" to="Orders">
            orders
          </NavLink>
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</nav>

          <Outlet />
        
       </div>
      </div>
    </>
  );
}

export default Profile;
