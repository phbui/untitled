import { useContext, useState } from "react";
import { Scene, Dialogue, Dialogue_Next } from "../../story/Interfaces";
import { Dialogue_Block } from "./Dialogue";
import { Editor_Type } from "../../pages/Editor";

export const Block_Scene: React.FC<{
  chapterId: string;
  sceneId: string;
  scene: Scene;
}> = ({ chapterId, sceneId, scene }) => {
  const editor = useContext(Editor_Type);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleDialogueChange = (
    dialogueId: string,
    field: keyof Dialogue,
    value: string
  ) => {
    const updatedScene = { ...scene };
    const dialogue = updatedScene.dialogue[dialogueId];
    if (dialogue) {
      dialogue[field] = value;
      editor.handleSceneChange(chapterId, sceneId, updatedScene);
    }
  };

  const handleNextChange = (dialogueId: string, next: Dialogue_Next) => {
    const updatedScene = { ...scene };
    const dialogue = updatedScene.dialogue[dialogueId];
    if (dialogue) {
      dialogue.next = next;
      editor.handleSceneChange(chapterId, sceneId, updatedScene);
    }
  };

  const handleAddDialogue = () => {
    const dialogueId = prompt("Enter new dialogue ID:");
    if (dialogueId) {
      editor.handleAddDialogue(chapterId, sceneId, dialogueId);
    }
  };

  const handleBackgroundChange = (value: string) => {
    const updatedScene = { ...scene, background: value };
    editor.handleSceneChange(chapterId, sceneId, updatedScene);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (!isCollapsed) e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    editor.handleItemClick(e, { sceneId });
  };

  return (
    <div className="block-scene" onClick={handleBlockClick}>
      <h3 onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
        {sceneId}
      </h3>
      {!isCollapsed && (
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
              .map(([dialogueId, dialogue]) => (
                <Dialogue_Block
                  key={dialogueId}
                  chapterId={chapterId}
                  sceneId={sceneId}
                  dialogueId={dialogueId}
                  dialogue={dialogue}
                  onChange={handleDialogueChange}
                  onNextChange={handleNextChange}
                />
              ))}
          </div>
          <button onClick={handleAddDialogue}>Add Dialogue</button>
          <button onClick={() => editor.handleRemoveScene(chapterId, sceneId)}>
            Remove Scene
          </button>
        </div>
      )}
    </div>
  );
};
