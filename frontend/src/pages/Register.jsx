import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/common.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await registerUser(form);
      alert("Registered successfully ✅");
      navigate("/");
    } catch {
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Sign Up</h2>

        <input
          className="input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="button" onClick={handleRegister}>
          Register
        </button>

        <div className="link">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;