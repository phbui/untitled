import { useContext, useState } from "react";
import { Dialogue, Dialogue_Next } from "../../story/Interfaces";
import { Dialogue_Next_Block } from "./Dialogue_Next_Block";
import { Editor_Type } from "../../pages/Editor";

export const Dialogue_Block: React.FC<{
  chapterId: string;
  sceneId: string;
  dialogueId: string;
  dialogue: Dialogue;
  onChange: (dialogueId: string, field: keyof Dialogue, value: string) => void;
  onNextChange: (dialogueId: string, next: Dialogue_Next) => void;
}> = ({ chapterId, sceneId, dialogueId, dialogue, onChange, onNextChange }) => {
  const editor = useContext(Editor_Type);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (!isCollapsed) e.stopPropagation();
    else editor.handleItemClick(e, { dialogueId });
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = (field: keyof Dialogue, value: string) => {
    onChange(dialogueId, field, value);
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    editor.handleItemClick(e, { dialogueId });
  };

  return (
    <>
      <div className="block-dialogue" onClick={(e) => e.stopPropagation()}>
        <h4 onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
          Dialogue: {dialogueId}
        </h4>
      </div>
      {!isCollapsed && (
        <div onClick={handleBlockClick}>
          <label>
            Character ID:
            <input
              type="text"
              value={dialogue.character_id}
              onChange={(e) =>
                handleInputChange("character_id", e.target.value)
              }
            />
          </label>
          <br />
          <label>
            Text:
            <input
              type="text"
              value={dialogue.text}
              onChange={(e) => handleInputChange("text", e.target.value)}
            />
          </label>
          <br />
          <Dialogue_Next_Block
            chapterId={chapterId}
            sceneId={sceneId}
            next={dialogue.next}
            onNextChange={(next) => onNextChange(dialogueId, next)}
          />
        </div>
      )}
    </>
  );
};
