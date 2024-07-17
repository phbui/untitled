import { Scene } from "../../story/Interfaces";

export const Block_Scene: React.FC<{
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
