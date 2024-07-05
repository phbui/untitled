import React, { useState } from "react";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_CharacterCatalog {
  catalog: {
    id: string;
    name: string;
    items: { [key: string]: Interface_Wardrobe_Item };
    likes: number;
    createdAt: number;
  }[];
  sortOrder: "newest" | "oldest" | "mostLiked" | "leastLiked";
  setSortOrder: (
    order: "newest" | "oldest" | "mostLiked" | "leastLiked"
  ) => void;
  onLike: (characterId: string) => void;
}

const CharacterCatalog: React.FC<Props_CharacterCatalog> = ({
  catalog,
  sortOrder,
  setSortOrder,
  onLike,
}) => {
  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <div className={`character-catalog ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Catalog" : "Open Catalog"}
      </button>
      <div className="catalog-content">
        <h2>Character Catalog</h2>
        <div className="sort-buttons">
          <button onClick={() => setSortOrder("newest")}>Sort by Newest</button>
          <button onClick={() => setSortOrder("oldest")}>Sort by Oldest</button>
          <button onClick={() => setSortOrder("mostLiked")}>
            Sort by Most Liked
          </button>
          <button onClick={() => setSortOrder("leastLiked")}>
            Sort by Least Liked
          </button>
        </div>
        <div className="catalog-list">
          {sortedCatalog.map((character) => (
            <div key={character.id} className="catalog-item">
              <h3>{character.name}</h3>
              <p>{new Date(character.createdAt).toLocaleDateString()}</p>
              <div className="character">
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
                <button onClick={() => onLike(character.id)}>Like</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterCatalog;
