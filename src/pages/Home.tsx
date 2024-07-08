import { useState } from "react";
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
  isVisible,
}: {
  content: string;
  onBackClick: () => void;
  isVisible: boolean;
}) => (
  <div className={`section ${isVisible ? "visible" : ""}`}>
    <button className="arrow-button" onClick={onBackClick}>
      ←
    </button>
    <div>{content}</div>
  </div>
);

const sections = [
  {
    id: "section1",
    content: "Section 1 Content",
    imageId: "573bfb4a05fa691f74c6b77f263327c4",
  },
  {
    id: "section2",
    content: "Section 2 Content",
    imageId: "45a1cea5d95969b309795bea796a559b",
  },
  {
    id: "section3",
    content: "Section 3 Content",
    imageId: "5417248dd165247176733799b1f8507d",
  },
  {
    id: "section4",
    content: "Section 4 Content",
    imageId: "6454b5c45e742493313517467e602d59",
  },
];

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

      <div
        className={`Home_Buttons ${activeSection ? "slide-out" : "slide-in"}`}
      >
        {sections.map((section) => (
          <Home_Button
            key={section.id}
            src={`https://fontmeme.com/permalink/240708/${section.imageId}.png`}
            onClick={() => handleButtonClick(section.id)}
          />
        ))}
      </div>

      {sections.map((section) => (
        <Home_Section
          key={section.id}
          content={section.content}
          onBackClick={handleBackClick}
          isVisible={activeSection === section.id}
        />
      ))}
    </div>
  );
};

export default Home;
