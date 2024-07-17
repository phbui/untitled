import { useState } from "react";
import { Dialogue, Dialogue_Next } from "../../story/Interfaces";
import { Dialogue_Next_Block } from "./Dialogue_Next_Block";

export const Dialogue_Block: React.FC<{
  dialogueId: string;
  dialogue: Dialogue;
  onChange: (dialogueId: string, field: keyof Dialogue, value: string) => void;
  onNextChange: (dialogueId: string, next: Dialogue_Next) => void;
  onItemClick: (
    event: React.MouseEvent,
    input: {
      chapterId?: string;
      sceneId?: string;
      dialogueId?: string;
    }
  ) => void;
}> = ({ dialogueId, dialogue, onChange, onNextChange, onItemClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (!isCollapsed) e.stopPropagation();
    else onItemClick(e, { dialogueId });
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = (field: keyof Dialogue, value: string) => {
    onChange(dialogueId, field, value);
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    onItemClick(e, { dialogueId });
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
            dialogueId={dialogueId}
            next={dialogue.next}
            onNextChange={(next) => onNextChange(dialogueId, next)}
          />
        </div>
      )}
    </>
  );
};
