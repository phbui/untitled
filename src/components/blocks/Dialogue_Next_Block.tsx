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
    const updatedOptions = [...(choiceNext.dialog_options || [])];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleNextOptionChange = (
    index: number,
    field: keyof Dialogue_Next,
    value: string
  ) => {
    const updatedOptions = [...(choiceNext.dialog_options || [])];
    updatedOptions[index] = {
      ...updatedOptions[index],
      next: { ...updatedOptions[index].next, [field]: value },
    };
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleAddOption = () => {
    const updatedOptions = [
      ...(choiceNext.dialog_options || []),
      { text: "", next: {} },
    ];
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...(choiceNext.dialog_options || [])];
    updatedOptions.splice(index, 1);
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const switchTab = (type: "chapter" | "scene" | "dialogue" | "choice") => {
    setNextType(type);
    onNextChange(
      type === "chapter"
        ? { ...chapterNext }
        : type === "scene"
        ? { ...sceneNext }
        : type === "dialogue"
        ? { ...dialogueNext }
        : { ...choiceNext }
    );
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <div>
      <label>
        {label}
        <input type="text" value={value} onChange={onChange} />
      </label>
      <br />
    </div>
  );

  const renderOptionInputs = () =>
    (choiceNext.dialog_options || []).map((option, index) => (
      <div key={index} style={{ marginBottom: "10px" }}>
        {renderInput("Option Text:", option.text, (e) =>
          handleOptionChange(index, "text", e.target.value)
        )}
        {renderInput("Next Dialogue ID:", option.next.dialogue_id || "", (e) =>
          handleNextOptionChange(index, "dialogue_id", e.target.value)
        )}
        {renderInput("Next Scene ID:", option.next.scene_id || "", (e) =>
          handleNextOptionChange(index, "scene_id", e.target.value)
        )}
        {renderInput("Next Chapter ID:", option.next.chapter_id || "", (e) =>
          handleNextOptionChange(index, "chapter_id", e.target.value)
        )}
        <button onClick={() => handleRemoveOption(index)}>Remove Option</button>
      </div>
    ));

  const renderInputs = () => {
    switch (nextType) {
      case "chapter":
        return (
          <>
            {renderInput(
              "Next Chapter ID:",
              chapterNext.chapter_id || "",
              (e) =>
                setChapterNext({ ...chapterNext, chapter_id: e.target.value })
            )}
            {renderInput("Next Scene ID:", chapterNext.scene_id || "", (e) =>
              setChapterNext({ ...chapterNext, scene_id: e.target.value })
            )}
            {renderInput(
              "Next Dialogue ID:",
              chapterNext.dialogue_id || "",
              (e) =>
                setChapterNext({ ...chapterNext, dialogue_id: e.target.value })
            )}
          </>
        );
      case "scene":
        return (
          <>
            {renderInput("Next Scene ID:", sceneNext.scene_id || "", (e) =>
              setSceneNext({ ...sceneNext, scene_id: e.target.value })
            )}
            {renderInput(
              "Next Dialogue ID:",
              sceneNext.dialogue_id || "",
              (e) => setSceneNext({ ...sceneNext, dialogue_id: e.target.value })
            )}
          </>
        );
      case "dialogue":
        return (
          <>
            {renderInput(
              "Next Dialogue ID:",
              dialogueNext.dialogue_id || "",
              (e) =>
                setDialogueNext({
                  ...dialogueNext,
                  dialogue_id: e.target.value,
                })
            )}
          </>
        );
      case "choice":
        return (
          <>
            {renderOptionInputs()}
            <button onClick={handleAddOption}>Add Option</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="block-next">
      {["chapter", "scene", "dialogue", "choice"].map((type) => (
        <button
          key={type}
          onClick={() =>
            switchTab(type as "chapter" | "scene" | "dialogue" | "choice")
          }
          className={nextType === type ? "active" : ""}
        >
          {`Next ${type.charAt(0).toUpperCase() + type.slice(1)}?`}
        </button>
      ))}
      <br />
      {renderInputs()}
    </div>
  );
};
