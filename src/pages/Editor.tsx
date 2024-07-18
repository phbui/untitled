import React, { useState, useEffect, createContext } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Story, Scene, Chapter } from "../story/Interfaces";
import { EditorLayout } from "../components/Explorer";
import { Game_Character } from "../story/Characters";

export const fetchStory = async (): Promise<Story | null> => {
  try {
    const storyDoc = doc(db, "dating-game", "story");
    const snapshot = await getDoc(storyDoc);
    if (snapshot.exists()) {
      return snapshot.data() as Story;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
};

const updateStory = async (story: Story): Promise<void> => {
  try {
    const storyDoc = doc(db, "dating-game", "story");
    await setDoc(storyDoc, story);
    console.log("Story updated successfully!");
  } catch (error) {
    console.error("Error updating story:", error);
  }
};

export const fetchCharacters = async (): Promise<Game_Character | null> => {
  try {
    const characterDocs = doc(db, "dating-game", "characters");
    const snapshot = await getDoc(characterDocs);
    if (snapshot.exists()) {
      return snapshot.data() as Game_Character;
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
};

const updateCharacters = async (character: Game_Character): Promise<void> => {
  try {
    const characterDocs = doc(db, "dating-game", "characters");
    await setDoc(characterDocs, character);
    console.log("Characters updated successfully!");
  } catch (error) {
    console.error("Error updating characters:", error);
  }
};

const EditorContext = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [characters, setCharacters] = useState<Game_Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentChapterId, setCurrentChapterId] = useState<string>("");
  const [currentSceneId, setCurrentSceneId] = useState<string>("");
  const [currentDialogueId, setCurrentDialogueId] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const fetchedStory = await fetchStory();
      setStory(fetchedStory);
      const fetchedCharacters = await fetchCharacters();
      setCharacters(fetchedCharacters);
      setLoading(false);
    };
    load();
  }, []);

  const handleAddChapter = (chapterId: string) => {
    if (story) {
      const updatedStory = {
        ...story,
        [chapterId]: { name: "New Chapter", scenes: {} },
      };
      setStory(updatedStory);
    }
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (story) {
      const { [chapterId]: _, ...updatedStory } = story;

      if (chapterId === currentSceneId) {
        setCurrentChapterId("");
        setCurrentSceneId("");
        setCurrentDialogueId("");
      }

      setStory(updatedStory);
    }
  };

  const handleAddScene = (chapterId: string, sceneId: string) => {
    if (story) {
      const updatedStory = { ...story };
      const chapter = updatedStory[chapterId];
      chapter.scenes[sceneId] = {
        name: `New Scene`,
        background: "",
        dialogue: {},
      };
      setStory(updatedStory);
    }
  };

  const handleDeleteScene = (chapterId: string, sceneId: string) => {
    if (story) {
      const updatedStory = { ...story };
      const chapter = updatedStory[chapterId];
      delete chapter.scenes[sceneId];

      if (sceneId === currentSceneId) {
        setCurrentSceneId("");
        setCurrentDialogueId("");
      }

      setStory(updatedStory);
    }
  };

  const handleSceneChange = (
    chapterId: string,
    sceneId: string,
    scene: Scene
  ) => {
    if (story) {
      const updatedStory = { ...story };
      updatedStory[chapterId].scenes[sceneId] = scene;
      setStory(updatedStory);
    }
  };

  const handleChapterChange = (chapterId: string, chapter: Chapter) => {
    if (story) {
      const updatedStory = { ...story };
      updatedStory[chapterId] = chapter;
      setStory(updatedStory);
    }
  };

  const handleAddDialogue = (
    chapterId: string,
    sceneId: string,
    dialogueId: string
  ) => {
    if (story) {
      const updatedStory = { ...story };
      const chapter = updatedStory[chapterId];
      const scene = chapter.scenes[sceneId];
      if (scene) {
        scene.dialogue[dialogueId] = {
          character_id: "",
          text: "",
          next: {},
        };
        setStory(updatedStory);
      }
    }
  };

  const handleDeleteDialogue = (
    chapterId: string,
    sceneId: string,
    dialogueId: string
  ) => {
    if (story) {
      const updatedStory = { ...story };
      const chapter = updatedStory[chapterId];
      const scene = chapter.scenes[sceneId];

      if (dialogueId === currentDialogueId) setCurrentDialogueId("");

      if (scene && scene.dialogue) {
        delete scene.dialogue[dialogueId];
        setStory({ ...updatedStory });
      }
    }
  };

  const handleSave = async () => {
    if (story && characters) {
      if (window.confirm("Are you sure you want to save changes?")) {
        await updateStory(story);
        await updateCharacters(characters);
      }
    }
  };

  const handleItemClick = (
    event: React.MouseEvent,
    input: {
      chapterId?: string;
      sceneId?: string;
      dialogueId?: string;
    }
  ) => {
    event.stopPropagation();

    if (input.chapterId) {
      setCurrentChapterId(input.chapterId);
      setCurrentSceneId("");
      setCurrentDialogueId("");
    }

    if (input.sceneId) {
      setCurrentSceneId(input.sceneId);
      setCurrentDialogueId("");
    }

    if (input.dialogueId) setCurrentDialogueId(input.dialogueId);
  };

  const editor = {
    story,
    characters,
    loading,
    currentChapterId,
    currentSceneId,
    currentDialogueId,
    handleAddChapter,
    handleDeleteChapter,
    handleAddScene,
    handleDeleteScene,
    handleSceneChange,
    handleChapterChange,
    handleAddDialogue,
    handleDeleteDialogue,
    handleSave,
    handleItemClick,
  };

  return editor;
};

export const Editor_Type = createContext(
  {} as unknown as ReturnType<typeof EditorContext>
);

const Editor: React.FC = () => {
  const editor = EditorContext();

  if (editor.loading) {
    return <p>Loading story...</p>;
  }

  if (!editor.story) {
    return <p>No story data available</p>;
  }

  return (
    <Editor_Type.Provider value={editor}>
      <div className="editor">
        <div className="save-button-container">
          <button className="save-button" onClick={editor.handleSave}>
            <i className="fas fa-save"></i>
          </button>
        </div>
        <EditorLayout />
      </div>
    </Editor_Type.Provider>
  );
};

export default Editor;
