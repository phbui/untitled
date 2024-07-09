import { Props_Wardrobe_Tab } from "./components/Creation";

export const wardrobe_tabs: Props_Wardrobe_Tab[] = [
  {
    type: "hair",
    items: [
      {
        name: "Long & Purple Hair",
        url: "/assets/clothes/hair/long-purple.png",
        desc: "",
      },
      {
        name: "Short & Green Hair",
        url: "/assets/clothes/hair/short-green.png",
        desc: "",
      },
      {
        name: "Curly & Blue Hair",
        url: "/assets/clothes/hair/curly-blue.png",
        desc: "",
      },
    ],
  },
  {
    type: "eyes",
    items: [
      {
        name: "Crazy Eyes",
        url: "/assets/clothes/eyes/crazy-eyes.png",
        desc: "",
      },
      {
        name: "Cute Eyes",
        url: "/assets/clothes/eyes/cute-eyes.png",
        desc: "",
      },
      {
        name: "Dead Eyes",
        url: "/assets/clothes/eyes/dead-eyes.png",
        desc: "",
      },
    ],
  },
  {
    type: "torso",
    items: [
      {
        name: "Arcane Polo",
        url: "/assets/clothes/torso/arcane-polo.png",
        desc: "",
      },
      {
        name: "Tank & Tee",
        url: "/assets/clothes/torso/green-tank+longsleeve.png",
        desc: "",
      },
      {
        name: "Mermaid Dress",
        url: "/assets/clothes/torso/water-dress.png",
        desc: "",
      },
      {
        name: "Dotted Dress",
        url: "/assets/clothes/torso/dotted-dress.png",
        desc: "",
      },
      {
        name: "Striped Top",
        url: "/assets/clothes/torso/striped-top.png",
        desc: "",
      },
    ],
  },
  {
    type: "legs",
    items: [
      {
        name: "Fish Cargos",
        url: "/assets/clothes/legs/fish-cargos.png",
        desc: "",
      },
      {
        name: "Zig-Zag Jeans",
        url: "/assets/clothes/legs/zig-zag-jeans.png",
        desc: "",
      },
      {
        name: "Red Skirt",
        url: "/assets/clothes/legs/red-skirt.png",
        desc: "",
      },
    ],
  },
  {
    type: "feet",
    items: [
      {
        name: "Purple Kicks",
        url: "/assets/clothes/feet/purple-kicks.png",
        desc: "",
      },
      {
        name: "Red Heels",
        url: "/assets/clothes/feet/red-heels.png",
        desc: "",
      },
      {
        name: "Buckle Boots",
        url: "/assets/clothes/feet/buckle-boots.png",
        desc: "",
      },
    ],
  },
  {
    type: "accessory",
    items: [
      {
        name: "Geek Bar",
        url: "/assets/clothes/accessory/geek-bar.png",
        desc: "",
      },
      {
        name: "Grommet Belt",
        url: "/assets/clothes/accessory/grommet-belt.png",
        desc: "",
      },
      {
        name: "Hair Clips",
        url: "/assets/clothes/accessory/hair-clips.png",
        desc: "",
      },
      {
        name: "Headphones",
        url: "/assets/clothes/accessory/headphones.png",
        desc: "",
      },
      {
        name: "Bandage Socks",
        url: "/assets/clothes/accessory/bandage-socks.png",
        desc: "",
      },
      {
        name: "Eye Tie",
        url: "/assets/clothes/accessory/eye-tie.png",
        desc: "",
      },
      {
        name: "Just a Fish",
        url: "/assets/clothes/accessory/fish.png",
        desc: "",
      },
      {
        name: "Goggles",
        url: "/assets/clothes/accessory/goggles.png",
        desc: "",
      },
      {
        name: "Lobster Cap",
        url: "/assets/clothes/accessory/lobster-cap.png",
        desc: "",
      },
      {
        name: "Sweatband",
        url: "/assets/clothes/accessory/sweatband.png",
        desc: "",
      },
    ],
  },
];

export const MAP = {
  name: "my-map",
  // GET JSON FROM BELOW URL AS AN EXAMPLE
  areas: [
    {
      name: "screen",
      shape: "rect",
      fillColor: "",
      strokeColor: "black",
      coords: [216, 118, 682, 657],
      polygon: [
        [216, 118],
        [682, 118],
        [682, 657],
        [216, 657],
      ],
    },
    {
      name: "next",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        700, 304, 772, 307, 779, 327, 779, 409, 775, 438, 761, 450, 711, 450,
        701, 438, 701, 319,
      ],
      polygon: [
        [700, 304],
        [772, 307],
        [779, 327],
        [779, 409],
        [775, 438],
        [761, 450],
        [711, 450],
        [701, 438],
        [701, 319],
      ],
    },
    {
      name: "hair",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        812, 175, 823, 163, 885, 163, 903, 166, 922, 186, 925, 219, 927, 274,
        906, 288, 870, 291, 828, 269, 812, 213,
      ],
      polygon: [
        [812, 175],
        [823, 163],
        [885, 163],
        [903, 166],
        [922, 186],
        [925, 219],
        [927, 274],
        [906, 288],
        [870, 291],
        [828, 269],
        [812, 213],
      ],
    },
    {
      name: "torso",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        832, 339, 870, 320, 904, 320, 928, 334, 932, 413, 928, 438, 911, 454,
        862, 454, 833, 445, 817, 406, 818, 365,
      ],
      polygon: [
        [832, 339],
        [870, 320],
        [904, 320],
        [928, 334],
        [932, 413],
        [928, 438],
        [911, 454],
        [862, 454],
        [833, 445],
        [817, 406],
        [818, 365],
      ],
    },
    {
      name: "legs",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        959, 312, 985, 309, 1018, 321, 1054, 330, 1065, 350, 1067, 405, 1051,
        444, 985, 457, 959, 461, 948, 446, 946, 370, 954, 331,
      ],
      polygon: [
        [959, 312],
        [985, 309],
        [1018, 321],
        [1054, 330],
        [1065, 350],
        [1067, 405],
        [1051, 444],
        [985, 457],
        [959, 461],
        [948, 446],
        [946, 370],
        [954, 331],
      ],
    },
    {
      name: "eyes",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        940, 163, 956, 154, 999, 152, 1039, 164, 1054, 191, 1062, 251, 1055,
        279, 1029, 288, 966, 274, 945, 253, 939, 201,
      ],
      polygon: [
        [940, 163],
        [956, 154],
        [999, 152],
        [1039, 164],
        [1054, 191],
        [1062, 251],
        [1055, 279],
        [1029, 288],
        [966, 274],
        [945, 253],
        [939, 201],
      ],
    },
    {
      name: "feet",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        909, 489, 851, 489, 821, 508, 803, 565, 802, 608, 828, 625, 890, 629,
        907, 614, 922, 593, 923, 509,
      ],
      polygon: [
        [909, 489],
        [851, 489],
        [821, 508],
        [803, 565],
        [802, 608],
        [828, 625],
        [890, 629],
        [907, 614],
        [922, 593],
        [923, 509],
      ],
    },
    {
      name: "accessory",
      shape: "poly",
      fillColor: "#d3a345",
      strokeColor: "black",
      coords: [
        945, 514, 1017, 483, 1046, 484, 1056, 503, 1060, 549, 1052, 586, 1022,
        610, 966, 620, 940, 610, 935, 549,
      ],
      polygon: [
        [945, 514],
        [1017, 483],
        [1046, 484],
        [1056, 503],
        [1060, 549],
        [1052, 586],
        [1022, 610],
        [966, 620],
        [940, 610],
        [935, 549],
      ],
    },
  ],
};
