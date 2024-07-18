import { useContext } from "react";
import { Dialogue, Story } from "../../story/Interfaces";
import { Editor_Type } from "../../pages/Editor";
import { Block_Dialogue_Next } from "./Dialogue_Next";

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

  const handleBlockClick = (e: React.MouseEvent) => {
    editor.handleItemClick(e, { dialogueId: editor.currentDialogueId });
  };

  return (
    <div className="block-dialogue" onClick={(e) => e.stopPropagation()}>
      <h4>Dialogue: {editor.currentDialogueId}</h4>{" "}
      <div onClick={handleBlockClick}>
        <label>
          Character ID:
          <input
            type="text"
            value={dialogue.character_id}
            onChange={(e) => handleInputChange("character_id", e.target.value)}
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
        <Block_Dialogue_Next />
      </div>
    </div>
  );
};
