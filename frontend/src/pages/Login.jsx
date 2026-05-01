import { useState } from "react";
import { loginUser } from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);

      if (res.role === "ROLE_ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/questions";
      }
    } catch {
      alert("Login failed ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;