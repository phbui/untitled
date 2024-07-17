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

  return (
    <>
      <div
        className="block-dialogue"
        onClick={(e) => onItemClick(e, { dialogueId: dialogueId })}
      >
        <h4
          onClick={(e) => {
            if (!isCollapsed) e.stopPropagation();
            setIsCollapsed(!isCollapsed);
          }}
          style={{ cursor: "pointer" }}
        >
          Dialogue: {dialogueId}
        </h4>
      </div>
      {!isCollapsed && (
        <div>
          <label>
            Character ID:
            <input
              type="text"
              value={dialogue.character_id}
              onChange={(e) =>
                onChange(dialogueId, "character_id", e.target.value)
              }
            />
          </label>
          <br />
          <label>
            Text:
            <input
              type="text"
              value={dialogue.text}
              onChange={(e) => onChange(dialogueId, "text", e.target.value)}
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
