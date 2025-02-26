import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TournamentPage from "./pages/TournamentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tournament" element={<TournamentPage />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;