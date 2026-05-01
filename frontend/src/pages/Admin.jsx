import { useState, useEffect } from "react";
import { addQuestion } from "../services/api";

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
    <div>
      <h2>Admin Panel</h2>

      <input
        name="title"
        placeholder="Title"
        value={question.title}
        onChange={handleChange}
      />
      <br />

      <textarea
        name="description"
        placeholder="Description"
        value={question.description}
        onChange={handleChange}
      />
      <br />

      <button onClick={handleAdd}>Add Question</button>
    </div>
  );
}

export default Admin;