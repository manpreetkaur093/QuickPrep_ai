import { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const token = await loginUser({ email, password });

    console.log("TOKEN RECEIVED:", token);

    if (!token || token.length < 20) {
      throw new Error("Invalid token");
    }

    localStorage.setItem("token", token);

    alert("Login successful 🚀");
    window.location.href = "/questions";

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert("Login failed ❌");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;