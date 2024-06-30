import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = ()=>{
return (
    <header className="header">
    <div className="header-title">
      <h1>DevChat</h1>
    </div>
    <nav className="header-nav">
      <ul>
        <Link to ="/">Home </Link>
        <Link to ="/login">Login </Link>
        <Link to ="/register">Register </Link>
      </ul>
    </nav>
  </header>
)
};