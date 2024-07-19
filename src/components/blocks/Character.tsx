import React, { useContext, useEffect, useState } from "react";
import { Editor_Type } from "../../pages/Editor";
import { Game_Character } from "../../story/Characters";

export const Block_Character: React.FC = () => {
  const editor = useContext(Editor_Type);

  const [isEditing, setIsEditing] = useState(false);
  const [character, setCharacter] = useState<Game_Character>();
  const [characterName, setCharacterName] = useState<string>("");
  const [characterUrl, setCharacterUrl] = useState<string>("");

  useEffect(() => {
    setCharacter(editor.characters![editor.currentCharacterId]);
    setCharacterName(editor.characters![editor.currentCharacterId].name);
    setCharacterUrl(editor.characters![editor.currentCharacterId].url);
  }, [editor.currentCharacterId]);

  const handleCharacterChange = (
    field: keyof Game_Character,
    value: string
  ) => {
    const updatedCharacter = { ...character, [field]: value };
    editor.handleCharacterChange(
      editor.currentCharacterId,
      updatedCharacter as Game_Character
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    handleCharacterChange("name", characterName);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterUrl(e.target.value);
    handleCharacterChange("url", e.target.value);
  };

  return (
    <div className="block">
      {isEditing ? (
        <input
          type="text"
          value={characterName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          autoFocus
          className="character-name-input"
        />
      ) : (
        <h2 onDoubleClick={() => setIsEditing(true)}>
          {characterName}
          <i
            className="fas fa-pen edit-icon"
            title="Edit Character Name"
            onClick={() => setIsEditing(true)}
          ></i>
        </h2>
      )}
      <label className="character-url">
        Character Image Url:
        <input type="text" value={characterUrl} onChange={handleUrlChange} />
      </label>
      {/* Add any other fields related to character stats here */}
    </div>
  );
};
