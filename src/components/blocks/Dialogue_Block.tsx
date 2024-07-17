import { Dialogue_Next_Block } from "./Dialogue_Next_Block";

export const Dialogue_Block: React.FC<{
  dialogueId: string;
  dialogue: Dialogue;
  onChange: (dialogueId: string, field: keyof Dialogue, value: string) => void;
  onNextChange: (dialogueId: string, next: Dialogue_Next) => void;
}> = ({ dialogueId, dialogue, onChange, onNextChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="block-dialogue">
      <h4
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        Dialogue: {dialogueId}
      </h4>
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
    </div>
  );
};
