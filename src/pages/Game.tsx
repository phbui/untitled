import { useContext, useEffect, useState } from "react";
import { User } from "../App";
import {
  Dialogue,
  Dialogue_Next,
  Dialogue_Option,
} from "../dialogue/Interfaces";
import { story } from "../dialogue/Story";
import { Character } from "../components/Creation";
import { useNavigate } from "react-router-dom";

export interface Save_Data {
  chapter_id: string;
  scene_id: string;
  dialogue_id: string;
}

const Game = () => {
  const navigate = useNavigate();
  const user = useContext(User);
  const [currentChapterId, setCurrentChapterId] = useState<string>("");
  const [currentSceneId, setCurrentSceneId] = useState<string>("");
  const [backgroundURL, setBackgroundURL] = useState<string>("");
  const [currentDialogueId, setCurrentDialogueId] = useState<string>("");
  const [dialogue, setDialogue] = useState<Dialogue>();
  const [dialogueOptions, setDialogueOptions] = useState<Dialogue_Option[]>();

  const saveGame = () => {
    const saveData: Save_Data = {
      chapter_id: currentChapterId,
      scene_id: currentSceneId,
      dialogue_id: currentDialogueId,
    };
  };

  const parseSaveData = (saveData: Save_Data) => {
    setCurrentChapterId(saveData.chapter_id);
    setCurrentSceneId(saveData.scene_id);
    setCurrentDialogueId(saveData.dialogue_id);
  };

  useEffect(() => {
    if (user.character === undefined) navigate("/Home");

    const saveData = {
      chapter_id: "start",
      scene_id: "start",
      dialogue_id: "start",
    };

    parseSaveData(saveData);
  }, []);

  const getChapter = (id: string) => story[id];

  const getNextChapter = (next: Dialogue_Next) => {
    if (next.chapter_id === undefined) return;

    setCurrentChapterId(next.chapter_id);
    getNextScene(next);
  };

  const getScene = (id: string) => getChapter(currentChapterId).scenes[id];

  const getNextScene = (next: Dialogue_Next) => {
    if (next.scene_id === undefined) return;

    setCurrentSceneId(next.scene_id);
    getNextDialogue(next);
  };

  const getDialogue = (id: string) => getScene(currentSceneId).dialogue[id];

  const getCurrentDialogue = () => setDialogue(getDialogue(currentDialogueId));

  const getNextDialogue = (next: Dialogue_Next) => {
    if (next.dialoge_id === undefined) return;

    setCurrentDialogueId(next.dialoge_id);
  };

  const getInitialized = () =>
    currentChapterId.length > 0 &&
    currentSceneId.length > 0 &&
    currentChapterId.length > 0;

  useEffect(() => {
    if (getInitialized()) {
      getCurrentDialogue();
      setBackgroundURL(getScene(currentSceneId).background);
    }
  }, [currentDialogueId, currentSceneId, currentDialogueId]);

  const summonOptions = () =>
    setDialogueOptions(getDialogue(currentDialogueId).next.dialog_options);

  const chooseOption = (option: Dialogue_Option) => {
    setDialogueOptions([]);
    getNext(option.next);
  };

  const getNext = (next: Dialogue_Next | undefined) => {
    if (next === undefined) return;

    if (next.chapter_id) getNextChapter(next);
    else if (next.scene_id) getNextScene(next);
    else if (next.dialog_options) summonOptions();
    else if (next.dialoge_id) setCurrentDialogueId(next.dialoge_id);
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
        <div className="dialogue" onClick={() => getNext(dialogue?.next)}>
          {dialogue?.character_name} : {dialogue?.text}
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
