import React, { useContext, useState } from "react";
import { Story } from "../../story/Interfaces";
import { Editor_Type } from "../../pages/Editor";

export const Block_Scene: React.FC<{}> = () => {
  const editor = useContext(Editor_Type);
  const scene = (editor.story as Story)[editor.currentChapterId].scenes[
    editor.currentSceneId
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [sceneName, setSceneName] = useState(
    scene.name || editor.currentSceneId
  );

  const handleAddDialogue = () => {
    const dialogueId = prompt("Enter new dialogue ID:");
    if (dialogueId) {
      editor.handleAddDialogue(
        editor.currentChapterId,
        editor.currentSceneId,
        dialogueId
      );
    }
  };

  const handleBackgroundChange = (value: string) => {
    const updatedScene = { ...scene, background: value };
    editor.handleSceneChange(
      editor.currentChapterId,
      editor.currentSceneId,
      updatedScene
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSceneName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    const updatedScene = { ...scene, name: sceneName };
    editor.handleSceneChange(
      editor.currentChapterId,
      editor.currentSceneId,
      updatedScene
    );
  };

  return (
    <div className="block">
      {isEditing ? (
        <input
          type="text"
          value={sceneName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
          className="scene-name-input"
        />
      ) : (
        <h2 onDoubleClick={() => setIsEditing(true)}>
          {sceneName}
          <i
            className="fas fa-pen edit-icon"
            title="Edit Scene Name"
            onClick={() => setIsEditing(true)}
          ></i>
        </h2>
      )}
      <div className="background-scene">
        Background Url:
        <input
          type="text"
          value={scene.background}
          onChange={(e) => handleBackgroundChange(e.target.value)}
        />
      </div>
      <div style={{ height: "75%" }} className="block-list">
        {Object.entries(scene.dialogue)
          .sort(([a], [b]) => {
            if (a === "start") return -1;
            if (b === "start") return 1;
            return a.localeCompare(b);
          })
          .map(([dialogueId]) => (
            <div className="block-container">
              <p
                key={dialogueId}
                onClick={(e) =>
                  editor.handleItemClick(e, {
                    chapterId: editor.currentChapterId,
                    sceneId: editor.currentSceneId,
                    dialogueId: dialogueId,
                  })
                }
              >
                {dialogueId}
              </p>
              <button
                onClick={() =>
                  editor.handleDeleteDialogue(
                    editor.currentChapterId,
                    editor.currentSceneId,
                    dialogueId
                  )
                }
              >
                Delete Dialogue
              </button>
            </div>
          ))}
      </div>
      <div className="add-button">
        <button onClick={handleAddDialogue}>Add Dialogue</button>
      </div>
    </div>
  );
};
