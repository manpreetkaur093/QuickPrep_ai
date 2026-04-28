import { useEffect, useState } from "react";
import { getQuestions } from "../services/api";

function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error(error);
        alert("Unauthorized or failed to fetch questions ❌");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Questions</h2>

      {questions.length === 0 ? (
        <p>No questions found</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              <strong>{q.title}</strong>
              <p>{q.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Questions;