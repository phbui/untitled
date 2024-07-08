import { FunctionComponent, useState } from "react";
import Creation from "../components/Creation";
import Catalog from "../components/Catalog";
import Options from "../components/Options";
import Load from "../components/Load";

// Scanlines Component
const Scanlines = () => <div className="scanlines"></div>;

// Define props for Home_Button
interface Props_Home_Button {
  src: string;
  onClick: () => void;
}

// Button Component
const Home_Button: React.FC<Props_Home_Button> = ({ src, onClick }) => (
  <button onClick={onClick}>
    <img src={src} alt="button" />
  </button>
);

const Component_Map: Record<string, FunctionComponent> = {
  catalog: Catalog,
  create: Creation,
  load: Load,
  options: Options,
};

// Define props for Home_Section
interface Props_Home_Section {
  title: string;
  onBackClick: () => void;
  isVisible: boolean;
  component: string;
}

// Section Component
const Home_Section: React.FC<Props_Home_Section> = ({
  title,
  onBackClick,
  isVisible,
  component,
}) => {
  let Component_Rendered = Component_Map[component];

  return (
    <div className={`section ${isVisible ? "visible" : ""}`}>
      <button className="arrow-button" onClick={onBackClick}>
        ←
      </button>
      <h1>{title}</h1>
      <Component_Rendered />
    </div>
  );
};

const sections = [
  {
    id: "create",
    title: "Character Creator",
    imageId: "573bfb4a05fa691f74c6b77f263327c4",
    component: "create",
  },
  {
    id: "load",
    title: "Section 2 Content",
    imageId: "45a1cea5d95969b309795bea796a559b",
    component: "load",
  },
  {
    id: "catalog",
    title: "Character Catalog",
    imageId: "5417248dd165247176733799b1f8507d",
    component: "catalog",
  },
  {
    id: "options",
    title: "Options",
    imageId: "6454b5c45e742493313517467e602d59",
    component: "options",
  },
];

// Define props for Home
interface Props_Home {}

// Home Component
const Home: React.FC<Props_Home> = () => {
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

      <div
        className={`Home_Title_Container ${
          activeSection ? "slide-out" : "slide-in"
        }`}
      >
        <img
          className="Home_Title"
          src="/assets/untitled_title.png"
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
          title={section.title}
          onBackClick={handleBackClick}
          isVisible={activeSection === section.id}
          component={section.component}
        />
      ))}
    </div>
  );
};

export default Home;
