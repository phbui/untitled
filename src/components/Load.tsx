import { useContext, useEffect, useState } from "react";
import { User } from "../App";
import { Character } from "./Creation";
import { fetchStory } from "../pages/Editor";
import { Story } from "../story/Interfaces";

export interface Props_Load {
  startGame?: () => void;
}

const Load: React.FC<Props_Load> = ({ startGame }) => {
  const user = useContext(User);
  const [userData, setUserData] = useState<any>();
  const [story, setStory] = useState<Story>();

  const getChapter = () => (story as Story)[userData.currentChapterId];
  const getScene = () => getChapter().scenes[userData.currentSceneId];

  useEffect(() => {
    const load = async () => {
      const fetchedStory = await fetchStory();
      setStory(fetchedStory as Story);
    };
    load();
  }, []);

  const login = async () => {
    setUserData((await user.loadUserData())?.savedata);
  };

  const load = () => {
    if (startGame) startGame();
  };

  return (
    <div className="load-container">
      {userData ? (
        <div className="load-selection">
          <Character character={userData.player_character} />
          <div className="load-info">
            <h1>
              {getChapter().name}: {getScene().name}
            </h1>
            <div className="modal-buttons">
              <button onClick={load}>Load</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 style={{ fontWeight: 500 }}> You must login to load a game.</h3>
          <div className="modal-buttons">
            <div />
            <button onClick={login}>Login</button>
            <div />
          </div>
        </>
      )}
    </div>
  );
};

export default Load;
