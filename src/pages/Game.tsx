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
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export interface Save_Data {
  chapter_id: string;
  scene_id: string;
  dialogue_id: string;
}

const Game = () => {
  const user = useContext(User);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [story, setStory] = useState<Story>();
  const [characters, setCharacters] = useState<Character_Repository>({});
  const [currentChapterId, setCurrentChapterId] = useState<string>("");
  const [currentSceneId, setCurrentSceneId] = useState<string>("");
  const [backgroundURL, setBackgroundURL] = useState<string>();
  const [currentDialogueId, setCurrentDialogueId] = useState<string>("");
  const [dialogue, setDialogue] = useState<Dialogue>();
  const [dialogueOptions, setDialogueOptions] = useState<Dialogue_Option[]>();
  const [NPC, setNPC] = useState<Game_Character>();
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [transitionChapter, setTransitionChapter] = useState<string>();
  const [transitionScene, setTransitionScene] = useState<string>();
  const [animate, setAnimate] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isConfirmSaveModalOpen, setIsConfirmSaveModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [lastSavedData, setLastSavedData] = useState<Save_Data>({
    chapter_id: "",
    scene_id: "",
    dialogue_id: "",
  });

  const confirmSaveGame = () => {
    user.saveGame(currentChapterId, currentSceneId, currentDialogueId);
    setLastSavedData({
      chapter_id: currentChapterId,
      scene_id: currentSceneId,
      dialogue_id: currentDialogueId,
    });
    setIsConfirmSaveModalOpen(false);
    setIsSaveModalOpen(true);
  };

  const saveGame = () => {
    setIsConfirmSaveModalOpen(true);
  };

  const leave = () => {
    if (
      currentChapterId === lastSavedData.chapter_id &&
      currentSceneId === lastSavedData.scene_id &&
      currentDialogueId === lastSavedData.dialogue_id
    ) {
      navigate("/Home");
    } else {
      setIsLeaveModalOpen(true);
    }
  };

  const confirmLeave = () => {
    navigate("/Home");
  };

  const parseSaveData = (saveData: any) => {
    let data: Save_Data = {
      chapter_id: saveData.currentChapterId,
      scene_id: saveData.currentSceneId,
      dialogue_id: saveData.currentDialogueId,
    };

    setCurrentChapterId(data.chapter_id);
    setCurrentSceneId(data.scene_id);
    setCurrentDialogueId(data.dialogue_id);

    setLastSavedData(data);
  };

  const load = async () => {
    const fetchedStory = await fetchStory();
    setStory(fetchedStory as Story);
    const fetchedCharacters = await fetchCharacters();
    setCharacters(fetchedCharacters as Character_Repository);
    setLoading(false);
    let data = await user.loadUserData();
    if (data) parseSaveData(data.savedata);
    else {
      parseSaveData({
        currentChapterId: "day_one",
        currentSceneId: "start",
        currentDialogueId: "start",
      });
    }
  };

  useEffect(() => {
    load();
  }, [user.user]);

  useEffect(() => {
    if (story) {
      setLoading(false);
      if (user.character === undefined) navigate("/Home"); // uncomment for prod
    }
  }, [story]);

  const getNPC = (id: string) => characters[id];

  const getChapter = (id: string) => (story as Story)[id];

  const getNextChapter = (next: Dialogue_Next) => {
    if (next.chapter_id === undefined) return;

    getTransition(next.chapter_id.replace(" (current)", ""), "start");

    setTimeout(() => {
      setCurrentChapterId(
        (next.chapter_id as string).replace(" (current)", "")
      );
      getNextScene(next);
    }, 3000);
  };

  const getScene = (id: string) => getChapter(currentChapterId).scenes[id];

  const getNextScene = (next: Dialogue_Next) => {
    if (next.scene_id === undefined) return;

    getTransition(currentChapterId, next.scene_id.replace(" (current)", ""));

    setTimeout(() => {
      setCurrentSceneId((next.scene_id as string).replace(" (current)", ""));
      getNextDialogue(next);
    }, 3000);
  };

  const getDialogue = (id: string) => getScene(currentSceneId).dialogue[id];

  const getCurrentDialogue = () => setDialogue(getDialogue(currentDialogueId));

  const getNextDialogue = (next: Dialogue_Next) => {
    if (next.dialogue_id === undefined) return;

    setCurrentDialogueId(next.dialogue_id.replace(" (current)", ""));
  };

  const getTransition = (chapter_id: string, scene_id: string) => {
    setTransitionChapter(getChapter(chapter_id).name);
    setTransitionScene(getScene(scene_id).name);

    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 6000);
  };

  const getInitialized = () =>
    !loading &&
    story &&
    currentChapterId.length > 0 &&
    currentSceneId.length > 0 &&
    currentDialogueId.length > 0;

  const prepCharacters = (dialogue_id: string) => {
    const character_id: string = getDialogue(dialogue_id).character_id;

    setPlayerTurn(character_id === "player");
    setNPC(getNPC(character_id) ?? getNPC(character_id));
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

    if (next.dialog_options) summonOptions();
    else if (
      next.chapter_id &&
      next.chapter_id.replace(" (current)", "") !== currentChapterId
    )
      getNextChapter(next);
    else if (
      next.scene_id &&
      next.scene_id.replace(" (current)", "") !== currentSceneId
    )
      getNextScene(next);
    else if (next.dialogue_id && next.dialogue_id !== currentDialogueId)
      setCurrentDialogueId(next.dialogue_id);
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <div className="game">
      {backgroundURL && <img className="game-background" src={backgroundURL} />}
      <div className="game-buttons">
        <button className="settings-button" onClick={toggleSettings}>
          <i className="fas fa-cog"></i>
        </button>
        {/* <div
          className={`audio-button ${settingsVisible ? "visible" : "hidden"}`}
        >
          <button>
            <i className="fas fa-volume-up"></i>
          </button>
        </div> */}
        <div
          className={`leave-button ${settingsVisible ? "visible" : "hidden"}`}
        >
          <button onClick={leave}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
        <div
          className={`save-button ${settingsVisible ? "visible" : "hidden"}`}
        >
          <button onClick={saveGame}>
            <i className="fas fa-save"></i>
          </button>
        </div>
      </div>
      <div className="title">
        {getInitialized() && dialogue && (
          <p>
            {getChapter(currentChapterId).name}
            {" - "}
            {getScene(currentSceneId).name}
          </p>
        )}
      </div>
      {animate && (
        <div className="game-transition">
          {transitionChapter} - {transitionScene}
        </div>
      )}
      <div className="game-characters">
        <div
          className={`pc ${
            playerTurn || dialogue?.character_id === "anon" ? "active" : ""
          }`}
        >
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
        <div className="name-container">
          <div className="name">
            <p> {playerTurn ? "Anon" : NPC?.name}</p>
          </div>
        </div>
        <Typewriter
          dialogue={dialogue}
          getNext={getNext}
          playerTurn={playerTurn}
        />
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
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={() => setIsSaveModalOpen(false)}
        message="Game saved successfully."
        confirmText="OK"
      />
      <Modal
        isOpen={isConfirmSaveModalOpen}
        onClose={() => setIsConfirmSaveModalOpen(false)}
        onConfirm={confirmSaveGame}
        message="Saving will override your previous save. Do you want to continue?"
        confirmText="Save"
        cancelText="Cancel"
      />
      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={confirmLeave}
        message="You have unsaved changes. Do you want to save before leaving?"
        confirmText="Leave"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Game;
