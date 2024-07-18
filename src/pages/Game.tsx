import { useContext, useEffect, useState } from "react";
import { User } from "../App";
import {
  Dialogue,
  Dialogue_Next,
  Dialogue_Option,
  Story,
} from "../story/Interfaces";
import { Character } from "../components/Creation";
import Typewriter from "../components/Typewriter";
import { fetchCharacters, fetchStory } from "./Editor";
import { Character_Repository, Game_Character } from "../story/Characters";

export interface Save_Data {
  chapter_id: string;
  scene_id: string;
  dialogue_id: string;
}

const Game = () => {
  const user = useContext(User);
  const [loading, setLoading] = useState<boolean>(true);
  const [story, setStory] = useState<Story>({});
  const [characters, setCharacters] = useState<Character_Repository>({});
  const [currentChapterId, setCurrentChapterId] = useState<string>("");
  const [currentSceneId, setCurrentSceneId] = useState<string>("");
  const [backgroundURL, setBackgroundURL] = useState<string>();
  const [currentDialogueId, setCurrentDialogueId] = useState<string>("");
  const [dialogue, setDialogue] = useState<Dialogue>();
  const [dialogueOptions, setDialogueOptions] = useState<Dialogue_Option[]>();
  const [NPC, setNPC] = useState<Game_Character>();
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);

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
    const load = async () => {
      const fetchedStory = await fetchStory();
      setStory(fetchedStory as Story);
      const fetchedCharacters = await fetchCharacters();
      setCharacters(fetchedCharacters as Character_Repository);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (story) {
      setLoading(false);
      // if (user.character === undefined) navigate("/Home"); // uncomment for prod

      const saveData = {
        chapter_id: "day_one",
        scene_id: "start",
        dialogue_id: "start",
      };

      parseSaveData(saveData);
    }
  }, [story]);

  const getNPC = (id: string) => characters[id];

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
    if (next.dialogue_id === undefined) return;

    setCurrentDialogueId(next.dialogue_id);
  };

  const getInitialized = () =>
    !loading &&
    story &&
    currentChapterId.length > 0 &&
    currentSceneId.length > 0 &&
    currentDialogueId.length > 0;

  const prepCharacters = (dialogue_id: string) => {
    const chapter_id: string = getDialogue(dialogue_id).character_id;

    setPlayerTurn(chapter_id === "anon");
    setNPC(getNPC(chapter_id) ?? getNPC(chapter_id));
  };

  useEffect(() => {
    if (getInitialized()) {
      getCurrentDialogue();
      setBackgroundURL(getScene(currentSceneId).background);
      prepCharacters(currentDialogueId);
    }
  }, [currentDialogueId, currentSceneId, currentDialogueId, loading, story]);

  const summonOptions = () => {
    setDialogueOptions(getDialogue(currentDialogueId).next.dialog_options);
    setPlayerTurn(true);
  };

  const chooseOption = (option: Dialogue_Option) => {
    setPlayerTurn(false);
    setDialogueOptions([]);
    getNext(option.next);
  };

  const getNext = (next: Dialogue_Next | undefined) => {
    if (next === undefined) return;

    if (next.chapter_id) getNextChapter(next);
    else if (next.scene_id) getNextScene(next);
    else if (next.dialog_options) summonOptions();
    else if (next.dialogue_id) setCurrentDialogueId(next.dialogue_id);
  };

  return (
    <div className="game">
      {backgroundURL && <img className="game-background" src={backgroundURL} />}
      <div className="game-buttons"></div>
      <div className="game-characters">
        <div className={`pc ${playerTurn ? "active" : ""}`}>
          <Character character={user.character} />
        </div>
        {NPC && (
          <div
            className={`npc ${playerTurn ? "" : "active"}`}
            key={dialogue?.character_id}
          >
            <img src={NPC.url} />
          </div>
        )}
      </div>
      <div className="dialogue-container">
        <div>{NPC?.name}</div>
        <Typewriter dialogue={dialogue} getNext={getNext} />
        <div className="dialogue-options">
          {dialogueOptions?.map((option: Dialogue_Option) => {
            return (
              <div
                key={option.text}
                className="option"
                onClick={() => chooseOption(option)}
              >
                <div className="halftone" />
                <p>{option.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;
