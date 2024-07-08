import React from "react";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home_Title_Container">
        <img className="Home_Title" src="src/assets/untitled_title.png" />
      </div>

      <div className="Home_Buttons">
        <button>
          <img
            src="https://fontmeme.com/permalink/240708/573bfb4a05fa691f74c6b77f263327c4.png"
            alt="silent-hill-font"
          />
        </button>
        <button>
          <img
            src="https://fontmeme.com/permalink/240708/45a1cea5d95969b309795bea796a559b.png"
            alt="silent-hill-font"
          />
        </button>
        <button>
          <img
            src="https://fontmeme.com/permalink/240708/5417248dd165247176733799b1f8507d.png"
            alt="silent-hill-font"
          />
        </button>
        <button>
          <img src="https://fontmeme.com/permalink/240708/6454b5c45e742493313517467e602d59.png" />
        </button>
      </div>
    </div>
  );
};

export default Home;
