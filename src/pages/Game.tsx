import { useContext, useEffect, useState } from "react";
import { User } from "../App";
import { Chapter, Dialogue, Dialogue_Option } from "../dialogue/Interfaces";
import { story } from "../dialogue/Chatpers";
import { Character } from "../components/Creation";
import { useNavigate } from "react-router-dom";

export interface Save_Data {
  chapter_index: number;
  scene_index: number;
  dialogue_id: string;
}

const Game = () => {
  const navigate = useNavigate();
  const user = useContext(User);
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [backgroundURL, setBackgroundURL] = useState<string>("");
  const [currentDialogueId, setCurrentDialogueId] = useState<string>("");
  const [dialogue, setDialogue] = useState<Dialogue>();
  const [dialogueOptions, setDialogueOptions] = useState<Dialogue_Option[]>();
  const [inOptions, setInOptions] = useState<boolean>(false);

  const parseSaveData = (saveData: Save_Data) => {
    setCurrentChapter(saveData.chapter_index);
    setCurrentScene(saveData.scene_index);
    setCurrentDialogueId(saveData.dialogue_id);
  };

  useEffect(() => {
    if (user.character === undefined) navigate("/Home");

    const saveData = {
      chapter_index: 0,
      scene_index: 0,
      dialogue_id: "start",
    };

    parseSaveData(saveData);
  }, []);

  const getChapter = (index: number) => {
    return story[index];
  };

  const getScene = (index: number) => {
    return getChapter(currentChapter).scenes[index];
  };

  useEffect(() => {
    setBackgroundURL(getScene(currentScene).background);
  }, [currentScene]);

  const getDialogue = (id: string) => {
    return getScene(currentScene).dialogue[id];
  };

  const getCurrentDialogue = () => {
    setDialogue(getDialogue(currentDialogueId));
  };

  useEffect(() => {
    getCurrentDialogue();
  }, [currentDialogueId]);

  const getNextChapter = () => {
    if (story.length === currentChapter - 1) {
      setCurrentChapter((prev) => prev + 1);
      setCurrentScene(0);
      setCurrentDialogueId("start");
    }
  };

  const getNextScene = () => {
    if (getChapter(currentChapter).scenes.length === currentScene - 1)
      getNextChapter();
    else {
      setCurrentScene((prev) => prev + 1);
      setCurrentDialogueId("start");
    }
  };

  const summonOptions = () =>
    setDialogueOptions(getDialogue(currentDialogueId).options);

  const chooseOption = (option: Dialogue_Option) => {
    setCurrentDialogueId(option.nextId);
    setDialogueOptions([]);
  };

  const getNextDialoge = () => {
    if (dialogue?.nextId) setCurrentDialogueId(dialogue?.nextId);
    else if (dialogue?.options) summonOptions();
    else if (dialogue?.end) getNextScene();
  };

  return (
    <div className="game">
      <img className="game-background" src={backgroundURL} />
      <div className="game-buttons"></div>
      <div className="game-characters">
        <div className="pc">
          <Character character={user.character} />
        </div>
        <div className="npc">
          <Character character={user.character} />
        </div>
      </div>
      <div className="dialogue-container">
        <div className="dialogue" onClick={getNextDialoge}>
          {dialogue?.characterName} : {dialogue?.text}
        </div>
      </div>
      <div className="dialogue-options">
        {dialogueOptions?.map((option: Dialogue_Option) => {
          return <div onClick={() => chooseOption(option)}>{option.text}</div>;
        })}
      </div>
    </div>
  );
};

export default Game;
