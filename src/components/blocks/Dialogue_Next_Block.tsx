import { useState, useEffect } from "react";
import { Dialogue_Next, Dialogue_Option, Story } from "../../story/Interfaces";
import { fetchStory } from "../../pages/Editor";

export const Dialogue_Next_Block: React.FC<{
  chapterId: string;
  sceneId: string;
  next: Dialogue_Next;
  onNextChange: (next: Dialogue_Next) => void;
}> = ({ chapterId, sceneId, next, onNextChange }) => {
  const [nextType, setNextType] = useState<
    "chapter" | "scene" | "dialogue" | "choice"
  >();

  const [chapterNext, setChapterNext] = useState<Partial<Dialogue_Next>>({});
  const [sceneNext, setSceneNext] = useState<Partial<Dialogue_Next>>({});
  const [dialogueNext, setDialogueNext] = useState<Partial<Dialogue_Next>>({});
  const [choiceNext, setChoiceNext] = useState<Partial<Dialogue_Next>>({});
  const [story, setStory] = useState<Story | null>(null);
  const [availableScenes, setAvailableScenes] = useState<string[]>([]);
  const [availableDialogues, setAvailableDialogues] = useState<string[]>([]);

  useEffect(() => {
    const fetchStoryData = async () => {
      const fetchedStory = await fetchStory();
      setStory(fetchedStory);
    };
    fetchStoryData();
  }, []);

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

  const findScenes = () => {
    console.log(chapterNext.chapter_id && story);

    if (chapterNext.chapter_id && story)
      setAvailableScenes(
        Object.keys(story[chapterNext.chapter_id]?.scenes || {})
      );
  };

  useEffect(() => {
    findScenes();
  }, [chapterNext.chapter_id, story]);

  const findDialogues = () => {
    if (sceneNext.scene_id && chapterNext.chapter_id && story)
      setAvailableDialogues(
        Object.keys(
          story[chapterNext.chapter_id]?.scenes[sceneNext.scene_id]?.dialogue ||
            {}
        )
      );
  };

  useEffect(() => {
    findDialogues();
  }, [sceneNext.scene_id, chapterNext.chapter_id, story]);

  const handleNextOptionChange = (
    index: number,
    field: keyof Dialogue_Next,
    value: string
  ) => {
    const updatedOptions = [...(choiceNext.dialog_options || [])];
    const option = updatedOptions[index];
    const updatedNext = { ...option.next, [field]: value };
    updatedOptions[index] = { ...option, next: updatedNext };
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

    switch (type) {
      case "chapter":
        onNextChange({ ...chapterNext });
        break;
      case "scene":
        setChapterNext({ chapter_id: chapterId });
        onNextChange({ ...sceneNext });
        break;
      case "dialogue":
        setChapterNext({ chapter_id: chapterId });
        setSceneNext({ scene_id: sceneId });
        onNextChange({ ...dialogueNext });
        break;
      case "choice":
        onNextChange({ ...choiceNext });
        break;
    }
  };

  const renderSelect = (
    label: string,
    value: string,
    options: string[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  ) => (
    <div>
      <label>
        {label}
        <select value={value} onChange={onChange}>
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <br />
    </div>
  );

  const renderOptionInputs = () =>
    (choiceNext.dialog_options || []).map((option, index) => (
      <div key={index} style={{ marginBottom: "10px" }}>
        {renderSelect(
          "Next Dialogue ID:",
          option.next.dialogue_id || "",
          availableDialogues,
          (e) => handleNextOptionChange(index, "dialogue_id", e.target.value)
        )}
        {renderSelect(
          "Next Scene ID:",
          option.next.scene_id || "",
          availableScenes,
          (e) => handleNextOptionChange(index, "scene_id", e.target.value)
        )}
        {renderSelect(
          "Next Chapter ID:",
          option.next.chapter_id || "",
          Object.keys(story || {}),
          (e) => handleNextOptionChange(index, "chapter_id", e.target.value)
        )}
        <button onClick={() => handleRemoveOption(index)}>Remove Option</button>
      </div>
    ));

  const renderInputs = () => {
    switch (nextType) {
      case "chapter":
        return (
          <>
            {renderSelect(
              "Next Chapter ID:",
              chapterNext.chapter_id || "",
              Object.keys(story || {}),
              (e) =>
                setChapterNext({ ...chapterNext, chapter_id: e.target.value })
            )}
            {renderSelect(
              "Next Scene ID:",
              chapterNext.scene_id || "",
              availableScenes,
              (e) =>
                setChapterNext({ ...chapterNext, scene_id: e.target.value })
            )}
            {renderSelect(
              "Next Dialogue ID:",
              chapterNext.dialogue_id || "",
              availableDialogues,
              (e) =>
                setChapterNext({
                  ...chapterNext,
                  dialogue_id: e.target.value,
                })
            )}
          </>
        );
      case "scene":
        return (
          <>
            {renderSelect(
              "Next Scene ID:",
              sceneNext.scene_id || "",
              availableScenes,
              (e) => setSceneNext({ ...sceneNext, scene_id: e.target.value })
            )}
            {renderSelect(
              "Next Dialogue ID:",
              sceneNext.dialogue_id || "",
              availableDialogues,
              (e) => setSceneNext({ ...sceneNext, dialogue_id: e.target.value })
            )}
          </>
        );
      case "dialogue":
        return (
          <>
            {renderSelect(
              "Next Dialogue ID:",
              dialogueNext.dialogue_id || "",
              availableDialogues,
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
