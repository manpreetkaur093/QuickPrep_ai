import { useEffect, useState } from "react";
import "../styles/common.css";

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://interview-backend-3n8v.onrender.com/questions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized or error");
        }

        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load questions ❌");
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="page">
      <div className="card" style={{ width: "600px" }}>
        <h2 className="title">General Interview Questions</h2>

        {questions.length === 0 ? (
          <p>No questions found</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="input">
              <strong>{q.title}</strong>
              <p>{q.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Questions;