import React from "react";
import { Story, Dialogue_Option } from "../story/Interfaces";
import { characters } from "../story/Characters";
import Typewriter from "../components/Typewriter";

const Preview: React.FC<{
  currentChapterId: string;
  currentSceneId: string;
  currentDialogueId: string;
  story: Story;
}> = ({ currentChapterId, currentSceneId, currentDialogueId, story }) => {
  const getNPC = (id: string) => characters[id];

  const getChapter = (id: string) => story[id];

  const getScene = (id: string) => getChapter(currentChapterId).scenes[id];

  const getDialogue = (id: string) => getScene(currentSceneId).dialogue[id];

  const currentDialogue = getDialogue(currentDialogueId);

  const NPC = getNPC(currentDialogue.character_id);

  const summonOptions = (dialogueOptions: Dialogue_Option[]) => {
    return dialogueOptions.map((option: Dialogue_Option) => (
      <div key={option.text} className="option">
        <div className="halftone" />
        <p>{option.text}</p>
      </div>
    ));
  };

  return (
    <div className="game">
      {getScene(currentSceneId).background && (
        <img
          className="game-background"
          src={getScene(currentSceneId).background}
        />
      )}
      <div className="game-buttons"></div>
      <div className="game-characters">
        <div className={`pc`}></div>
        {NPC && (
          <div className="npc" key={currentDialogue.character_id}>
            <img src={NPC.url} />
          </div>
        )}
      </div>
      <div className="dialogue-container">
        <div>{NPC?.name}</div>
        <Typewriter dialogue={currentDialogue} getNext={() => {}} />
        <div className="dialogue-options">
          {currentDialogue.next.dialog_options &&
            summonOptions(currentDialogue.next.dialog_options)}
        </div>
      </div>
    </div>
  );
};

export default Preview;
