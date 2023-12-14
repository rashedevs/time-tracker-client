import React from "react";
import CustomLink from "../CustomLink/CustomLink";
import "./Header.css";
const Header = () => {
  return (
    <div>
      <nav className="nav-container">
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/entries">Entries</CustomLink>
        <CustomLink to="/weeklysheet">Weekly Time Sheet</CustomLink>
      </nav>
    </div>
  );
};

export default Header;
