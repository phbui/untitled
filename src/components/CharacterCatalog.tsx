import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";
import { Interface_Wardrobe_Item } from "./BottomTabs";
import { Interface_Character } from "../App";

interface Props_CharacterCatalog {
  user: any;
  catalog: Interface_Character[];
  setCatalog: (catalog: Interface_Character[]) => void;
  onSelect: (items: { [key: string]: Interface_Wardrobe_Item }) => void;
}

const CharacterCatalog: React.FC<Props_CharacterCatalog> = ({
  user,
  catalog,
  setCatalog,
  onSelect,
}) => {
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "mostLiked" | "leastLiked"
  >("newest");

  const likeCharacter = async (characterId: string) => {
    if (!user) {
      console.error("User not authenticated");
      alert("Please sign in to like a character.");
      return;
    }
    try {
      const characterDoc = doc(db, "characters", characterId);
      await updateDoc(characterDoc, { likes: increment(1) });
      setCatalog(
        catalog.map((char) =>
          char.id === characterId ? { ...char, likes: char.likes + 1 } : char
        )
      );
    } catch (e) {
      console.error("Error liking character: ", e);
    }
  };

  const sortedCatalog = [...catalog].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return b.createdAt - a.createdAt;
      case "oldest":
        return a.createdAt - b.createdAt;
      case "mostLiked":
        return b.likes - a.likes;
      case "leastLiked":
        return a.likes - b.likes;
      default:
        return 0;
    }
  });

  const getButtonClass = (buttonOrder: string) => {
    return sortOrder === buttonOrder ? "selected" : "";
  };

  return (
    <div className="character-catalog">
      Sort
      <div className="sort-buttons">
        <div className="age-buttons">
          <button
            onClick={() => setSortOrder("newest")}
            className={getButtonClass("newest")}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={getButtonClass("oldest")}
          >
            Oldest
          </button>
        </div>
        <div className="like-buttons">
          <button
            onClick={() => setSortOrder("mostLiked")}
            className={getButtonClass("mostLiked")}
          >
            Most Liked
          </button>
          <button
            onClick={() => setSortOrder("leastLiked")}
            className={getButtonClass("leastLiked")}
          >
            Least Liked
          </button>
        </div>
      </div>
      <div className="catalog-list">
        {sortedCatalog.map((character) => (
          <div key={character.id} className="catalog-item">
            <h3>{character.name}</h3>
            <p>{new Date(character.createdAt).toLocaleDateString()}</p>
            <div
              className="character"
              onClick={() => onSelect(character.items)}
            >
              <img
                src="path/to/base/character.png"
                alt="Base Character"
                className="base-character"
              />
              {Object.keys(character.items).map((key) =>
                character.items[key] ? (
                  <img
                    key={key}
                    src={character.items[key].asset_url}
                    alt={key}
                    className={`clothing ${key}`}
                  />
                ) : null
              )}
            </div>
            <div className="likes">
              <span>Likes: {character.likes}</span>
              <button onClick={() => likeCharacter(character.id)}>Like</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterCatalog;
