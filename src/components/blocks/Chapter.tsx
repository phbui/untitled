import React, { useContext, useState } from "react";
import { Editor_Type } from "../../pages/Editor";
import { Story } from "../../story/Interfaces";

export const Block_Chapter: React.FC = () => {
  const editor = useContext(Editor_Type);

  const chapter = (editor.story as Story)[editor.currentChapterId];
  const [chapterName, setChapterName] = useState(chapter.name);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChapterName(e.target.value);
  };

  const handleNameBlur = () => {
    const updatedChapter = { ...chapter, name: chapterName };
    editor.handleChapterChange(editor.currentChapterId, updatedChapter);
    setIsEditing(false);
  };

  return (
    <div className="block" onClick={handleBlockClick}>
      {isEditing ? (
        <input
          type="text"
          value={chapterName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
          className="chapter-name-input"
        />
      ) : (
        <h2 onDoubleClick={() => setIsEditing(true)}>
          {chapterName}
          <i
            className="fas fa-pen edit-icon"
            title="Edit Chapter Name"
            onClick={() => setIsEditing(true)}
          ></i>
        </h2>
      )}
      <div className="block-list">
        {Object.entries(chapter.scenes)
          .sort(([a], [b]) => {
            if (a === "start") return -1;
            if (b === "start") return 1;
            return a.localeCompare(b);
          })
          .map(([sceneId]) => (
            <div
              key={sceneId}
              className="block-container"
              onClick={(e) =>
                editor.handleItemClick(e, {
                  chapterId: editor.currentChapterId,
                  sceneId: sceneId,
                })
              }
            >
              <p>{sceneId}</p>
              <button onClick={() => handleDeleteScene(sceneId)}>
                Delete Scene
              </button>
            </div>
          ))}
      </div>
      <div className="add-button">
        <button onClick={handleAddScene}>Add Scene</button>
      </div>
    </div>
  );
};
