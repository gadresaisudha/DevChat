import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = ()=>{
return (
    <header>
    <div>
      <h1>DevChat</h1>
    </div>
    <div>
    <nav>
      <ul>
        <Link to ="/login">Login </Link>
        <Link to ="/register">Register </Link>
        <Link to ="/logout">Logout </Link>
      </ul>
    </nav>

    <div>
    Welcome to DevChat!

    We're a thriving community where developers come together to share their challenges, solve problems, and showcase their projects. Whether you're looking for help with a tough bug, seeking advice on best practices, or excited to show off your latest work, DevChat is the place for you.

    Join us to connect with fellow developers, expand your knowledge, and grow your skills in a supportive and collaborative environment!
    </div>
    </div>
  </header>
)
};