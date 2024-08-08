import React, { useContext, useEffect, useState } from "react";
import { Story, Dialogue_Option, Scene, Dialogue } from "../story/Interfaces";
import { Character_Repository, Game_Character } from "../story/Characters";
import Typewriter from "../components/Typewriter";
import { Editor_Type } from "../pages/Editor";

const Preview: React.FC = () => {
  const editor = useContext(Editor_Type);
  const [scene, setScene] = useState<Scene | undefined>();
  const [dialogue, setDialogue] = useState<Dialogue | undefined>();
  const [npc, setNPC] = useState<Game_Character | undefined>();

  const getNPC = (id: string) =>
    (editor.characters as Character_Repository)[id];

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
    if (editor.currentCharacterId) {
      const character = getNPC(editor.currentCharacterId);
      setNPC(character);
      setScene(undefined);
      setDialogue(undefined);
    } else if (editor.currentChapterId && editor.currentSceneId) {
      const currentScene = getScene(
        editor.currentChapterId,
        editor.currentSceneId
      );
      setScene(currentScene);
      setDialogue(undefined);
    }
  }, [
    editor.currentCharacterId,
    editor.currentChapterId,
    editor.currentSceneId,
    editor.characters,
  ]);

  useEffect(() => {
    if (editor.currentChapterId && editor.currentSceneId) {
      const currentScene = getScene(
        editor.currentChapterId,
        editor.currentSceneId
      );
      setScene(currentScene);
    }
  }, [editor.story]);

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
      setDialogue({ ...currentDialogue });
      setNPC(getNPC(currentDialogue.character_id));
    }
  }, [
    editor.story,
    editor.currentChapterId,
    editor.currentSceneId,
    editor.currentDialogueId,
  ]);

  if (editor.currentCharacterId && npc) {
    return (
      <div className="game">
        <div className="character-preview">
          <div className="npc active">
            <img src={npc.url} alt={npc.name} />
            <p>{npc.name}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!scene) {
    return null;
  }

  return (
    <div className="game">
      {scene.background && (
        <img className="game-background" src={scene.background} />
      )}
      <div className="title">
        {editor.currentChapterId && editor.currentSceneId && (
          <p>
            {getChapter(editor.currentChapterId).name}
            {" - "}
            {getScene(editor.currentChapterId, editor.currentSceneId).name}
          </p>
        )}
      </div>
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
            <div className="name-container">
              <div className="name">
                <p>{npc?.name}</p>
              </div>
            </div>
            <Typewriter
              dialogue={dialogue}
              getNext={() => {}}
              playerTurn={false}
            />
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
