import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Questions from "./pages/Questions";
import AiGenerator from "./pages/AiGenerator";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/login" element={<Login />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />

        {/* Questions (protected) */}
        <Route
          path="/questions"
          element={isLoggedIn ? <Questions /> : <Login />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={isLoggedIn ? <Admin /> : <Login />}
        />

        {/* AI PAGE (NOT protected 🔥) */}
        <Route path="/" element={<AiGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;