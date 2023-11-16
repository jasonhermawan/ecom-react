import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "boxicons";
import axios from "axios";
import SearchCard from "../SearchCard";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [dataProducts, setDataProducts] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const getAccountData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/account/check/account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsername(response.data.username)
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setRole(response.data.role);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAccountData();
  }, [])

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
    if (profileClick === true) {
      if (role === "store") {
        return (
          <div className="dropdown-profile">
            <h3 className="welcoming-text">Welcome, {username || email}</h3>
            <hr />
            <ul>
              <li onClick={() => navigate("/account/settings")}>
                <i class="bx bx-user"></i>
                <h3>Account</h3>
              </li>
              <li onClick={() => navigate("/store/manage")}>
                <i class="bx bx-bar-chart-alt-2"></i>
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
      } else if (role === "user") {
        return (
          <div className="dropdown-profile">
            <h3 className="welcoming-text">Welcome, {username || email}</h3>
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
    if (token) {
      return (
        <div id="login-nav">
          <img
            className="profile-picture"
            src="https://images.tokopedia.net/img/cache/300/tPxBYm/2023/1/20/bc329335-3ba7-43d2-a2ee-75162ac97055.jpg"
            alt=""
            height={"50px"}
            onMouseEnter={() => setProfileClick(true)}
            style={{ cursor: "pointer" }}
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

  const getProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/`)
      .then((res) => {
        setDataProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const printSearchResult = () => {
    return dataProducts
      .filter((value) => {
        return value.name.toLowerCase().includes(searchInput.toLowerCase());
      })
      .map((value) => {
        console.log("Ini value search", value);
        return (
          <SearchCard
            productname={value.name}
            onclick={() => {
              navigate(`/detail/${value.account.username}/${value.name}/${value.id}`);
              setSearchInput("");
            }}
          />
        );
      });
  };

  const printSearch = () => {
    if (searchInput === "") {
      return "";
    } else {
      return (
        <div id="search-result">
          <h3>Search Result</h3>
          {printSearchResult()}
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
          <img src={logo} alt="" onClick={() => navigate("/")} />
          <div id="input-search-container">
            <input
              value={searchInput}
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {printSearch()}
          </div>
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
