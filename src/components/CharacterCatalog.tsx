import React from "react";
import { Interface_Wardrobe_Item } from "./DressUpWardrobe";

interface Props_CharacterCatalog {
  catalog: {
    id: string;
    name: string;
    items: { [key: string]: Interface_Wardrobe_Item };
    likes: number;
    createdAt: number;
  }[];
  onLike: (characterId: string) => void;
}

const CharacterCatalog: React.FC<Props_CharacterCatalog> = ({
  catalog,
  onLike,
}) => {
  return (
    <div className="character-catalog">
      <h2>Character Catalog</h2>
      <div className="catalog-list">
        {catalog.map((character) => (
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
  );
};

export default CharacterCatalog;
