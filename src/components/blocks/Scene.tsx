import { useContext } from "react";
import { Story } from "../../story/Interfaces";

import { Editor_Type } from "../../pages/Editor";

export const Block_Scene: React.FC<{}> = () => {
  const editor = useContext(Editor_Type);
  const scene = (editor.story as Story)[editor.currentChapterId].scenes[
    editor.currentSceneId
  ];

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

  const handleBlockClick = (e: React.MouseEvent) => {
    editor.handleItemClick(e, { sceneId: editor.currentSceneId });
  };

  return (
    <div className="block-scene" onClick={handleBlockClick}>
      <h3>{editor.currentSceneId}</h3>

      <div>
        <label>
          Background:
          <input
            type="text"
            value={scene.background}
            onChange={(e) => handleBackgroundChange(e.target.value)}
          />
        </label>
        <br />
        <div className="block-dialogue-container">
          {Object.entries(scene.dialogue)
            .sort(([a], [b]) => {
              if (a === "start") return -1;
              if (b === "start") return 1;
              return a.localeCompare(b);
            })
            .map(([dialogueId]) => (
              <p
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
            ))}
        </div>
        <button onClick={handleAddDialogue}>Add Dialogue</button>
        <button
          onClick={() =>
            editor.handleDeleteScene(
              editor.currentChapterId,
              editor.currentSceneId
            )
          }
        >
          Delete Scene
        </button>
      </div>
    </div>
  );
};
