import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "boxicons";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [profileClick, setProfileClick] = useState(false)

  const clickHamburger = () => {
    setNav(!nav);
    console.log(nav);
  };

  const printNavmenu = () => {
    if (nav === true) {
      return (
        <div id="nav-mobile-menu">
          <input type="text" placeholder="Search products" />
          <ul>
            <li>
              <button onClick={() => navigate("/login")} className="login-btn">
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/register")}
                className="register-btn"
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  const printDropDown = () => {
    let userMail = localStorage.getItem("email");
    let userRole = localStorage.getItem("role");
    let username = localStorage.getItem("username");
    if (profileClick === true) {
      if (userRole === "store") {
        return (
          <div className="dropdown-profile">
            <h3 className="welcoming-text">Welcome, {username || userMail}</h3>
            <hr />
            <ul>
              <li onClick={() => navigate("/account/settings")}>
                <i class="bx bx-user"></i>
                <h3>Account</h3>
              </li>
              <li onClick={() => navigate("/store/manage")}>
                <i class='bx bx-bar-chart-alt-2'></i>
                <h3>Manage</h3>
              </li>
              <li onClick={() => navigate("/add-product")}>
                <i class="bx bx-add-to-queue"></i>
                <h3>Add Product</h3>
              </li>
            </ul>
            <div className="logout-btn" onClick={() => onLogout()}>
              <i class="bx bx-log-out"></i>
              <h3>Logout</h3>
            </div>
          </div>
        );
      } else if (userRole === "user") {
        return (
          <div className="dropdown-profile">
            <h3 className="welcoming-text">Welcome, {username || userMail}</h3>
            <hr />
            <ul>
              <li onClick={() => navigate("/account/settings")}>
                <i class="bx bx-user"></i>
                <h3>Account</h3>
              </li>
              <li>
              <i class="bx bx-shopping-bag"></i>
                <h3>Cart</h3>
              </li>
            </ul>
            <div className="logout-btn" onClick={() => onLogout()}>
              <i class="bx bx-log-out"></i>
              <h3>Logout</h3>
            </div>
          </div>
        );
      }
    }
  };

  const printRightNav = () => {
    let userMail = localStorage.getItem("email");
    let userRole = localStorage.getItem("role");
    if (userMail) {
      return (
        <div id="login-nav">
          <img
            className="profile-picture"
            src="https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/bc329335-3ba7-43d2-a2ee-75162ac97055.jpg"
            alt=""
            height={"50px"}
            onMouseEnter={() => setProfileClick(true)}
            style={{cursor: "pointer"}}
          />
          {printDropDown()}
        </div>
      );
    } else {
      return (
        <div id="right-side">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      );
    }
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div onMouseLeave={() => setProfileClick(false)}>
      <div id="top-nav">
        <ul>
          <li>Download App</li>
          <li>Become Seller</li>
          <li>Seller Education</li>
        </ul>
      </div>
      <div id="bottom-nav">
        <div id="left-side">
          <img
            src={logo}
            alt=""
            height={"40px"}
            onClick={() => navigate("/")}
          />
          <input type="text" placeholder="Search products" />
        </div>
        <div>{printRightNav()}</div>
      </div>
      <div id="bottom-nav-mobile">
        <img src={logo} alt="" height={"30px"} onClick={() => navigate("/")} />
        <div id="nav-hamburger" onClick={() => clickHamburger()}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {printNavmenu()}
    </div>
  );
};

export default Navbar;
