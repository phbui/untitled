import { useContext } from "react";
import { Editor_Type } from "../../pages/Editor";
import { Block_Dialogue_Next } from "./Dialogue_Next";
import { Character_Repository } from "../../story/Characters";
import { Dialogue, Story } from "../../story/Interfaces";

export const Block_Dialogue: React.FC<{}> = () => {
  const editor = useContext(Editor_Type);

  const scene = (editor.story as Story)[editor.currentChapterId].scenes[
    editor.currentSceneId
  ];

  const dialogue = (editor.story as Story)[editor.currentChapterId].scenes[
    editor.currentSceneId
  ].dialogue[editor.currentDialogueId];

  const handleDialogueChange = (
    dialogueId: string,
    field: keyof Dialogue,
    value: string
  ) => {
    const updatedScene = { ...scene };
    const dialogue = updatedScene.dialogue[dialogueId];
    if (dialogue) {
      dialogue[field] = value;
      editor.handleSceneChange(
        editor.currentChapterId,
        editor.currentSceneId,
        updatedScene
      );
    }
  };

  const handleInputChange = (field: keyof Dialogue, value: string) => {
    handleDialogueChange(editor.currentDialogueId, field, value);
  };

  return (
    <div className="block" onClick={(e) => e.stopPropagation()}>
      <h2 className="block-dialogue__title">
        Dialogue: {editor.currentDialogueId}
      </h2>
      <label className="block-dialogue__label">
        Character:
        <select
          className="block-dialogue__select"
          value={dialogue.character_id}
          onChange={(e) => handleInputChange("character_id", e.target.value)}
        >
          <option value="">Select a character</option>
          {Object.entries(editor.characters as Character_Repository).map(
            ([id, character]) => (
              <option key={id} value={id}>
                {character.name}
              </option>
            )
          )}
        </select>
      </label>
      <label className="block-dialogue__label">
        Text:
        <textarea
          className="block-dialogue__input"
          style={{
            resize: "vertical",
            maxHeight: "160px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          value={dialogue.text}
          onChange={(e) => handleInputChange("text", e.target.value)}
        />
      </label>
      <Block_Dialogue_Next />
    </div>
  );
};
