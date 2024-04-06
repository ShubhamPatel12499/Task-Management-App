import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

export const Navbar = () => {
  return (
    <div className='navbar'>
      <Link style={{marginLeft:"30px", color:"white",textDecoration:"none"}} to={"/"} >Add Tasks </Link>
      <Link style={{marginLeft:"30px",color:"white",textDecoration:"none"}} to={"/viewTask"}>View Tasks</Link>
    </div>
  );
};