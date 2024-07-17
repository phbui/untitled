import React, { useEffect, useState } from "react";
import { Story, Dialogue_Option, Scene, Dialogue } from "../story/Interfaces";
import { characters, Game_Character } from "../story/Characters";
import Typewriter from "../components/Typewriter";

const Preview: React.FC<{
  currentChapterId: string;
  currentSceneId: string;
  currentDialogueId: string;
  story: Story;
}> = ({ currentChapterId, currentSceneId, currentDialogueId, story }) => {
  const [render, setRender] = useState<boolean>(false);
  const [scene, setScene] = useState<Scene>();
  const [dialogue, setDialogue] = useState<Dialogue>();
  const [npc, setNPC] = useState<Game_Character>();

  const getNPC = (id: string) => characters[id];

  const getChapter = (id: string) => story[id];

  const getScene = (id: string) => getChapter(currentChapterId).scenes[id];

  const getDialogue = (id: string) => getScene(currentSceneId).dialogue[id];

  const summonOptions = (dialogueOptions: Dialogue_Option[]) => {
    return dialogueOptions.map((option: Dialogue_Option) => (
      <div key={option.text} className="option">
        <div className="halftone" />
        <p>{option.text}</p>
      </div>
    ));
  };

  useEffect(() => {
    setRender(
      currentChapterId?.length > 0 &&
        currentSceneId?.length > 0 &&
        currentDialogueId?.length > 0
    );
  }, [currentChapterId, currentSceneId, currentDialogueId]);

  useEffect(() => {
    if (render) {
      console.log(currentDialogueId);
      setScene(getScene(currentSceneId));
      setDialogue(getDialogue(currentDialogueId));
      setNPC(getNPC(getDialogue(currentDialogueId).character_id));
    }
  }, [render, currentChapterId, currentSceneId, currentDialogueId]);

  return (
    render && (
      <div className="game">
        {scene?.background && (
          <img className="game-background" src={scene?.background} />
        )}
        <div className="game-buttons"></div>
        <div className="game-characters">
          <div className={`pc`}></div>
          {npc && (
            <div className="npc" key={dialogue?.character_id}>
              <img src={npc.url} />
            </div>
          )}
        </div>
        <div className="dialogue-container">
          <div>{npc?.name}</div>
          <Typewriter dialogue={dialogue} getNext={() => {}} />
          <div className="dialogue-options">
            {dialogue?.next.dialog_options &&
              summonOptions(dialogue?.next.dialog_options)}
          </div>
        </div>
      </div>
    )
  );
};

export default Preview;
