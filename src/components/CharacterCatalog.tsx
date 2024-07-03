import React from "react";

interface CharacterCatalogProps {
  catalog: { id: number; items: { [key: string]: string } }[];
}

const CharacterCatalog: React.FC<CharacterCatalogProps> = ({ catalog }) => {
  return (
    <div className="character-catalog">
      <h2>Character Catalog</h2>
      <div className="catalog-list">
        {catalog.map((character) => (
          <div key={character.id} className="catalog-item">
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
                    src={character.items[key]}
                    alt={key}
                    className={`clothing ${key}`}
                  />
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterCatalog;
