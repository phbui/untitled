import { useState } from "react";
import { Chapter, Scene } from "../../story/Interfaces";
import { Block_Scene } from "./Scene";

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
  onItemClick: (
    event: React.MouseEvent,
    input: {
      chapterId?: string;
      sceneId?: string;
      dialogueId?: string;
    }
  ) => void;
}> = ({
  chapterId,
  chapter,
  onAddScene,
  onRemoveScene,
  onSceneChange,
  onAddDialogue,
  onItemClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddScene = () => {
    const sceneId = prompt("Enter new scene ID:");
    if (sceneId) {
      onAddScene(chapterId, sceneId);
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (!isCollapsed) e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    onItemClick(e, { chapterId });
  };

  return (
    <div className="block-chapter" onClick={handleBlockClick}>
      <h2 onClick={handleHeaderClick} style={{ cursor: "pointer" }}>
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
                onItemClick={onItemClick}
              />
            ))}
          <button onClick={handleAddScene}>Add Scene</button>
        </div>
      )}
    </div>
  );
};
