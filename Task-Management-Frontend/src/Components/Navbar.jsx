import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

export const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to={"/addTask"} >Add Tasks </Link>
      <Link to={"/viewTask"}>View Tasks</Link>
      <Link to={"/"}>Login</Link> 
      <Link to={"/signup"}>Signup</Link> 
    </div>
  );
};