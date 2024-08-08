import { useState, useEffect } from "react";
import { Dialogue, Dialogue_Next } from "../story/Interfaces";

interface Props_Typewriter {
  dialogue?: Dialogue;
  getNext: (next: Dialogue_Next) => void;
  playerTurn: boolean;
}

const Typewriter: React.FC<Props_Typewriter> = ({
  dialogue,
  getNext,
  playerTurn,
}) => {
  if (dialogue === undefined) return;

  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const isTyping = () => index < dialogue.text.length;

  useEffect(() => {
    if (dialogue === undefined) return;
    setIndex(0);
    setDisplayedText("");
  }, [dialogue]);

  useEffect(() => {
    if (isTyping()) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + dialogue.text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 35); // Adjust typing speed here
      return () => clearTimeout(timeout);
    }
  }, [index, dialogue]);

  useEffect(() => {
    if (!isTyping() && dialogue?.next.dialog_options) getNext(dialogue?.next);
  }, [index]);

  const handleClick = () => {
    if (isTyping()) {
      setDisplayedText(dialogue.text);
      setIndex(dialogue.text.length);
    } else {
      getNext(dialogue?.next);
    }
  };

  return (
    <div
      className="dialogue"
      style={{
        opacity: `${playerTurn ? "0.8" : "1"}`,
        cursor: `${playerTurn ? "not-allowed" : "pointer"}`,
      }}
      onClick={handleClick}
    >
      <div className="halftone" />
      <p>
        {displayedText}
        {<span className="cursor" />}
      </p>
      {!isTyping() && dialogue.next.dialog_options === undefined && (
        <span className="blink">▼</span>
      )}
    </div>
  );
};

export default Typewriter;
