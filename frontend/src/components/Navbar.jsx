import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    setIsLoggedIn(!!token);
    setName(storedName || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name"); 
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo">
          QuickPrep AI 🚀
        </Link>
        <div>Crack interviews with AI in one click.</div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/" className="nav-link">
          AI Generator
        </Link>

        <Link to="/questions" className="nav-link">
          Questions
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>

            <Link to="/register" className="nav-button">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* 👤 USER NAME */}
            <span className="username">Hi, {name} 👋</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;