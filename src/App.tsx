import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/play" element={<Game />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
