import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import UserContext from "./UserContext";

export const User = createContext(
  {} as unknown as ReturnType<typeof UserContext>
);

const App: React.FC = () => {
  const user = UserContext();

  return (
    <Router>
      <User.Provider value={user}>
        <div className="App">
          <Routes>
            <Route path="/play" element={<Game />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </User.Provider>
    </Router>
  );
};

export default App;
