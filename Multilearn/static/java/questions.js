let questions = [
  {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "C. Hyper Text Markup Language",
    options: [
      "A. Hyper Type Multi Language",
      "B. Hyper Text Multiple Language",
      "C. Hyper Text Markup Language",
      "D. Home Text Multi Language",
    ],
  },
  {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "A. Cascading Style Sheet",
    options: [
      "A. Cascading Style Sheet",
      "B. Cascading Style Sheets",
      "C. Computer Style Sheet",
      "D. Creating Style Sheets",
    ],
  },
  {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "A. Hypertext Processor",
    options: [
      "A. Hypertext Processor",
      "B. Hypertext Programming",
      "C. Hometext Processor",
      "D. Hometext Programming",
    ],
  },
  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "C. Structured Query Language",
    options: [
      "A. Standard Query Language",
      "B. Strict Database Query Language",
      "C. Structured Query Language",
      "D. Sole Query Language",
    ],
  },
  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "A. Extensible Markup Language",
    options: [
      "A. Extensible Markup Language",
      "B. Explore Marking Language",
      "C. Xtended Markup language",
      "D. Extensible Markdown Language",
    ],
  },
  {
    numb: 6,
    question: "What does API stand for?",
    answer: "D. Application Programming Interface",
    options: [
      "A. Automated Processing Integration",
      "B. Applied Protocol Instruction",
      "C. Advanced Plugin Implementation",
      "D. Application Programming Interface",
    ],
  },
  {
    numb: 7,
    question: "What does HTTP stand for?",
    answer: "B. Hypertext Transfer Protocol",
    options: [
      "A. Hyperlink Textual Processing",
      "B. Hypertext Transfer Protocol",
      "C. High-Tech Transmission Process",
      "D. Hosting Text Transport Protocol",
    ],
  },
  {
    numb: 8,
    question: "What does JSON stand for?",
    answer: "C. JavaScript Object Notation",
    options: [
      "A. Java System Object Naming",
      "B. Java Source Output Notation",
      "C. JavaScript Object Notation",
      "D. Java Serialized Object Network",
    ],
  },
  {
    numb: 9,
    question: "What does URL stand for?",
    answer: "A. Uniform Resource Locator",
    options: [
      "A. Uniform Resource Locator",
      "B. Universal Routing Link",
      "C. Unified Reference Label",
      "D. User Request Link",
    ],
  },
  {
    numb: 10,
    question: "What does DOM stand for?",
    answer: "B. Document Object Model",
    options: [
      "A. Data Organization Method",
      "B. Document Object Model",
      "C. Digital Operations Mechanism",
      "D. Dynamic Object Module",
    ],
  },
  {
    numb: 11,
    question:
      "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "C. An echo",
    options: ["A. A whisper", "B. A shadow", "C. An echo", "D. A ghost"],
  },
  {
    numb: 12,
    question: "The more of me you take, the more you leave behind. What am I?",
    answer: "A. Footsteps",
    options: ["A. Footsteps", "B. Memories", "C. Shadows", "D. Sand"],
  },
  {
    numb: 13,
    question:
      "The person who makes it sells it. The person who buys it never uses it. The person who uses it never knows they are using it. What is it?",
    answer: "D. A coffin",
    options: ["A. A clock", "B. A map", "C. A will", "D. A coffin"],
  },
  {
    numb: 14,
    question:
      "I have keys but open no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
    answer: "C. A keyboard",
    options: [
      "A. A treasure chest",
      "B. A map",
      "C. A keyboard",
      "D. A puzzle",
    ],
  },
  {
    numb: 15,
    question: "The more you remove from me, the bigger I get. What am I?",
    answer: "B. A hole",
    options: ["A. A mystery", "B. A hole", "C. A balloon", "D. A secret"],
  },
  {
    numb: 16,
    question:
      "I fly without wings, I cry without eyes. Wherever I go, darkness follows me. What am I?",
    answer: "D. A cloud",
    options: ["A. A bird", "B. The wind", "C. A comet", "D. A cloud"],
  },
  {
    numb: 17,
    question:
      "I am not alive, but I can grow. I don’t have lungs, but I need air. What am I?",
    answer: "A. Fire",
    options: ["A. Fire", "B. A plant", "C. A virus", "D. A shadow"],
  },
  {
    numb: 18,
    question:
      "I have cities but no houses, forests but no trees, and rivers but no water. What am I?",
    answer: "C. A map",
    options: ["A. A dream", "B. A painting", "C. A map", "D. A puzzle"],
  },
  {
    numb: 19,
    question: "The more you share me, the less you have. What am I?",
    answer: "B. A secret",
    options: ["A. Knowledge", "B. A secret", "C. Love", "D. Time"],
  },
  {
    numb: 20,
    question: "I have hands but can’t clap. What am I?",
    answer: "A. A clock",
    options: ["A. A clock", "B. A mannequin", "C. A robot", "D. A ghost"],
  },
  {
    numb: 21,
    question: "Forward, I am heavy. Backward, I am not. What am I?",
    answer: "D. The word 'ton'",
    options: ["A. A train", "B. A boulder", "C. A mirror", "D. The word 'ton'"],
  },
  {
    numb: 22,
    question: "I can be cracked, made, told, and played. What am I?",
    answer: "C. A joke",
    options: ["A. A window", "B. A game", "C. A joke", "D. A record"],
  },
  {
    numb: 23,
    question:
      "I am taken from a mine and shut inside a wooden case, from which I am never released, yet I am used by almost everyone. What am I?",
    answer: "A. Pencil lead",
    options: ["A. Pencil lead", "B. A diamond", "C. Coal", "D. A pearl"],
  },
  {
    numb: 24,
    question: "The more you use me, the duller I become. What am I?",
    answer: "B. A pencil",
    options: ["A. A knife", "B. A pencil", "C. A blade", "D. A mind"],
  },
  {
    numb: 25,
    question:
      "I have four legs in the morning, two legs at noon, and three legs in the evening. What am I?",
    answer: "C. A human",
    options: ["A. A chair", "B. A table", "C. A human", "D. A clock"],
  },
  {
    numb: 26,
    question: "I go up but never come down. What am I?",
    answer: "A. Your age",
    options: ["A. Your age", "B. A balloon", "C. A temperature", "D. A rocket"],
  },
  {
    numb: 27,
    question: "The more you pull me, the longer I become. What am I?",
    answer: "B. A rubber band",
    options: [
      "A. A rope",
      "B. A rubber band",
      "C. A shadow",
      "D. A piece of gum",
    ],
  },
  {
    numb: 28,
    question:
      "What runs but never walks, has a bed but never sleeps, and has a mouth but never talks?",
    answer: "D. A river",
    options: ["A. A clock", "B. A car", "C. A wind", "D. A river"],
  },
  {
    numb: 29,
    question:
      "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "C. The letter 'M'",
    options: ["A. A secret", "B. A blink", "C. The letter 'M'", "D. A whisper"],
  },
  {
    numb: 30,
    question: "I have one eye but can’t see. What am I?",
    answer: "B. A needle",
    options: ["A. A blind man", "B. A needle", "C. A tornado", "D. A mirror"],
  },
  {
    numb: 31,
    question: "What is the most common gas in Earth's atmosphere?",
    answer: "C. Nitrogen",
    options: ["A. Oxygen", "B. Carbon Dioxide", "C. Nitrogen", "D. Hydrogen"],
  },
  {
    numb: 32,
    question:
      "Which organ in the human body is responsible for detoxifying chemicals and metabolizing drugs?",
    answer: "B. Liver",
    options: ["A. Kidney", "B. Liver", "C. Lungs", "D. Stomach"],
  },
  {
    numb: 33,
    question: "Which continent is the largest by land area?",
    answer: "A. Asia",
    options: ["A. Asia", "B. Africa", "C. North America", "D. Europe"],
  },
  {
    numb: 34,
    question: "What is the capital city of Australia?",
    answer: "D. Canberra",
    options: ["A. Sydney", "B. Melbourne", "C. Perth", "D. Canberra"],
  },
  {
    numb: 35,
    question: "Which planet in our solar system is known as the Red Planet?",
    answer: "C. Mars",
    options: ["A. Venus", "B. Jupiter", "C. Mars", "D. Saturn"],
  },
  {
    numb: 36,
    question: "Which is the only metal that is liquid at room temperature?",
    answer: "A. Mercury",
    options: ["A. Mercury", "B. Iron", "C. Gold", "D. Aluminum"],
  },
  {
    numb: 37,
    question: "Which animal is known as the King of the Jungle?",
    answer: "B. Lion",
    options: ["A. Tiger", "B. Lion", "C. Elephant", "D. Gorilla"],
  },
  {
    numb: 38,
    question: "What is the hardest natural substance on Earth?",
    answer: "D. Diamond",
    options: ["A. Iron", "B. Quartz", "C. Granite", "D. Diamond"],
  },
  {
    numb: 39,
    question: "Which country is known for inventing the pizza?",
    answer: "C. Italy",
    options: ["A. Greece", "B. France", "C. Italy", "D. Spain"],
  },
  {
    numb: 40,
    question: "What does the ‘E’ stand for in E=mc²?",
    answer: "B. Energy",
    options: ["A. Electricity", "B. Energy", "C. Efficiency", "D. Existence"],
  },
  {
    numb: 41,
    question: "What is the main ingredient in guacamole?",
    answer: "A. Avocado",
    options: ["A. Avocado", "B. Tomato", "C. Cucumber", "D. Onion"],
  },
  {
    numb: 42,
    question: "What is the largest ocean on Earth?",
    answer: "C. Pacific Ocean",
    options: [
      "A. Atlantic Ocean",
      "B. Indian Ocean",
      "C. Pacific Ocean",
      "D. Arctic Ocean",
    ],
  },
  {
    numb: 43,
    question: "Which planet has the most moons in our solar system?",
    answer: "D. Saturn",
    options: ["A. Mars", "B. Earth", "C. Jupiter", "D. Saturn"],
  },
  {
    numb: 44,
    question: "Which blood type is known as the universal donor?",
    answer: "B. O Negative",
    options: [
      "A. AB Positive",
      "B. O Negative",
      "C. A Positive",
      "D. B Negative",
    ],
  },
  {
    numb: 45,
    question: "Which gas do plants absorb during photosynthesis?",
    answer: "A. Carbon Dioxide",
    options: ["A. Carbon Dioxide", "B. Oxygen", "C. Nitrogen", "D. Hydrogen"],
  },
  {
    numb: 46,
    question: "What does the ‘www’ stand for in a website browser?",
    answer: "C. World Wide Web",
    options: [
      "A. Web Wide Window",
      "B. Wireless Web World",
      "C. World Wide Web",
      "D. Web Wonder Work",
    ],
  },
  {
    numb: 47,
    question: "Which country is the largest producer of coffee in the world?",
    answer: "D. Brazil",
    options: ["A. Colombia", "B. Vietnam", "C. Ethiopia", "D. Brazil"],
  },
  {
    numb: 48,
    question: "How many sides does a hexagon have?",
    answer: "B. Six",
    options: ["A. Five", "B. Six", "C. Seven", "D. Eight"],
  },
  {
    numb: 49,
    question: "What is the chemical symbol for gold?",
    answer: "A. Au",
    options: ["A. Au", "B. Ag", "C. Gd", "D. Go"],
  },
  {
    numb: 50,
    question: "Which country is famous for the Great Wall?",
    answer: "D. China",
    options: ["A. India", "B. Japan", "C. South Korea", "D. China"],
  },
  {
    numb: 51,
    question: "What is the most widely spoken language in the world?",
    answer: "C. English",
    options: ["A. Spanish", "B. Mandarin Chinese", "C. English", "D. Hindi"],
  },
  {
    numb: 52,
    question: "Which company was originally known as ‘Blue Ribbon Sports’?",
    answer: "A. Nike",
    options: ["A. Nike", "B. Adidas", "C. Puma", "D. Reebok"],
  },
  {
    numb: 53,
    question: "What is the longest river in the world?",
    answer: "B. The Nile",
    options: [
      "A. The Amazon",
      "B. The Nile",
      "C. The Mississippi",
      "D. The Yangtze",
    ],
  },
  {
    numb: 54,
    question: "What is the name of the closest star to Earth?",
    answer: "D. The Sun",
    options: ["A. Alpha Centauri", "B. Betelgeuse", "C. Sirius", "D. The Sun"],
  },
  {
    numb: 55,
    question: "Which element has the chemical symbol ‘O’?",
    answer: "B. Oxygen",
    options: ["A. Gold", "B. Oxygen", "C. Osmium", "D. Olivine"],
  },
  {
    numb: 56,
    question: "Which country is known as the Land of the Rising Sun?",
    answer: "A. Japan",
    options: ["A. Japan", "B. South Korea", "C. China", "D. Thailand"],
  },
  {
    numb: 57,
    question: "What is the smallest unit of life?",
    answer: "C. A cell",
    options: ["A. An atom", "B. A molecule", "C. A cell", "D. A protein"],
  },
  {
    numb: 58,
    question: "How many bones are in the adult human body?",
    answer: "B. 206",
    options: ["A. 195", "B. 206", "C. 212", "D. 180"],
  },
  {
    numb: 59,
    question: "What is the capital of Canada?",
    answer: "D. Ottawa",
    options: ["A. Toronto", "B. Vancouver", "C. Montreal", "D. Ottawa"],
  },
  {
    numb: 60,
    question: "Which musical instrument has 88 keys?",
    answer: "A. Piano",
    options: ["A. Piano", "B. Guitar", "C. Violin", "D. Trumpet"],
  }
];
