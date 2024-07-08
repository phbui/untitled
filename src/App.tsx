import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Creation from "./pages/Creation";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Options from "./pages/Options";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create" element={<Creation />} />
          <Route path="/browse" element={<Catalog />} />
          <Route path="/play" element={<Game />} />
          <Route path="/options" element={<Options />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
