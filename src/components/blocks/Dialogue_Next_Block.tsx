import { useState, useEffect } from "react";
import { Dialogue_Next, Dialogue_Option } from "../../story/Interfaces";

export const Dialogue_Next_Block: React.FC<{
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
      <h5>Next Options for Dialogue: {dialogueId}</h5>

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
