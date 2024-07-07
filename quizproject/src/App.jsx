import { Route, Routes } from "react-router-dom";
import Start from "./components/Start/Start";
import Questions from "./components/Questions/Questions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/questions" element={<Questions />} />
    </Routes>
  );
}

export default App;
