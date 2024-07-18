import React, { useContext, useEffect, useState } from "react";
import { Story, Dialogue_Option, Scene, Dialogue } from "../story/Interfaces";
import { characters, Game_Character } from "../story/Characters";
import Typewriter from "../components/Typewriter";
import { Editor_Type } from "../pages/Editor";

const Preview: React.FC = () => {
  const editor = useContext(Editor_Type);
  const [render, setRender] = useState<boolean>(false);
  const [scene, setScene] = useState<Scene>();
  const [dialogue, setDialogue] = useState<Dialogue>();
  const [npc, setNPC] = useState<Game_Character>();

  const getNPC = (id: string) => characters[id];

  const getChapter = (id: string) => (editor.story as Story)[id];

  const getScene = (id: string) =>
    getChapter(editor.currentChapterId).scenes[id];

  const getDialogue = (id: string) =>
    getScene(editor.currentSceneId).dialogue[id];

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
      editor.currentChapterId?.length > 0 &&
        editor.currentSceneId?.length > 0 &&
        editor.currentDialogueId?.length > 0
    );
  }, [
    editor.currentChapterId,
    editor.currentSceneId,
    editor.currentDialogueId,
  ]);

  useEffect(() => {
    if (render) {
      setScene(getScene(editor.currentSceneId));
      setDialogue(getDialogue(editor.currentDialogueId));
      setNPC(getNPC(getDialogue(editor.currentDialogueId).character_id));
    }
  }, [
    render,
    editor.currentChapterId,
    editor.currentSceneId,
    editor.currentDialogueId,
  ]);

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
