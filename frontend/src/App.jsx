import Login from "./pages/Login";
import Questions from "./pages/Questions";

function App() {
  const path = window.location.pathname;

  if (path === "/questions") {
    return <Questions />;
  }

  return <Login />;
}

export default App;