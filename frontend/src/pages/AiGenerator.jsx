import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAI } from "../services/api";
import "./AiGenerator.css";


function AiGenerator() {
  const [form, setForm] = useState({
    skills: "",
    projects: "",
    experience: "",
    technologies: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!form.skills || !form.projects || !form.experience || !form.technologies) {
      alert("Please fill all fields");
      return;
    }

    if (!isLoggedIn) {
      alert("Login to unlock all questions. Showing limited preview.");
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await generateAI(form);
      setResult(data);
    } catch (err) {
      alert("Failed to generate questions");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">AI Interview Generator</h2>

        {/* 🔒 Message */}
        {!isLoggedIn && (
          <p className="warning">
            ✨ Sign in to unlock all 30 AI-generated interview questions
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="skills"
            placeholder="Skills (Java, React...)"
            onChange={handleChange}
          />

          <input
            className="input"
            name="projects"
            placeholder="Projects"
            onChange={handleChange}
          />

          <input
            className="input"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
          />

          <input
            className="input"
            name="technologies"
            placeholder="Technologies"
            onChange={handleChange}
          />

          <button className="button" disabled={loading}>
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </form>

        {/* EMPTY STATE */}
        {!result && !loading && (
          <p className="empty">Fill the form and generate AI questions</p>
        )}

        {/* RESULTS */}
        {result && (
          <div className="results">

            {/* MEDIUM */}
            <div className="section">
              <h3>Medium Questions</h3>

              {result?.medium?.length > 0 ? (
                result.medium.map((q, i) => {
                  const isLocked = !localStorage.getItem("token") && i >= 5;

                  return (
                    <div
                      key={i}
                      className={`question ${isLocked ? "locked" : ""}`}
                      onClick={() => {
                        if (isLocked) navigate("/register");
                      }}
                    >
                      {q}
                    </div>
                  );
                })
              ) : (
                <p>No medium questions available</p>
              )}
            </div>

            {/* ADVANCED */}
            <div className="section">
              <h3>Advanced Questions</h3>

              {result?.advanced?.length > 0 ? (
                result.advanced.map((q, i) => {
                  const isLocked = !localStorage.getItem("token") && i >= 5;

                  return (
                    <div
                      key={i}
                      className={`question ${isLocked ? "locked" : ""}`}
                      onClick={() => {
                        if (isLocked) navigate("/register");
                      }}
                    >
                      {q}
                    </div>
                  );
                })
              ) : (
                <p>No advanced questions available</p>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default AiGenerator;