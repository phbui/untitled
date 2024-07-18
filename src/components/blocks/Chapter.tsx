import React, { useContext, useState } from "react";

import { Editor_Type } from "../../pages/Editor";
import { Story } from "../../story/Interfaces";

export const Block_Chapter: React.FC = () => {
  const editor = useContext(Editor_Type);

  const chapter = (editor.story as Story)[editor.currentChapterId];

  const handleAddScene = () => {
    const sceneId = prompt("Enter new scene ID:");
    if (sceneId) {
      editor.handleAddScene(editor.currentChapterId, sceneId);
    }
  };

  const handleDeleteScene = (sceneId: string) => {
    const confirm = window.confirm(
      `Are you sure you want to remove scene: ${sceneId}?`
    );
    if (confirm) {
      editor.handleDeleteScene(editor.currentChapterId, sceneId);
    }
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    editor.handleItemClick(e, { chapterId: editor.currentChapterId });
  };

  return (
    <div className="block-chapter" onClick={handleBlockClick}>
      <h2>{editor.currentChapterId}</h2>
      <div>
        {Object.entries(chapter.scenes)
          .sort(([a], [b]) => {
            if (a === "start") return -1;
            if (b === "start") return 1;
            return a.localeCompare(b);
          })
          .map(([sceneId]) => (
            <div key={sceneId} className="block-scene-container">
              <p>{sceneId}</p>
              <button onClick={() => handleDeleteScene(sceneId)}>
                Delete Scene
              </button>
            </div>
          ))}
        <button onClick={handleAddScene}>Add Scene</button>
      </div>
    </div>
  );
};
