import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
      <Link to="/register">Sign Up</Link>
    </nav>
  );
}

export default Navbar;