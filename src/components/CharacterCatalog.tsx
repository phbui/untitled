import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Interface_Wardrobe_Item } from "./BottomTabs";

interface CharacterCatalogProps {
  user: any;
  onSelect: (items: { [key: string]: Interface_Wardrobe_Item }) => void;
}

const CharacterCatalog: React.FC<CharacterCatalogProps> = ({
  user,
  onSelect,
}) => {
  const [catalog, setCatalog] = useState<
    {
      id: string;
      name: string;
      items: { [key: string]: Interface_Wardrobe_Item };
      likes: number;
      createdAt: number;
    }[]
  >([]);
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "mostLiked" | "leastLiked"
  >("newest");

  const loadCatalog = async () => {
    try {
      console.log("Attempting to load documents...");
      const querySnapshot = await getDocs(collection(db, "characters"));
      const loadedCatalog = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name as string,
        items: doc.data().items as { [key: string]: Interface_Wardrobe_Item },
        likes: doc.data().likes as number,
        createdAt: doc.data().createdAt as number,
      }));
      console.log("Loaded catalog: ", loadedCatalog);
      setCatalog(loadedCatalog);
      if (loadedCatalog.length > 0) {
        onSelect(
          loadedCatalog.reduce((oldest, current) =>
            oldest.createdAt < current.createdAt ? oldest : current
          ).items
        );
      }
    } catch (e) {
      console.error("Error loading documents: ", e);
    }
  };

  useEffect(() => {
    loadCatalog();
  }, []);

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

  return (
    <div className="character-catalog">
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
