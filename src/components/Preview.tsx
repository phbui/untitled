import React, { useContext, useEffect, useState } from "react";
import { Story, Dialogue_Option, Scene, Dialogue } from "../story/Interfaces";
import { Game_Character } from "../story/Characters";
import Typewriter from "../components/Typewriter";
import { Editor_Type } from "../pages/Editor";

const Preview: React.FC = () => {
  const editor = useContext(Editor_Type);
  const [scene, setScene] = useState<Scene | undefined>();
  const [dialogue, setDialogue] = useState<Dialogue | undefined>();
  const [npc, setNPC] = useState<Game_Character | undefined>();

  const getNPC = (id: string) => editor.characters[id] as Game_Character;

  const getChapter = (id: string) => (editor.story as Story)[id];

  const getScene = (chapterId: string, sceneId: string) =>
    getChapter(chapterId).scenes[sceneId];

  const getDialogue = (
    chapterId: string,
    sceneId: string,
    dialogueId: string
  ) => getScene(chapterId, sceneId).dialogue[dialogueId];

  const summonOptions = (dialogueOptions: Dialogue_Option[]) => {
    return dialogueOptions.map((option: Dialogue_Option) => (
      <div key={option.text} className="option">
        <div className="halftone" />
        <p>{option.text}</p>
      </div>
    ));
  };

  useEffect(() => {
    if (editor.currentChapterId && editor.currentSceneId) {
      const currentScene = getScene(
        editor.currentChapterId,
        editor.currentSceneId
      );

      setScene(currentScene);
      setDialogue(undefined);
    }
  }, [
    editor.story,
    editor.currentChapterId,
    editor.currentSceneId,
    editor.currentDialogueId,
  ]);

  useEffect(() => {
    if (
      editor.currentChapterId &&
      editor.currentSceneId &&
      editor.currentDialogueId
    ) {
      const currentScene = getScene(
        editor.currentChapterId,
        editor.currentSceneId
      );
      const currentDialogue = getDialogue(
        editor.currentChapterId,
        editor.currentSceneId,
        editor.currentDialogueId
      );
      setScene(currentScene);
      setDialogue(currentDialogue);
      setNPC(getNPC(currentDialogue.character_id));
    }
  }, [
    editor.story,
    editor.currentChapterId,
    editor.currentSceneId,
    editor.currentDialogueId,
  ]);

  if (!scene) {
    return null;
  }

  return (
    <div className="game">
      {scene.background && (
        <img className="game-background" src={scene.background} />
      )}
      <div className="game-buttons"></div>
      {dialogue && (
        <>
          <div className="game-characters">
            <div className="pc"></div>
            {npc && (
              <div className="npc active" key={dialogue.character_id}>
                <img src={npc.url} alt={npc.name} />
              </div>
            )}
          </div>
          <div className="dialogue-container">
            <div>{npc?.name}</div>
            <Typewriter dialogue={dialogue} getNext={() => {}} />
            <div className="dialogue-options">
              {dialogue.next.dialog_options &&
                summonOptions(dialogue.next.dialog_options)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Preview;
