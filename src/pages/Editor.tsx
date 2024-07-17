import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  Chapter,
  Dialogue,
  Dialogue_Next,
  Dialogue_Option,
  Scene,
  Story,
} from "../story/Interfaces";

const fetchStory = async (): Promise<Story | null> => {
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

const Dialogue_Next_Block: React.FC<{
  dialogueId: string;
  next: Dialogue_Next;
  onNextChange: (next: Dialogue_Next) => void;
}> = ({ dialogueId, next, onNextChange }) => {
  const [nextType, setNextType] = useState<
    "chapter" | "scene" | "dialogue" | "choice"
  >();

  const [chapterNext, setChapterNext] = useState<Partial<Dialogue_Next>>({});
  const [sceneNext, setSceneNext] = useState<Partial<Dialogue_Next>>({});
  const [dialogueNext, setDialogueNext] = useState<Partial<Dialogue_Next>>({});
  const [choiceNext, setChoiceNext] = useState<Partial<Dialogue_Next>>({});

  useEffect(() => {
    if (next.chapter_id) {
      setNextType("chapter");
      setChapterNext(next);
    } else if (next.scene_id) {
      setNextType("scene");
      setSceneNext(next);
    } else if (next.dialogue_id) {
      setNextType("dialogue");
      setDialogueNext(next);
    } else if (next.dialog_options && next.dialog_options.length > 0) {
      setNextType("choice");
      setChoiceNext(next);
    }
  }, [next]);

  const handleOptionChange = (
    index: number,
    field: keyof Dialogue_Option,
    value: string
  ) => {
    const updatedOptions = choiceNext.dialog_options
      ? [...choiceNext.dialog_options]
      : [];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleNextOptionChange = (
    index: number,
    field: keyof Dialogue_Next,
    value: string
  ) => {
    const updatedOptions = choiceNext.dialog_options
      ? [...choiceNext.dialog_options]
      : [];
    const option = updatedOptions[index];
    const updatedNext = { ...option.next, [field]: value };
    updatedOptions[index] = { ...option, next: updatedNext };
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleAddOption = () => {
    const updatedOptions = choiceNext.dialog_options
      ? [...choiceNext.dialog_options, { text: "", next: {} }]
      : [{ text: "", next: {} }];
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = choiceNext.dialog_options
      ? [...choiceNext.dialog_options]
      : [];
    updatedOptions.splice(index, 1);
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const switchTab = (type: "chapter" | "scene" | "dialogue" | "choice") => {
    if (nextType === "chapter") {
      setChapterNext(next);
    } else if (nextType === "scene") {
      setSceneNext(next);
    } else if (nextType === "dialogue") {
      setDialogueNext(next);
    } else if (nextType === "choice") {
      setChoiceNext(next);
    }

    let newNext: Dialogue_Next = {};

    if (type === "chapter") {
      newNext = { ...chapterNext };
    } else if (type === "scene") {
      newNext = { ...sceneNext };
    } else if (type === "dialogue") {
      newNext = { ...dialogueNext };
    } else if (type === "choice") {
      newNext = { ...choiceNext };
    }

    setNextType(type);
    onNextChange(newNext);
  };

  return (
    <div className="block-next">
      <h5 style={{ cursor: "pointer" }}>
        Next Options for Dialogue: {dialogueId}
      </h5>

      <div>
        <button
          onClick={() => switchTab("chapter")}
          className={nextType === "chapter" ? "active" : ""}
        >
          Next Chapter?
        </button>
        <button
          onClick={() => switchTab("scene")}
          className={nextType === "scene" ? "active" : ""}
        >
          Next Scene?
        </button>
        <button
          onClick={() => switchTab("dialogue")}
          className={nextType === "dialogue" ? "active" : ""}
        >
          Next Dialogue?
        </button>
        <button
          onClick={() => switchTab("choice")}
          className={nextType === "choice" ? "active" : ""}
        >
          Next Choice?
        </button>
        <br />
        {nextType === "chapter" && (
          <>
            <label>
              Next Chapter ID:
              <input
                type="text"
                value={chapterNext.chapter_id || ""}
                onChange={(e) =>
                  setChapterNext({ ...chapterNext, chapter_id: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Next Scene ID:
              <input
                type="text"
                value={chapterNext.scene_id || ""}
                onChange={(e) =>
                  setChapterNext({ ...chapterNext, scene_id: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Next Dialogue ID:
              <input
                type="text"
                value={chapterNext.dialogue_id || ""}
                onChange={(e) =>
                  setChapterNext({
                    ...chapterNext,
                    dialogue_id: e.target.value,
                  })
                }
              />
            </label>
          </>
        )}
        {nextType === "scene" && (
          <>
            <label>
              Next Scene ID:
              <input
                type="text"
                value={sceneNext.scene_id || ""}
                onChange={(e) =>
                  setSceneNext({ ...sceneNext, scene_id: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Next Dialogue ID:
              <input
                type="text"
                value={sceneNext.dialogue_id || ""}
                onChange={(e) =>
                  setSceneNext({ ...sceneNext, dialogue_id: e.target.value })
                }
              />
            </label>
          </>
        )}
        {nextType === "dialogue" && (
          <>
            <label>
              Next Dialogue ID:
              <input
                type="text"
                value={dialogueNext.dialogue_id || ""}
                onChange={(e) =>
                  setDialogueNext({
                    ...dialogueNext,
                    dialogue_id: e.target.value,
                  })
                }
              />
            </label>
          </>
        )}
        {nextType === "choice" && (
          <>
            {choiceNext.dialog_options?.map((option, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label>
                  Option Text:
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(index, "text", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Next Dialogue ID:
                  <input
                    type="text"
                    value={option.next.dialogue_id || ""}
                    onChange={(e) =>
                      handleNextOptionChange(
                        index,
                        "dialogue_id",
                        e.target.value
                      )
                    }
                  />
                </label>
                <br />
                <label>
                  Next Scene ID:
                  <input
                    type="text"
                    value={option.next.scene_id || ""}
                    onChange={(e) =>
                      handleNextOptionChange(index, "scene_id", e.target.value)
                    }
                  />
                </label>
                <br />
                <label>
                  Next Chapter ID:
                  <input
                    type="text"
                    value={option.next.chapter_id || ""}
                    onChange={(e) =>
                      handleNextOptionChange(
                        index,
                        "chapter_id",
                        e.target.value
                      )
                    }
                  />
                </label>
                <br />
                <button onClick={() => handleRemoveOption(index)}>
                  Remove Option
                </button>
              </div>
            ))}
            <button onClick={handleAddOption}>Add Option</button>
          </>
        )}
      </div>
    </div>
  );
};

const Dialogue_Block: React.FC<{
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

const Block_Scene: React.FC<{
  chapterId: string;
  sceneId: string;
  scene: Scene;
  onRemove: () => void;
  onSceneChange: (chapterId: string, sceneId: string, scene: Scene) => void;
  onAddDialogue: (
    chapterId: string,
    sceneId: string,
    dialogueId: string
  ) => void;
}> = ({
  chapterId,
  sceneId,
  scene,
  onRemove,
  onSceneChange,
  onAddDialogue,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleDialogueChange = (
    dialogueId: string,
    field: keyof Dialogue,
    value: string
  ) => {
    const updatedScene = { ...scene };
    const dialogue = updatedScene.dialogue[dialogueId];
    if (dialogue) {
      dialogue[field] = value;
      onSceneChange(chapterId, sceneId, updatedScene);
    }
  };

  const handleNextChange = (dialogueId: string, next: Dialogue_Next) => {
    const updatedScene = { ...scene };
    const dialogue = updatedScene.dialogue[dialogueId];
    if (dialogue) {
      dialogue.next = next;
      onSceneChange(chapterId, sceneId, updatedScene);
    }
  };

  const handleAddDialogue = () => {
    const dialogueId = prompt("Enter new dialogue ID:");
    if (dialogueId) {
      onAddDialogue(chapterId, sceneId, dialogueId);
    }
  };

  const handleBackgroundChange = (value: string) => {
    const updatedScene = { ...scene, background: value };
    onSceneChange(chapterId, sceneId, updatedScene);
  };

  return (
    <div className="block-scene">
      <h3
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        {sceneId}
      </h3>
      {!isCollapsed && (
        <div>
          <label>
            Background:
            <input
              type="text"
              value={scene.background}
              onChange={(e) => handleBackgroundChange(e.target.value)}
            />
          </label>
          <br />
          {Object.entries(scene.dialogue)
            .sort(([a], [b]) => {
              if (a === "start") return -1;
              if (b === "start") return 1;
              return a.localeCompare(b);
            })
            .map(([dialogueId, dialogue]) => (
              <Dialogue_Block
                key={dialogueId}
                dialogueId={dialogueId}
                dialogue={dialogue}
                onChange={handleDialogueChange}
                onNextChange={handleNextChange}
              />
            ))}
          <button onClick={handleAddDialogue}>Add Dialogue</button>
          <button onClick={onRemove}>Remove Scene</button>
        </div>
      )}
    </div>
  );
};

const Block_Chapter: React.FC<{
  chapterId: string;
  chapter: Chapter;
  onAddScene: (chapterId: string, sceneId: string) => void;
  onRemoveScene: (chapterId: string, sceneId: string) => void;
  onSceneChange: (chapterId: string, sceneId: string, scene: Scene) => void;
  onAddDialogue: (
    chapterId: string,
    sceneId: string,
    dialogueId: string
  ) => void;
}> = ({
  chapterId,
  chapter,
  onAddScene,
  onRemoveScene,
  onSceneChange,
  onAddDialogue,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddScene = () => {
    const sceneId = prompt("Enter new scene ID:");
    if (sceneId) {
      onAddScene(chapterId, sceneId);
    }
  };

  return (
    <div className="block-chapter">
      <h2
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        {chapterId}
      </h2>
      {!isCollapsed && (
        <div>
          {Object.entries(chapter.scenes)
            .sort(([a], [b]) => {
              if (a === "start") return -1;
              if (b === "start") return 1;
              return a.localeCompare(b);
            })
            .map(([sceneId, scene]) => (
              <Block_Scene
                key={sceneId}
                chapterId={chapterId}
                sceneId={sceneId}
                scene={scene}
                onRemove={() => onRemoveScene(chapterId, sceneId)}
                onSceneChange={onSceneChange}
                onAddDialogue={onAddDialogue}
              />
            ))}
          <button onClick={handleAddScene}>Add Scene</button>
        </div>
      )}
    </div>
  );
};

const Editor = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStory = async () => {
      const fetchedStory = await fetchStory();
      setStory(fetchedStory);
      setLoading(false);
    };
    loadStory();
  }, []);

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

  const handleRemoveScene = (chapterId: string, sceneId: string) => {
    if (story) {
      const updatedStory = { ...story };
      const chapter = updatedStory[chapterId];
      delete chapter.scenes[sceneId];
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

  const handleSave = async () => {
    if (story) {
      await updateStory(story);
    }
  };

  if (loading) {
    return <p>Loading story...</p>;
  }

  if (!story) {
    return <p>No story data available</p>;
  }

  return (
    <div className="editor">
      <button onClick={handleSave}>Save Changes</button>
      {Object.entries(story)
        .sort(([a], [b]) => {
          if (a === "start") return -1;
          if (b === "start") return 1;
          return a.localeCompare(b);
        })
        .map(([chapterId, chapter]) => (
          <Block_Chapter
            key={chapterId}
            chapterId={chapterId}
            chapter={chapter}
            onAddScene={handleAddScene}
            onRemoveScene={handleRemoveScene}
            onSceneChange={handleSceneChange}
            onAddDialogue={handleAddDialogue}
          />
        ))}
    </div>
  );
};

export default Editor;
