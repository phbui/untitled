import { useState } from "react";
import { Character } from "./components/Creation";

const UserContext = () => {
  const [character, setCharacter] = useState<Character>();

  const user = {
    character,
    setCharacter,
  };

  return user;
};

export default UserContext;
