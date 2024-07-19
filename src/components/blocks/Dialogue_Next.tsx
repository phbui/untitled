import { useState, useEffect, useContext } from "react";
import { Dialogue_Next, Dialogue_Option, Story } from "../../story/Interfaces";
import { Editor_Type, fetchStory } from "../../pages/Editor";

export const Block_Dialogue_Next: React.FC = () => {
  const editor = useContext(Editor_Type);
  const [nextType, setNextType] = useState<"navigate" | "options">();

  const [navigateNext, setNavigateNext] = useState<Partial<Dialogue_Next>>({});
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

    if (next.chapter_id || next.scene_id || next.dialogue_id) {
      setNextType("navigate");
      setNavigateNext(next);
    } else if (next.dialog_options && next.dialog_options.length > 0) {
      setNextType("options");
      setChoiceNext(next);
    }
  }, [next, story]);

  const findScenes = (chapterId: string) => {
    if (chapterId && story)
      setAvailableScenes(
        Object.keys(story[chapterId.replace(" (current)", "")]?.scenes || {})
          .sort()
          .map((sceneId) => {
            return sceneId === editor.currentSceneId
              ? `${sceneId} (current)`
              : sceneId;
          })
      );
  };

  const findDialogues = (chapterId: string, sceneId: string) => {
    if (chapterId && sceneId && story)
      setAvailableDialogues(
        Object.keys(
          story[chapterId.replace(" (current)", "")]?.scenes[
            sceneId.replace(" (current)", "")
          ]?.dialogue || {}
        )
          .filter((dialogueId) => dialogueId !== editor.currentDialogueId)
          .sort()
      );
  };

  useEffect(() => {
    if (navigateNext.chapter_id) {
      findScenes(navigateNext.chapter_id);
      setNavigateNext((prev) => ({ ...prev, scene_id: "", dialogue_id: "" }));
      setAvailableDialogues([]);
    }
  }, [navigateNext.chapter_id]);

  useEffect(() => {
    if (navigateNext.scene_id) {
      findDialogues(navigateNext.chapter_id!, navigateNext.scene_id);
      setNavigateNext((prev) => ({ ...prev, dialogue_id: "" }));
    }
  }, [navigateNext.scene_id]);

  const handleNextOptionChange = (
    index: number,
    field: keyof Dialogue_Option,
    value: any
  ) => {
    const updatedOptions = { ...choiceNext };
    const dialogOption = updatedOptions.dialog_options
      ? updatedOptions.dialog_options[index]
      : null;

    if (dialogOption) {
      dialogOption[field] = value;
      setChoiceNext(updatedOptions);
    }
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

  const switchTab = (type: "navigate" | "options") => {
    setNextType(type);

    switch (type) {
      case "navigate":
        handleNextChange(editor.currentDialogueId, {
          ...navigateNext,
        } as Dialogue_Next);
        break;
      case "options":
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
          Text:
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
          Object.keys(story || {}).map((id) =>
            id === editor.currentChapterId ? `${id} (current)` : id
          ),
          (e) => {
            handleNextOptionChange(index, "next", {
              ...option.next,
              chapter_id: e.target.value,
            });
            findScenes(e.target.value);
          }
        )}
        {renderSelect(
          "Next Scene ID:",
          option.next.scene_id || "",
          availableScenes,
          (e) => {
            handleNextOptionChange(index, "next", {
              ...option.next,
              scene_id: e.target.value,
            });
            findDialogues(option.next.chapter_id || "", e.target.value);
          },
          !option.next.chapter_id
        )}
        {renderSelect(
          "Next Dialogue ID:",
          option.next.dialogue_id || "",
          availableDialogues,
          (e) =>
            handleNextOptionChange(index, "next", {
              ...option.next,
              dialogue_id: e.target.value,
            }),
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
      case "navigate":
        return (
          <>
            {renderSelect(
              "Next Chapter ID:",
              navigateNext.chapter_id || editor.currentChapterId,
              Object.keys(story || {}).map((id) =>
                id === editor.currentChapterId ? `${id} (current)` : id
              ),
              (e) =>
                setNavigateNext({
                  ...navigateNext,
                  chapter_id: e.target.value,
                  scene_id: "",
                  dialogue_id: "",
                })
            )}
            {renderSelect(
              "Next Scene ID:",
              navigateNext.scene_id || "",
              availableScenes,
              (e) =>
                setNavigateNext({ ...navigateNext, scene_id: e.target.value }),
              !navigateNext.chapter_id
            )}
            {renderSelect(
              "Next Dialogue ID:",
              navigateNext.dialogue_id || "",
              availableDialogues,
              (e) =>
                setNavigateNext({
                  ...navigateNext,
                  dialogue_id: e.target.value,
                }),
              !navigateNext.scene_id
            )}
          </>
        );
      case "options":
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
        {["navigate", "options"].map((type) => (
          <button
            key={type}
            onClick={() => switchTab(type as "navigate" | "options")}
            className={`block-next__tab-button ${
              nextType === type ? "active" : ""
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <br />
      <div className="block-next__inputs">{renderInputs()}</div>
    </div>
  );
};
