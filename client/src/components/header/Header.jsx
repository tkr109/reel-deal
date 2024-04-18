import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/ReelDeal.png";
import { useNavigate } from "react-router-dom";

const cities = ["Patiala", "Delhi", "Ambala"]; // List of cities to choose from

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
      setSelectedCity(user.city); // Set the default city from the user's data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleProfileClick = () => {
    if (loginUser.isAdmin) {
      console.log("Navigating");
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    // Update the user's city in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.city = city;
      localStorage.setItem("user", JSON.stringify(user));
    }
    window.location.reload();
  };

  

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" style={{height:"32px"}}/>
        </div>

        <ul className="menuItems">
          {loginUser ?(<div className="custom-select">
            <select
              value={selectedCity}
              className="custom-select-box"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                marginRight:"25px"
              }}
              onChange={(e) => handleCityChange(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city} style={{ color: "white",background: "#10273F"  }}>
                  {city}
                </option>
              ))}
            </select>
          </div>) : null}

          {loginUser ? (
            <>
              <AiOutlineUser
                style={{ color: "white" }}
                className="menuItemicon "
                onClick={handleProfileClick}
              />
              <li className="menuItem" onClick={handleProfileClick} id="profile">
                {loginUser.name}
              </li>
              <AiOutlineLogout
                id="logout"
                style={{ color: "white" }}
                className="menuItemicon"
                onClick={handleLogout}
              />
            </>
          ) : null}
        </ul>
      </ContentWrapper>
    </header>
  );
};

export default Header;