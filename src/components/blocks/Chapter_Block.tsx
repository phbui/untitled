import { useState } from "react";
import { Chapter, Scene } from "../../story/Interfaces";
import { Block_Scene } from "./Scene_Block";

export const Block_Chapter: React.FC<{
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
