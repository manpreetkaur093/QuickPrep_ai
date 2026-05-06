import { useState, useEffect } from "react";
import { addQuestion } from "../services/api";
import "../styles/admin.css";

function Admin() {
  const [question, setQuestion] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ROLE_ADMIN") {
      alert("Access denied ❌");
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await addQuestion(question);
      alert("Question added ✅");
      setQuestion({ title: "", description: "" });
    } catch {
      alert("Failed ❌");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2 className="admin-title">Admin Panel ⚙️</h2>

        <div className="admin-section">
          <h3>Add New Question</h3>

          <input
            className="admin-input"
            name="title"
            placeholder="Enter question title"
            value={question.title}
            onChange={handleChange}
          />

          <textarea
            className="admin-textarea"
            name="description"
            placeholder="Enter question description"
            value={question.description}
            onChange={handleChange}
          />

          <button className="admin-btn" onClick={handleAdd}>
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;