import { useState } from "react";
import ReactDOM from "react-dom";

// Scanlines Component
const Scanlines = () => <div className="scanlines"></div>;

// Button Component
const Home_Button = ({
  src,
  onClick,
}: {
  src: string;
  onClick: () => void;
}) => (
  <button onClick={onClick}>
    <img src={src} alt="button" />
  </button>
);

// Section Component
const Home_Section = ({
  content,
  onBackClick,
}: {
  content: string;
  onBackClick: () => void;
}) => (
  <div className="section">
    <button className="arrow-button" onClick={onBackClick}>
      ←
    </button>
    <div>{content}</div>
  </div>
);

// Home Component
const Home = () => {
  const [scanlinesToggled, setScanlinesToggled] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  const handleBackClick = () => {
    setActiveSection(null);
  };

  return (
    <div className="Home">
      {scanlinesToggled && <Scanlines />}

      <div className="Home_Title_Container">
        <img
          className="Home_Title"
          src="src/assets/untitled_title.png"
          alt="title"
        />
      </div>

      <div className={`Home_Buttons ${activeSection ? "hidden" : ""}`}>
        <Home_Button
          src="https://fontmeme.com/permalink/240708/573bfb4a05fa691f74c6b77f263327c4.png"
          onClick={() => handleButtonClick("section1")}
        />
        <Home_Button
          src="https://fontmeme.com/permalink/240708/45a1cea5d95969b309795bea796a559b.png"
          onClick={() => handleButtonClick("section2")}
        />
        <Home_Button
          src="https://fontmeme.com/permalink/240708/5417248dd165247176733799b1f8507d.png"
          onClick={() => handleButtonClick("section3")}
        />
        <Home_Button
          src="https://fontmeme.com/permalink/240708/6454b5c45e742493313517467e602d59.png"
          onClick={() => handleButtonClick("section4")}
        />
      </div>

      {activeSection === "section1" && (
        <Home_Section
          content="Section 1 Content"
          onBackClick={handleBackClick}
        />
      )}
      {activeSection === "section2" && (
        <Home_Section
          content="Section 2 Content"
          onBackClick={handleBackClick}
        />
      )}
      {activeSection === "section3" && (
        <Home_Section
          content="Section 3 Content"
          onBackClick={handleBackClick}
        />
      )}
      {activeSection === "section4" && (
        <Home_Section
          content="Section 4 Content"
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default Home;
