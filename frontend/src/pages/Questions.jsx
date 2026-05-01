import { useEffect, useState } from "react";

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://interview-backend-3n8v.onrender.com/questions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
    <div>
      <h2>Questions</h2>

      {questions.length === 0 ? (
        <p>No questions found</p>
      ) : (
        questions.map((q) => (
          <div key={q.id}>
            <h3>{q.title}</h3>
            <p>{q.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Questions;