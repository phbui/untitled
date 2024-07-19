import { useState, useEffect, useContext } from "react";
import { Dialogue_Next, Dialogue_Option, Story } from "../../story/Interfaces";
import { Editor_Type, fetchStory } from "../../pages/Editor";

export const Block_Dialogue_Next: React.FC = () => {
  const editor = useContext(Editor_Type);
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

  const scene = (editor.story as Story)[editor.currentChapterId].scenes[
    editor.currentSceneId
  ];

  const next = (editor.story as Story)[editor.currentChapterId].scenes[
    editor.currentSceneId
  ].dialogue[editor.currentDialogueId].next;

  useEffect(() => {
    const fetchStoryData = async () => {
      const fetchedStory = await fetchStory();
      setStory(fetchedStory);
    };
    fetchStoryData();
  }, []);

  useEffect(() => {
    if (story === null) return;

    if (next.chapter_id) {
      setNextType("chapter");
      setChapterNext(next);
    } else if (next.scene_id) {
      setChapterNext({ chapter_id: editor.currentChapterId });
      setNextType("scene");
      setSceneNext(next);
    } else if (next.dialogue_id) {
      setChapterNext({ chapter_id: editor.currentChapterId });
      setSceneNext({ scene_id: editor.currentSceneId });
      setNextType("dialogue");
      setDialogueNext(next);
    } else if (next.dialog_options && next.dialog_options.length > 0) {
      setNextType("choice");
      setChoiceNext(next);
    }
  }, [next, story]);

  const findScenes = (chapterId: string) => {
    if (chapterId && story)
      setAvailableScenes(Object.keys(story[chapterId]?.scenes || {}));
  };

  const findDialogues = (chapterId: string, sceneId: string) => {
    if (chapterId && sceneId && story)
      setAvailableDialogues(
        Object.keys(story[chapterId]?.scenes[sceneId]?.dialogue || {})
      );
  };

  useEffect(() => {
    if (nextType === "chapter") {
      findScenes(chapterNext.chapter_id || editor.currentChapterId);
      if (chapterNext.chapter_id && chapterNext.scene_id) {
        findDialogues(chapterNext.chapter_id, chapterNext.scene_id);
      }
    } else if (nextType === "scene" || nextType === "dialogue") {
      findScenes(editor.currentChapterId);
      findDialogues(
        editor.currentChapterId,
        sceneNext.scene_id || editor.currentSceneId
      );
    }
  }, [chapterNext.chapter_id, sceneNext.scene_id, story, nextType]);

  const handleNextOptionChange = (
    index: number,
    field: keyof Dialogue_Option["next"],
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
    setChoiceNext({
      ...choiceNext,
      dialog_options: updatedOptions as Dialogue_Option[],
    });
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...(choiceNext.dialog_options || [])];
    updatedOptions.splice(index, 1);
    setChoiceNext({ ...choiceNext, dialog_options: updatedOptions });
  };

  const handleNextChange = (dialogueId: string, next: Dialogue_Next) => {
    const updatedScene = { ...scene };
    const dialogue = updatedScene.dialogue[dialogueId];
    if (dialogue) {
      dialogue.next = next;
      editor.handleSceneChange(
        editor.currentChapterId,
        editor.currentSceneId,
        updatedScene
      );
    }
  };

  const switchTab = (type: "chapter" | "scene" | "dialogue" | "choice") => {
    setNextType(type);

    switch (type) {
      case "chapter":
        handleNextChange(editor.currentDialogueId, {
          ...chapterNext,
        } as Dialogue_Next);
        break;
      case "scene":
        setChapterNext({ chapter_id: editor.currentChapterId });
        handleNextChange(editor.currentDialogueId, {
          ...sceneNext,
        } as Dialogue_Next);
        break;
      case "dialogue":
        setChapterNext({ chapter_id: editor.currentChapterId });
        setSceneNext({ scene_id: editor.currentSceneId });
        handleNextChange(editor.currentDialogueId, {
          ...dialogueNext,
        } as Dialogue_Next);
        break;
      case "choice":
        handleNextChange(editor.currentDialogueId, {
          ...choiceNext,
        } as Dialogue_Next);
        break;
    }
  };

  const renderSelect = (
    label: string,
    value: string,
    options: string[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    disabled: boolean = false
  ) => (
    <div className="block-next__select-container">
      <label className="block-next__label">
        {label}
        <select
          className="block-next__select"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
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
      <div key={index} className="block-next__option">
        <label>
          Option Text:
          <input
            type="text"
            value={option.text}
            onChange={(e) =>
              handleNextOptionChange(index, "text", e.target.value)
            }
          />
        </label>
        {renderSelect(
          "Next Chapter ID:",
          option.next.chapter_id || "",
          Object.keys(story || {}),
          (e) => {
            handleNextOptionChange(index, "chapter_id", e.target.value);
            findScenes(e.target.value);
          }
        )}
        {renderSelect(
          "Next Scene ID:",
          option.next.scene_id || "",
          availableScenes,
          (e) => {
            handleNextOptionChange(index, "scene_id", e.target.value);
            findDialogues(option.next.chapter_id || "", e.target.value);
          },
          !option.next.chapter_id
        )}
        {renderSelect(
          "Next Dialogue ID:",
          option.next.dialogue_id || "",
          availableDialogues,
          (e) => handleNextOptionChange(index, "dialogue_id", e.target.value),
          !option.next.scene_id
        )}
        <button
          className="block-next__delete-button"
          onClick={() => handleDeleteOption(index)}
        >
          Delete Option
        </button>
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
                setChapterNext({ ...chapterNext, scene_id: e.target.value }),
              !chapterNext.chapter_id
            )}
            {renderSelect(
              "Next Dialogue ID:",
              chapterNext.dialogue_id || "",
              availableDialogues,
              (e) =>
                setChapterNext({
                  ...chapterNext,
                  dialogue_id: e.target.value,
                }),
              !chapterNext.scene_id
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
              (e) =>
                setSceneNext({ ...sceneNext, dialogue_id: e.target.value }),
              !sceneNext.scene_id
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
          <div className="options-container">
            {renderOptionInputs()}
            <div className="add-button">
              <button
                className="block-next__add-option-button"
                onClick={handleAddOption}
              >
                Add Option
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="block-next">
      <div className="block-next__tabs">
        {["chapter", "scene", "dialogue", "choice"].map((type) => (
          <button
            key={type}
            onClick={() =>
              switchTab(type as "chapter" | "scene" | "dialogue" | "choice")
            }
            className={`block-next__tab-button ${
              nextType === type ? "active" : ""
            }`}
          >
            {`Next ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </button>
        ))}
      </div>
      <br />
      <div className="block-next__inputs">{renderInputs()}</div>
    </div>
  );
};
