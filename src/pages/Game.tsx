import { useContext, useEffect, useState } from "react";
import { User } from "../App";
import { Chapter, Dialogue, Dialogue_Option } from "../dialogue/Interfaces";
import { story } from "../dialogue/Chatpers";
import { Character } from "../components/Creation";

export interface Save_Data {
  chapter_index: number;
  scene_index: number;
  dialogue_id: string;
}

const Game = () => {
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
    if (story.length === currentChapter - 1)
      setCurrentChapter((prev) => prev + 1);
  };

  const getNextScene = () => {
    if (getChapter(currentChapter).scenes.length === currentScene - 1)
      getNextChapter();
    else setCurrentScene((prev) => prev + 1);
  };

  const summonOptions = () => {
    setDialogueOptions(getDialogue(currentDialogueId).options);
    setInOptions(true);
  };

  const chooseOption = (option: Dialogue_Option) =>
    setCurrentDialogueId(option.nextId);

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
        <Character character={user.character} />
      </div>
      <div
        className={`dialogue ${inOptions && "in-options"}`}
        onClick={getNextDialoge}
      >
        {dialogue?.text}
      </div>
      <div className={`dialogue-options ${inOptions && "in-options"}`}>
        {dialogueOptions?.map((option: Dialogue_Option) => {
          return <div onClick={() => chooseOption(option)}>{option.text}</div>;
        })}
      </div>
    </div>
  );
};

export default Game;
