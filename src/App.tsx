import React from "react";
import DressUpCharacter from "./components/DressUpCharacter";
import DressUpWardrobe from "./components/DressUpWardrobe";

const App: React.FC = () => {
  return (
    <div className="App">
      <DressUpWardrobe />
      <DressUpCharacter />
    </div>
  );
};

export default App;
